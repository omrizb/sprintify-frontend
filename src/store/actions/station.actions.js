import { stationService } from '../../services/station/station.service.local.js'
import { store } from '../store.js'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    UPDATE_STATION,
} from '../reducers/station.reducer.js'


export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}


export async function setStations(stations) {
    try {
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation() {
    try {
        const newStation = stationService.getEmptyStation()
        const savedStation = await stationService.save(newStation)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}

export async function removeStationFromLibrary(station, userId) {
    try {
        const updatedStation = {
            ...station,
            likedByUsers: station.likedByUsers.filter(user => user !== userId)
        }
        const savedStation = await stationService.save(updatedStation)
        store.dispatch(getCmdUpdateStation(savedStation))
        store.dispatch(getCmdRemoveStation(savedStation._id))
        return savedStation
    } catch (err) {
        console.log('Cannot remove station from library', err)
        throw err
    }
}

export async function addStationToLibrary(station, userId) {
    try {
        const updatedStation = {
            ...station,
            likedByUsers: [...station.likedByUsers, userId]
        }
        const savedStation = await stationService.save(updatedStation)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station to library', err)
        throw err
    }
}



// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdAddSongToStation(song) {
    return {
        type: ADD_SONG_TO_STATION,
        song
    }
}
function getCmdRemoveSongFromStation(songId) {
    return {
        type: REMOVE_SONG_FROM_STATION,
        songId
    }
}


