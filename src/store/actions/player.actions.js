// import { stationService } from '../../services/station/station.service.local'
import { stationService } from '../../services/station/station.service.remote'

import { store } from '../store'
import {
    SET_FIRST_SONG_LOADED,
    SET_PLAYER,
    ADD_TO_ACTION_QUEUE,
    POP_FROM_ACTION_QUEUE,
    SET_STATION_ID,
    SET_STATION_NAME,
    SET_REMAINING_STATION_SONGS,
    SET_ORIGINAL_STATION_SONGS,
    POP_FROM_REMAINING_STATION_SONGS,
    SET_SONGS_ADDED_MANUALLY,
    ADD_TO_SONGS_ADDED_MANUALLY,
    POP_FROM_SONGS_ADDED_MANUALLY,
    SET_SONGS_HISTORY,
    ADD_TO_SONGS_HISTORY,
    POP_FROM_SONGS_HISTORY,
    TOGGLE_SHUFFLE,
    TOGGLE_REPEAT,
    SET_PLAYER_ROLE,
    SET_PLAYER_FROM_SOCKET
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
    TOGGLE_SHUFFLE: 'toggleShuffle',
    TOGGLE_REPEAT: 'toggleRepeat',
    ADD_TO_QUEUE: 'addToQueue',
    REMOVE_FROM_QUEUE: 'removeFromQueue',
    CLEAR_QUEUE: 'clearQueue',
    RESET_ACTION: '',
}

// To be used by app components to set an action

export function loadFirstStation(stationId, song) {
    loadStationToPlayer(stationId, song)
    store.dispatch({ type: SET_FIRST_SONG_LOADED, isLoaded: true })
}

export function setPlayerAction(action, params) {
    store.dispatch({ type: ADD_TO_ACTION_QUEUE, action, actionParams: { ...params } })
}

// To be used ONLY by the player component component to execute action

export const executePlayerAction = {
    removeTopActionFromQueue,
    setPlayer,
    loadSongToPlayer,
    loadStationToPlayer,
    removeNextSongFromRemainingStationQueue,
    setSongsRemainingStationQueue,
    addSongsToAddedManuallyQueue,
    removeNextSongFromAddedManuallyQueue,
    setSongsAddedManuallyQueue,
    addSongToSongsHistory,
    removeSongFromSongsHistory,
    toggleShuffle,
    toggleRepeat
}

function removeTopActionFromQueue() {
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

        const firstSongIdx = station.songs.findIndex(currSong => currSong.spotifyId === song.spotifyId)
        if (firstSongIdx === -1) {
            throw 'Cannot find songId in station.'
        }

        const songsAfterFirstSong = (firstSongIdx + 1 === station.songs.length)
            ? []
            : station.songs.slice(firstSongIdx + 1)

        store.dispatch({ type: SET_PLAYER, playerProps: { song } })
        store.dispatch({ type: SET_STATION_ID, stationId: station._id })
        store.dispatch({ type: SET_STATION_NAME, stationName: station.name })
        store.dispatch({ type: SET_ORIGINAL_STATION_SONGS, songs: station.songs })
        store.dispatch({ type: SET_REMAINING_STATION_SONGS, songs: songsAfterFirstSong })

    } catch (err) {
        console.log('PlayerActions: Error in loadStationToPlayer', err)
    }
}

function removeNextSongFromRemainingStationQueue() {
    store.dispatch({ type: POP_FROM_REMAINING_STATION_SONGS })
}

function setSongsRemainingStationQueue(songs) {
    store.dispatch({ type: SET_REMAINING_STATION_SONGS, songs })
}

function addSongsToAddedManuallyQueue(songs) {
    store.dispatch({ type: ADD_TO_SONGS_ADDED_MANUALLY, songs })
}

function removeNextSongFromAddedManuallyQueue() {
    store.dispatch({ type: POP_FROM_SONGS_ADDED_MANUALLY })
}

function setSongsAddedManuallyQueue(songs) {
    store.dispatch({ type: SET_SONGS_ADDED_MANUALLY, songs })
}

function addSongToSongsHistory(song) {
    store.dispatch({ type: ADD_TO_SONGS_HISTORY, song })
}

function removeSongFromSongsHistory() {
    store.dispatch({ type: POP_FROM_SONGS_HISTORY })
}

function toggleShuffle() {
    store.dispatch({ type: TOGGLE_SHUFFLE })
}

function toggleRepeat() {
    store.dispatch({ type: TOGGLE_REPEAT })
}

export function setPlayerRole(role) {
    store.dispatch({ type: SET_PLAYER_ROLE, role })
}

export function setPlayerFromSocket(player) {
    store.dispatch({ type: SET_PLAYER_FROM_SOCKET, player })
}

