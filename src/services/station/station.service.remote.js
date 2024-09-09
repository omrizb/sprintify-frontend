import { httpService } from '../http.service'
import { utilService } from '../util.service'

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    getRecentlyPlayed,
    getTopMixes,
    getMadeForYou,
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
        songs: []
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
        savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

async function getRecentlyPlayed(userId, size = 4) {
    //TODO write algorithm for fetching recentlyplayed playlists per user 
    const stations = httpService.get(`station`, { stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}
async function getTopMixes(userId, size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    const stations = httpService.get(`station`, { stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}
async function getMadeForYou(userId, size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    const stations = httpService.get(`station`, { stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}

