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
    addStationMsg
}

// DEBUG:
// window.cs = stationService

_createStations()

async function query(filterBy = {txt: '', stationType:'', playListCreator:'', sortField: '', sortDir: ''}) {

    console.log('filterBy from service:', filterBy)
    var stations = await storageService.query(STORAGE_KEY)
    const { txt, stationType, playListCreator, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.createdBy.fullName))
    }

    if(stationType === 'playlist'){
        stations = stations.filter(station => station.type === 'playlist' )
        if(playListCreator === 'byYou'){
            stations = stations.filter(station => station.createdBy.fullName === 'Darr' )
        }
        if(playListCreator === 'bySprintify'){
            stations = stations.filter(station => station.createdBy.fullName === 'sprintify' )
        }
    }
    if(stationType === 'artist'){
        stations = stations.filter(station => station.type === 'artist' )
    }
    if(stationType === 'album'){
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


function _createStations() {
    let currStations = utilService.loadFromStorage(STORAGE_KEY)
    if (!currStations || !currStations.length) {
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}

