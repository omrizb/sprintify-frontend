import { stationService } from '../../services/station/station.service.local'

import { store } from '../store'
import {
    SET_FIRST_SONG_LOADED_TRUE,
    SET_PLAYER,
    ADD_TO_ACTION_QUEUE,
    POP_FROM_ACTION_QUEUE,
    SET_STATION_ID,
    SET_STATION_NAME,
    SET_REMAINING_STATION_SONGS,
    SET_ORIGINAL_STATION_SONGS,
    POP_FROM_REMAINING_STATION_SONGS,
    SET_QUEUE,
    ADD_TO_QUEUE,
    SET_SONGS_HISTORY,
    ADD_TO_SONGS_HISTORY,
    POP_FROM_SONGS_HISTORY
} from '../reducers/player.reducer'

export const playerActions = {
    LOAD_SONG: 'loadSong',
    LOAD_STATION: 'loadStation',
    PLAY: 'play',
    PAUSE: 'pause',
    GOTO: 'goto',
    SET_VOLUME: 'setVolume',
    PLAY_NEXT: 'playNext',
    PLAY_PREV: 'playPrev',
    SET_SHUFFLE: 'setShuffle',
    SET_REPEAT: 'setRepeat',
    ADD_TO_QUEUE: 'addToQueue',
    REMOVE_FROM_QUEUE: 'removeFromQueue',
    CLEAR_QUEUE: 'clearQueue',
    RESET_ACTION: ''
}

// To be used by app components to set an action

export function loadFirstStation(stationId, song) {
    loadStationToPlayer(stationId, song)
    store.dispatch({ type: SET_FIRST_SONG_LOADED_TRUE })
}

export function setPlayerAction(action, params) {
    store.dispatch({ type: ADD_TO_ACTION_QUEUE, action, actionParams: { ...params } })
}

// To be used ONLY by the player component component to execute action

export const executePlayerAction = {
    removeNextActionFromQueue,
    setPlayer,
    loadSongToPlayer,
    loadStationToPlayer
}

function removeNextActionFromQueue() {
    store.dispatch({ type: POP_FROM_ACTION_QUEUE })
}

function setPlayer(playerProps) {
    store.dispatch({ type: SET_PLAYER, playerProps })
}

function loadSongToPlayer(song) {
    store.dispatch({ type: SET_PLAYER, playerProps: { song } })
}

async function loadStationToPlayer(stationId, song) {
    try {
        const station = await stationService.getById(stationId)

        if (!station.songs.find(currSong => currSong.songId === song.songId)) {
            throw 'Cannot find songId in station.'
        }

        const songsWithoutFirstSong = station.songs.filter(currSong => currSong.songId !== song.songId)
        store.dispatch({ type: SET_PLAYER, playerProps: { song } })
        store.dispatch({ type: SET_STATION_ID, stationId: station._id })
        store.dispatch({ type: SET_STATION_NAME, stationName: station.name })
        store.dispatch({ type: SET_ORIGINAL_STATION_SONGS, songs: station.songs })
        store.dispatch({ type: SET_REMAINING_STATION_SONGS, songs: songsWithoutFirstSong })

    } catch (err) {
        console.log('PlayerActions: Error in loadStationToPlayer', err)
    }
}

export function setQueue(queue) {
    store.dispatch({ type: SET_QUEUE, queue })
}

export function resetAction() {
    store.dispatch({ type: SET_ACTION, action: playerActions.RESET_ACTION, actionParam: '' })
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