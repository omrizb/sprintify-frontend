import { stationService } from '../../services/station'

import { store } from '../store'
import { SET_PLAYER, SET_ACTION, SET_VOLUME, SET_STATION_ID, SET_STATION_SONGS, MARK_STATION_SONG_AS_PLAYED, SET_SONG_HISTORY, ADD_TO_SONG_HISTORY, SET_QUEUE, ADD_TO_QUEUE } from '../reducers/player.reducer'

export const playerActions = {
    PLAY: 'play',
    PAUSE: 'pause',
}

export function setPlayer(playerProps) {
    store.dispatch({ type: SET_PLAYER, playerProps })
}

async function loadStationToPlayer(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch({ type: SET_STATION_ID, stationId: station.stationId })
        store.dispatch({ type: SET_STATION_SONGS, stationSongs: station.songs })
    } catch (err) {
        console.log('PlayerActions: Error in loadStationToPlayer', err)
    }
}


export function play() {
    store.dispatch({ type: SET_ACTION, action: playerActions.PLAY })
}

export function pause() {
    store.dispatch({ type: SET_ACTION, action: playerActions.PAUSE })
}

export function setVolume(volume) {
    store.dispatch({ type: SET_VOLUME, volume })
}

export function setQueue(volume) {
    store.dispatch({ type: SET_VOLUME, volume })
}

store.dispatch({ type: SET_QUEUE, queue: [] })