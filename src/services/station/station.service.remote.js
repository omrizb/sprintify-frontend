import { httpService } from '../http.service'

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    getRecentlyPlayed,
    getTopMixes,
    getMadeForYou,
    getLikedSongsStation
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

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station) {
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
        savedStation = await httpService.put(`station/${station._id}`, stationToSave)
        console.log(savedStation)
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

async function getRecentlyPlayed(userId, size = 4) {
    //TODO write algorithm for fetching recentlyplayed playlists per user 

    return httpService.get(`station`, { stationType: 'album' })

}
async function getTopMixes(userId, size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    return httpService.get(`station`, { stationType: 'playlist' })
}
async function getMadeForYou(userId, size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    return httpService.get(`station`, { stationType: 'playlist' })
}

