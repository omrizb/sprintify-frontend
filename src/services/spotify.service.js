import axios from 'axios'

import { youtubeService } from './youtube.service'

const BASE_URL = 'https://api.spotify.com/v1'
const CLIENT_ID = '027bef80bb424459a75e045ed471f024'
const CLIENT_SECRET = '4cb7b55ab1fa409185026d058403fe2f'

export const spotifyService = {
    search,
    getSong,
    getArtist,
    getAlbum,
    getStation,
    _search,
    _createDemoData
}

// For debug
window.spotifyService = spotifyService

async function search(query, limit = 4) {
    const songs = await _search(query, 'track', limit)
    const artists = await _search(query, 'artist', limit)
    const albums = await _search(query, 'album', limit)
    const stations = await _search(query, 'playlist', limit)

    return {
        songs: songs.tracks.items.map(track => ({
            spotifyId: track.id,
            songName: track.name,
            artist: track.artists[0],
            imgUrl: _getImageUrls(track.album),
            duration: Math.floor(track.duration_ms / 1000)
        })),
        artists: artists.artists.items.map(artist => ({
            spotifyId: artist.id,
            name: artist.name,
            imgUrl: _getImageUrls(artist),
        })),
        albums: albums.albums.items.map(album => ({
            spotifyId: album.id,
            name: album.name,
            artist: { name: album.artists[0].name, spotifyId: album.artists[0].id },
            imgUrl: _getImageUrls(album),
            releaseYear: album.release_date.split('-')[0]
        })),
        stations: stations.playlists.items.map(playlist => ({
            spotifyId: playlist.id,
            name: playlist.name,
            createdBy: playlist.owner.display_name,
            imgUrl: _getImageUrls(playlist),
        }))
    }
}


async function getSong(spotifyId) {
    const song = await _https(`/tracks/${spotifyId}`)
    return song
}

async function getArtist(spotifyId) {
    const artist = await _https(`/artists/${spotifyId}`)
    return {
        id: artist.id,
        name: artist.name,
        type: 'artist',
        followers: artist.followers,
        genres: artist.genres,
        imgUrl: _getImageUrls(artist)
    }
}

async function getAlbum(spotifyId) {
    const album = await _https(`/albums/${spotifyId}`)
    const songs = await _getFullSongs(album.tracks.items)
    return {
        spotifyId: album.id,
        name: album.name,
        artist: { name: album.artists[0].name, spotifyId: album.artists[0].id },
        type: album.type,
        genres: album.genres,
        releaseDate: album.release_date,
        genres: album.genres,
        images: {
            big: album.images[0].url,
            small: album.images[album.images.length - 1].url
        },
        songs
    }
}

// name: 'Summer Vibes',
//         type: 'playlist',
//         isPinned: false,
//         stationImgUrl: 'https://i.scdn.co/image/ab67616d0000b27346e4e8079743a66a5467d091', // image of one of the songs
//         tags: ['Happy', 'Chill', 'Upbeat'],
//         createdBy: {
//             id: 'AAAA',
//             fullName: 'Darr',
//             imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
//         },
//         likedByUsers: ['AAAA', 'F6g7H8i9J0', 'K1L2M3N4O5'],
//         createdAt: getRandomTimestamp(2018, 2023),
//         addedAt: getRandomTimestamp(2022, 2023),
//         songs: [
//             {
//                
//             },

//         ]
async function getStation(spotifyId) {
    const station = await _https(`/stations/${spotifyId}`)
    const songs = await _getFullSongs(station.tracks.items)
    return {
        spotifyId: album.id,
        name: album.name,
        artist: { name: album.artists[0].name, spotifyId: album.artists[0].id },
        type: album.type,
        genres: album.genres,
        releaseDate: album.release_date,
        genres: album.genres,
        images: {
            big: album.images[0].url,
            small: album.images[album.images.length - 1].url
        },
        songs
    }
    // const searchResults = await _search(stationName, 'playlist')
    // const station = searchResults.playlists.items[0]
    // const songsResults = await _https(station.tracks.href.match(/playlists\/.+$/)[0])
    // const songs = songsResults.items.length > 20 ? songsResults.items.slice(0, 20) : songsResults.items
    // return songs
    // return {
    //     name: station.name,
    //     type:
    //     isPinned:
    //     stationImgUrl
    //     tags
    //     createdBy:
    //     likedByUsers:
    //     createdAt
    //     addedAt
    //     songs

    // }
    // return _https(`playlists/${artistId}`)
}

async function _search(query, type, limit = 20) {
    return _https(`/search?q=${query}&type=${type}&limit=${limit}`)
}

async function _getAccessToken() {

    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }).toString()
    }

    try {
        const res = await axios(authOptions)
        return res.data.access_token
    } catch (err) {
        console.error('Error fetching access token:', err)
        throw err
    }
}

async function _https(endpoint, method = 'GET', data = null) {

    const accessToken = await _getAccessToken()
    const url = `${BASE_URL}${endpoint}`
    const headers = { 'Authorization': `Bearer ${accessToken}` }
    const params = (method === 'GET') ? data : null

    const options = { method, url, headers, data, params }

    try {
        const res = await axios(options)
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to Spotify API, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}

async function _getFullSongs(spotifySongs) {

    const res = []
    const songsIds = spotifySongs.map(song => song.id).join(',')
    const songs = await _https(`/tracks?ids=${songsIds}`)

    for (let i = 0; i < songs.length; i++) {
        const currSong = songs.tracks[i]

        res.push({
            songId: '',
            songName: currSong.name,
            artist: { name: currSong.artists[0].name, spotifyId: currSong.artists[0].id },
            album: { name: currSong.album.name, spotifyId: currSong.album.id },
            imgUrl: _getImageUrls(currSong.album),
            duration: Math.floor(track.duration_ms / 1000)
        })
    }

    return res
}

function _getImageUrls(elementWithImages) {
    return {
        big: elementWithImages.images[0].url,
        small: elementWithImages.images[elementWithImages.images.length - 1].url
    }
}

async function _createDemoData() {

    const songs = [
        'Shape of You',
        'Thriller',
        'Bohemian Rhapsody',
        'Hotel California',
        'Billie Jean',
        'Smells Like Teen Spirit',
        'Rolling in the Deep',
        'Hey Jude',
        'Stairway to Heaven',
        'Like a Rolling Stone',
        'Uptown Funk',
        `Sweet Child O’ Mine`,
        'Imagine',
        `What’s Going On`,
        'Purple Rain',
        'Let It Be',
        'Wonderwall',
        'Blinding Lights',
        'All of Me',
        'I Will Always Love You',
        'Despacito',
        `Livin’ on a Prayer`,
        'Shallow',
        'Take On Me',
        'Dancing Queen',
        'Lose Yourself',
        'We Will Rock You',
        `Stayin’ Alive`,
        'Eye of the Tiger',
        'Call Me Maybe'
    ]


    const spotiSongs = []
    const combinedSongs = []
    const ytSongs = []

    for (var i = 0; i < songs.length; i++) {
        spotiSongs[i] = await search(songs[i], 1)
        combinedSongs[i] = [...spotiSongs[i].songs]

        ytSongs[i] = await youtubeService.getTopVideo(songs[i])
        combinedSongs[i].songId = ytSongs[i].songId

    }

    console.log(combinedSongs)

}
