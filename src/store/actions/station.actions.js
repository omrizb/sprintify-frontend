import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
// import { stationService } from '../../services/station/station.service.local.js'
import { stationService } from '../../services/station/station.service.remote.js'
import { store } from '../store.js'
import {
    ADD_STATION,
    REMOVE_STATION,
    SET_STATIONS,
    SET_STATION,
    SET_STATION_BACKUP,
    RESTORE_FROM_BACKUP,
    UPDATE_STATION,
    UPDATE_STATIONS,
    UPDATE_STATION_AND_STAY as UPDATE_STATION_AND_STAY,
} from '../reducers/station.reducer.js'


export async function loadStations(filterBy) {
    try {
        var stations = await stationService.query(filterBy)
        const likedStation = stations.filter(station => station.isPinned === true)
        stations = [...likedStation, ...stations.filter(station => station.isPinned === false)]

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

export async function addStation(newStation) {
    try {
        const savedStation = await stationService.save(newStation)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function addSprintifyStation(station) {
    try {
        const savedStation = await stationService.save(station)
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        store.dispatch({ type: SET_STATION_BACKUP })
        store.dispatch(getCmdUpdateStation(station))
        const savedStation = await stationService.save(station)
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        showErrorMsg('Could not update station')
        store.dispatch({ type: RESTORE_FROM_BACKUP })
        throw err
    }
}

export async function updateStationAndStay(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdUpdateAndStay(savedStation))
        showSuccessMsg(`${savedStation.name} was updated`)
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        showErrorMsg(`Could not update ${station.name}`)
        throw err
    }
}


export async function addSongToStation(station, songToAdd) {
    try {
        if (station.songs.some(song => song.spotifyId === songToAdd.spotifyId)) {
            showSuccessMsg(`Already in ${station.name}`)
            return
        }

        songToAdd.addAt = Date.now()

        if (!songToAdd.ytId) {
            var updatedSong = stationService.setSongYtId(songToAdd)
        }
        else updatedSong = songToAdd

        const updatedStation = { ...station, songs: [...station.songs, updatedSong] }
        const savedStation = await stationService.save(updatedStation)
        store.dispatch(getCmdUpdateAndStay(savedStation))
        showSuccessMsg(`Added to ${savedStation.name}`)
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        showErrorMsg(`Could not add to ${station.name}`)
        throw err
    }
}


export async function removeStationFromLibrary(station, userId, lastIdx) {
    try {
        const updatedStation = {
            ...station,
            likedByUsers: station.likedByUsers.filter(user => user !== userId),
            lastIdx
        }

        const savedStation = await stationService.save(updatedStation, '/toggleLike')
        store.dispatch(getCmdUpdateStation(savedStation))
        store.dispatch(getCmdRemoveStation(savedStation._id))
        showSuccessMsg('Removed from Your Library')
        return savedStation
    } catch (err) {
        console.log('Cannot remove station from library', err)
        showErrorMsg('Could not remove from Your Library')
        throw err
    }
}

export async function addStationToLibrary(station, userId) {
    try {
        const updatedStation = {
            ...station,
            likedByUsers: [...station.likedByUsers, userId],
            addedAt: Date.now(),
        }
        const savedStation = await stationService.save(updatedStation, '/toggleLike')
        store.dispatch(getCmdAddStation(savedStation))
        showSuccessMsg('Added to Your Library')
        return savedStation
    } catch (err) {
        console.log('Cannot add station to library', err)
        showErrorMsg('Could not add to Your Library')
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


export function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdUpdateStations(stations) {
    return {
        type: UPDATE_STATIONS,
        stations
    }
}

export function getCmdUpdateAndStay(station) {
    return {
        type: UPDATE_STATION_AND_STAY,
        station
    }
}