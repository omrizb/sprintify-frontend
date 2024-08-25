export const SET_PLAYER = 'SET_PLAYER'
export const SET_ACTION = 'SET_ACTION'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_SONG_HISTORY = 'SET_SONG_HISTORY'
export const ADD_TO_SONG_HISTORY = 'ADD_TO_SONG_HISTORY'
export const SET_QUEUE = 'SET_QUEUE'
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'

const initialState = {
    player: {
        songId: '',
        isPlaying: false,
        duration: 0,
        volume: 100
    },
    action: '',
    playedSongsHistory: [],
    queue: [],
}

export function playerReducer(state = initialState, action = {}) {
    var newState = state

    switch (action.type) {
        case SET_PLAYER:
            newState = {
                ...state,
                player: { ...state.player, ...action.playerProps }
            }
            break
        case SET_ACTION:
            newState = { ...state, action: action.action }
            break
        case SET_VOLUME:
            newState = {
                ...state,
                player: { ...state.player, volume: action.volume }
            }
            break
        case SET_SONG_HISTORY:
            newState = { ...state, playedSongsHistory: action.playedSongsHistory }
            break
        case ADD_TO_SONG_HISTORY:
            newState = {
                ...state,
                playedSongsHistory: [...state.playedSongsHistory, action.songId]
            }
            break
        case SET_QUEUE:
            newState = { ...state, queue: action.queue }
            break
        case ADD_TO_QUEUE:
            newState = {
                ...state,
                queue: [...state.queue, action.songId]
            }
            break
        default:

    }
    return newState
}
