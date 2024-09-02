import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'
import { userService } from '../user'
import { stations } from '../../../data-sample/station.js'

const STORAGE_KEY = 'stationDB'

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    addStationMsg,
    getRecentlyPlayed,
    getTopMixes,
    getMadeForYou,
    getSong
}

// DEBUG:
// window.cs = stationService

_createStations()

function getEmptyStation() {
    return {
        name: 'My Playlist',
        type: 'playlist',
        isLikedSongs: false,
        tags: [],
        stationImgUrl: '',
        description: '',
        isOwnedByUser: true,
        createdBy: {
            id: 'AAAA',
            fullName: 'Darr',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: [],
        songs: []
    }
}

async function query(filterBy = {
    txt: '',
    likedByUser: '',
    stationType: '',
    createdBy: '',
    songId: '',
}) {

    var stations = await storageService.query(STORAGE_KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.createdBy.fullName))
    }

    if (filterBy.stationType) {
        stations = stations.filter(station => station.type === filterBy.stationType)
    }

    if (filterBy.createdBy) {
        stations = stations.filter(station => station.createdBy.id === filterBy.createdBy)
    }

    if (filterBy.songId) {
        stations = stations.find(station => station.songs.find(song => song.songId === filterBy.songId))
    }

    if (filterBy.likedByUser) {
        stations = stations.filter(station => station.likedByUsers.includes(filterBy.likedByUser))
    }



    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
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
            songs: station.songs
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        const stationToSave = {
            // _id: utilService.makeId(),
            name: station.name,
            type: station.type,
            isLikedSongs: station.isLikedSongs,
            tags: station.tags,
            stationImgUrl: station.stationImgUrl,
            description: station.description,
            isOwnedByUser: station.isOwnedByUser,
            createdBy: station.createdBy,
            likedByUsers: station.likedByUsers,
            songs: station.songs
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

async function getRecentlyPlayed(userId = 'bob', size = 4) {
    //TODO write algorithm for fetching recentlyplayed playlists per user 
    const stations = await query({ stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}
async function getTopMixes(userId = 'bob', size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    const stations = await query({ stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}
async function getMadeForYou(userId = 'bob', size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    const stations = await query({ stationType: 'playlist' })
    return utilService.getRandomItems(stations, size)
}

async function getSong(songId) {
    const station = await query({ songId: songId })
    // const station = stations.find(station => station.songs.find(song => song.songId === songId))
    const song = station.songs.find(song => song.songId === songId)

    return song
}

function _createStations() {
    let currStations = utilService.loadFromStorage(STORAGE_KEY)
    if (!currStations || !currStations.length) {
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}

