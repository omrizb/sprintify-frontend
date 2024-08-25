import { store } from '../store'

import { SET_PLAYER, SET_ACTION, SET_VOLUME, SET_SONG_HISTORY, ADD_TO_SONG_HISTORY, SET_QUEUE, ADD_TO_QUEUE } from '../reducers/player.reducer'

export const playerActions = {
    PLAY: 'play',
    PAUSE: 'pause',
}

export function setPlayer(playerProps) {
    store.dispatch({ type: SET_PLAYER, playerProps })
}

export function loadSong(songId) {

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