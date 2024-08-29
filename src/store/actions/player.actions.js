import { stationService } from '../../services/station/station.service.local'

import { store } from '../store'
import { SET_PLAYER, SET_ACTION, SET_VOLUME, SET_STATION_ID, SET_STATION_NAME, SET_STATION_SONGS, MARK_STATION_SONG_AS_PLAYED, SET_SONG_HISTORY, ADD_TO_SONG_HISTORY, SET_QUEUE, ADD_TO_QUEUE } from '../reducers/player.reducer'

export const playerActions = {
    PLAY: 'play',
    PAUSE: 'pause',
    GOTO: 'goto'
}

export function setPlayer(playerProps) {
    store.dispatch({ type: SET_PLAYER, playerProps })
}

export function loadSongToPlayer(songId) {
    store.dispatch(getActionSetSong(songId))
}

export async function loadStationToPlayer(stationId, firstSongId) {
    try {
        store.dispatch(getActionPausePlayer())
        const station = await stationService.getById(stationId)
        store.dispatch(getActionSetSong(firstSongId))
        store.dispatch({ type: SET_STATION_ID, stationId: station._id })
        store.dispatch({ type: SET_STATION_NAME, stationName: station.name })
        store.dispatch({ type: SET_STATION_SONGS, stationSongs: station.songs })
    } catch (err) {
        console.log('PlayerActions: Error in loadStationToPlayer', err)
    }
}

export function play() {
    store.dispatch(getActionPlayPlayer())
}

export function pause() {
    store.dispatch(getActionPausePlayer())
}

export function goto(seconds) {
    store.dispatch({ type: SET_ACTION, action: playerActions.GOTO, actionParam: seconds })
}

export function setVolume(volume) {
    store.dispatch({ type: SET_VOLUME, volume })
}

export function setQueue(queue) {
    store.dispatch({ type: SET_QUEUE, queue })
}

// Command Creators
export function getActionSetSong(songId) {
    return { type: SET_PLAYER, playerProps: { songId } }
}

export function getActionPlayPlayer() {
    return { type: SET_ACTION, action: playerActions.PLAY, actionParam: '' }
}

export function getActionPausePlayer() {
    return { type: SET_ACTION, action: playerActions.PAUSE, actionParam: '' }
}