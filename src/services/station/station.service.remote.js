import { httpService } from '../http.service'
import { utilService } from '../util.service'
import { youtubeService } from '../youtube.service'

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    getRecentlyPlayed,
    getTopMixes,
    getMadeForYou,
    getLikedSongsStation,
    setSongYtId
}

function getEmptyStation() {
    return {
        name: 'My Playlist',
        type: 'playlist',
        isPinned: false,
        tags: [],
        stationImgUrl: '',
        description: '',
        isOwnedByUser: true,
        createdBy: {},
        likedByUsers: [],
        songs: [],
        lastIdx: ''
    }
}

function getLikedSongsStation(user) {
    return {
        ...getEmptyStation(),
        name: 'Liked Songs',
        createdBy: {
            id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        },
        isPinned: true,
        stationImgUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
    }
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`station`, filterBy)
}

async function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station, isToggleLike = '') {
    var savedStation

    if (station._id) {
        const stationToSave = {
            _id: station._id,
            name: station.name,
            type: station.type,
            isLikedSongs: station.isLikedSongs,
            tags: station.tags,
            stationImgUrl: station.stationImgUrl,
            description: station.description,
            isOwnedByUser: station.isOwnedByUser,
            createdBy: station.createdBy,
            likedByUsers: station.likedByUsers,
            songs: station.songs,
            createdAt: station.createdAt,
            addedAt: station.addedAt,
            isPinned: station.isPinned,
            lastIdx: station.lastIdx || ''
        }
        savedStation = await httpService.put(`station/${station._id}${isToggleLike}`, stationToSave)
    } else {
        const stationToSave = {
            name: station.name,
            type: station.type,
            isLikedSongs: station.isLikedSongs,
            tags: station.tags,
            stationImgUrl: station.stationImgUrl,
            description: station.description,
            isOwnedByUser: station.isOwnedByUser,
            createdBy: station.createdBy,
            likedByUsers: station.likedByUsers,
            songs: station.songs,
            createdAt: Date.now(),
            addedAt: Date.now(),
            isPinned: station.isPinned,
            lastIdx: ''
        }
        savedStation = await httpService.post('station', stationToSave)
    }
    return savedStation
}

async function getRecentlyPlayed() {
    const stations = await query({ createdBy: 'BBBB' })
    const dailyMixStations = stations.filter(station => !station.name.includes("Daily Mix"))
    const plantedStation = await getById('66e6425a91bf0b67a1c08139')
    return [plantedStation, ...dailyMixStations.slice(6, 11)]
}

async function getTopMixes() {
    const stations = await query({ createdBy: 'BBBB' })
    const dailyMixStations = stations.filter(station => station.name.includes("Daily Mix"))
    return dailyMixStations
}

async function getMadeForYou() {
    const stations = await query({ createdBy: 'BBBB' })
    const dailyMixStations = stations.filter(station => !station.name.includes("Daily Mix"))
    return dailyMixStations.slice(0, 6)
}

async function setSongYtId(song) {
    try {
        var ytSong = await youtubeService.getTopVideo(`song: ${song.songName} by ${song.artist.name}`)
        song.ytId = ytSong.songId
        return song
    } catch (error) {
        console.log(error)
        throw 'YouTube is blocking'
    }
}



