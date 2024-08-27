import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'
import { userService } from '../user'
import { stations } from '../../../data-sample/station.js'

const STORAGE_KEY = 'stationDB'

export const stationService = {
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

async function query(filterBy = { txt: '', stationType: '', playListCreator: ''}) {//Could be either filterBy or filterByMain

    // console.log('filterBy from service:', filterBy)
    var stations = await storageService.query(STORAGE_KEY)
    // const { txt, stationType, playListCreator, sortField, sortDir } = filterBy

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.createdBy.fullName))
    }

    if(filterBy.stationType === 'playlist'){
        stations = stations.filter(station => station.type === 'playlist' )
        if(filterBy.playListCreator === 'byYou'){
            stations = stations.filter(station => station.createdBy.fullName === 'Darr' )
        }
        if(filterBy.playListCreator === 'bySprintify'){
            stations = stations.filter(station => station.createdBy.fullName === 'sprintify' )
        }
    }
    if(filterBy.stationType === 'artist'){
        stations = stations.filter(station => station.type === 'artist' )
    }
    if(filterBy.stationType === 'album'){
        stations = stations.filter(station => station.type === 'album' )
    }
    // if (minSpeed) {
    //     stations = stations.filter(station => station.speed <= minSpeed)
    // }
    // if (maxPrice) {
    //     stations = stations.filter(station => station.price <= maxPrice)
    // }
    // if (sortField === 'vendor' || sortField === 'owner') {
    //     stations.sort((station1, station2) =>
    //         station1[sortField].localeCompare(station2[sortField]) * +sortDir)
    // }
    // if (sortField === 'price' || sortField === 'speed') {
    //     stations.sort((station1, station2) =>
    //         (station1[sortField] - station2[sortField]) * +sortDir)
    // }

    // stations = stations.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
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
            price: station.price,
            speed: station.speed,
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        const stationToSave = {
            vendor: station.vendor,
            price: station.price,
            speed: station.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
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

async function getRecentlyPlayed(userId = 'bob', size = 4){
    //TODO write algorithm for fetching recentlyplayed playlists per user 
    const stations = await query({stationType: 'playlist'})
    return utilService.getRandomItems(stations, size)
}
async function getTopMixes(userId = 'bob', size = 4){
    //TODO write algorithm for fetching top mixes per user 
    const stations = await query({stationType: 'playlist'})
    return utilService.getRandomItems(stations, size)
}
async function getMadeForYou(userId = 'bob', size = 4){
    //TODO write algorithm for fetching top mixes per user 
    const stations = await query({stationType: 'playlist'})
    return utilService.getRandomItems(stations, size)
}

async function getSong(songId){
    const stations = await query()
   
    const station = stations.find(station => station.songs.find(song => song.songId === songId))
    const song = station.songs.find(song => song.songId === songId)
    
    return song
}


function _createStations() {
    let currStations = utilService.loadFromStorage(STORAGE_KEY)
    if (!currStations || !currStations.length) {
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}

