import axios from 'axios'

const BASE_URL = 'https://api.spotify.com/v1'
const CLIENT_ID = '027bef80bb424459a75e045ed471f024'
const CLIENT_SECRET = '4cb7b55ab1fa409185026d058403fe2f'

export const spotifyService = {
    search,
    getSong,
    getArtist,
    getAlbum,
    getStation,
    getRecommendations,
    _search,
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
            album: { name: track.album.name, spotifyId: track.album.id },
            imgUrl: _getImageUrls(track.album),
            duration: Math.floor(track.duration_ms / 1000),
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
    // console.log(song)
    return {
        spotifyId: song.id,
        songName: song.name,
        artist: { name: song.artists[0].name, spotifyId: song.artists[0].id },
        album: { name: song.album.name, spotifyId: song.album.id },
        duration: Math.floor(song.duration_ms / 1000),
        imgUrl: { big: song.album.images[0].url, small: song.album.images[2].url },
        releaseDate: song.album.release_date,
    }
}

async function getArtist(spotifyId) {
    const artist = await _https(`/artists/${spotifyId}`)
    return {
        id: artist.id,
        name: artist.name,
        type: 'artist',
        followers: artist.followers.total,
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

async function getRecommendations(songs, type = 'song') {

    if (type === 'song') {

        const songsList = (songs.length <= 5) ? songs : songs.slice(0, 5)
        const songsIdsStr = songsList.map(song => song.spotifyId).join(',')
        var res = await _https(`/recommendations?seed_tracks=${songsIdsStr}`)
    }

    const recommendedSongs = res.tracks.map(track => {
        return {
            spotifyId: track.id,
            songName: track.name,
            artist: { name: track.artists[0].name, spotifyId: track.artists[0].id },
            album: { name: track.album.name, spotifyId: track.album.id },
            duration: Math.floor(track.duration_ms / 1000),
            imgUrl: { big: track.album.images[0].url, small: track.album.images[2].url },
            releaseDate: track.album.release_date,

        }
    })

    return recommendedSongs

}




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

    for (let i = 0; i < songs.tracks.length; i++) {
        const currSong = songs.tracks[i]

        res.push({
            spotifyId: currSong.id,
            ytId: '',
            songName: currSong.name,
            artist: { name: currSong.artists[0].name, spotifyId: currSong.artists[0].id },
            album: { name: currSong.album.name, spotifyId: currSong.album.id },
            imgUrl: _getImageUrls(currSong.album),
            duration: Math.floor(currSong.duration_ms / 1000)
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


