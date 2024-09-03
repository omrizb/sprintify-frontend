export const SET_PLAYER = 'SET_PLAYER'
export const ADD_TO_ACTION_QUEUE = 'ADD_TO_ACTION_QUEUE'
export const POP_FROM_ACTION_QUEUE = 'POP_FROM_ACTION_QUEUE'
export const SET_STATION_ID = 'SET_STATION_ID'
export const SET_STATION_NAME = 'SET_STATION_NAME'
export const SET_ORIGINAL_STATION_SONGS = 'SET_ORIGINAL_STATION_SONGS'
export const SET_REMAINING_STATION_SONGS = 'SET_REMAINING_STATION_SONGS'
export const POP_FROM_REMAINING_STATION_SONGS = 'POP_FROM_REMAINING_STATION_SONGS'
export const SET_QUEUE = 'SET_QUEUE'
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
export const SET_SONGS_HISTORY = 'SET_SONGS_HISTORY'
export const ADD_TO_SONGS_HISTORY = 'ADD_TO_SONGS_HISTORY'
export const POP_FROM_SONGS_HISTORY = 'POP_FROM_SONGS_HISTORY'

const initialState = {
    player: {
        song: '',
        totalDuration: '',
        elapsedDuration: 0,
        isPlaying: false,
        volume: 100,
    },
    control: {
        actionsQueue: [],
        actionParams: []
    },
    stationId: '',
    stationName: '',
    originalStationSongs: [],
    remainingStationSongs: [],
    queue: [],
    playedSongsHistory: [],
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
        case ADD_TO_ACTION_QUEUE:
            newState = {
                ...state,
                control: {
                    ...state.control,
                    actionsQueue: [...state.control.actionsQueue, action.action],
                    actionParams: [...state.control.actionParams, { ...action.actionParams }]
                }
            }
            break
        case POP_FROM_ACTION_QUEUE:
            newState = {
                ...state,
                control: {
                    ...state.control,
                    actionsQueue: state.control.actionsQueue.slice(1),
                    actionParams: state.control.actionParams.slice(1)
                }
            }
            break
        case SET_STATION_ID:
            newState = { ...state, stationId: action.stationId }
            break
        case SET_STATION_NAME:
            newState = { ...state, stationName: action.stationName }
            break
        case SET_ORIGINAL_STATION_SONGS:
            newState = { ...state, originalStationSongs: action.songs }
            break
        case SET_REMAINING_STATION_SONGS:
            newState = { ...state, remainingStationSongs: action.songs }
            break
        case POP_FROM_REMAINING_STATION_SONGS:
            newState = {
                ...state,
                remainingStationSongs: state.remainingStationSongs.slice(1)
            }
            break
        case SET_QUEUE:
            newState = { ...state, queue: [...action.queue] }
            break
        case ADD_TO_QUEUE:
            newState = {
                ...state,
                queue: [...state.queue, action.songId]
            }
            break
        case SET_SONGS_HISTORY:
            newState = { ...state, playedSongsHistory: action.playedSongsHistory }
            break
        case ADD_TO_SONGS_HISTORY:
            newState = {
                ...state,
                playedSongsHistory: [...state.playedSongsHistory, action.songId]
            }
            break
        case POP_FROM_SONGS_HISTORY:
            newState = { ...state, playedSongsHistory: state.playedSongsHistory.slice(0, -1) }
            break
        default:
            return state
    }
    return newState
}
