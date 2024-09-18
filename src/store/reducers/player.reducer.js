export const SET_FIRST_SONG_LOADED = 'SET_FIRST_SONG_LOADED'
export const SET_PLAYER = 'SET_PLAYER'
export const ADD_TO_ACTION_QUEUE = 'ADD_TO_ACTION_QUEUE'
export const POP_FROM_ACTION_QUEUE = 'POP_FROM_ACTION_QUEUE'
export const SET_STATION_ID = 'SET_STATION_ID'
export const SET_STATION_NAME = 'SET_STATION_NAME'
export const SET_ORIGINAL_STATION_SONGS = 'SET_ORIGINAL_STATION_SONGS'
export const SET_REMAINING_STATION_SONGS = 'SET_REMAINING_STATION_SONGS'
export const POP_FROM_REMAINING_STATION_SONGS = 'POP_FROM_REMAINING_STATION_SONGS'
export const SET_SONGS_ADDED_MANUALLY = 'SET_SONGS_ADDED_MANUALLY'
export const ADD_TO_SONGS_ADDED_MANUALLY = 'ADD_TO_SONGS_ADDED_MANUALLY'
export const POP_FROM_SONGS_ADDED_MANUALLY = 'POP_FROM_SONGS_ADDED_MANUALLY'
export const SET_SONGS_HISTORY = 'SET_SONGS_HISTORY'
export const ADD_TO_SONGS_HISTORY = 'ADD_TO_SONGS_HISTORY'
export const POP_FROM_SONGS_HISTORY = 'POP_FROM_SONGS_HISTORY'
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const TOGGLE_REPEAT = 'TOGGLE_REPEAT'
export const SET_PLAYER_ROLE = 'SET_PLAYER_ROLE'
export const SET_PLAYER_FROM_SOCKET = 'SET_PLAYER_FROM_SOCKET'

const initialState = {
    isFirstSongLoaded: false,
    player: {
        song: '',
        totalDuration: '',
        elapsedDuration: 0,
        isPlaying: false,
        volume: 100,
    },
    queue: {
        originalStationSongs: [],
        remainingStationSongs: [],
        songsAddedManually: [],
        playedSongsHistory: [],
        isShuffle: false,
        isRepeat: false
    },
    control: {
        actionsQueue: [],
        actionParams: []
    },
    stationId: '',
    stationName: '',
    role: '',
    isSync: false
}

export function playerReducer(state = initialState, action = {}) {
    var newState = state

    switch (action.type) {
        case SET_FIRST_SONG_LOADED:
            newState = { ...state, isFirstSongLoaded: action.isLoaded }
            break
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
                    actionParams: [...state.control.actionParams, { ...action.actionParams }],
                },
                isSync: action.isSync

            }
            console.log(state.isSync)
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
            newState = {
                ...state,
                queue: { ...state.queue, originalStationSongs: action.songs }
            }
            break
        case SET_REMAINING_STATION_SONGS:
            newState = {
                ...state,
                queue: { ...state.queue, remainingStationSongs: action.songs }
            }
            break
        case POP_FROM_REMAINING_STATION_SONGS:
            newState = {
                ...state,
                queue: {
                    ...state.queue,
                    remainingStationSongs: state.queue.remainingStationSongs.slice(1)
                }
            }
            break
        case SET_SONGS_ADDED_MANUALLY:
            newState = {
                ...state,
                queue: { ...state.queue, songsAddedManually: action.songs }
            }
            break
        case ADD_TO_SONGS_ADDED_MANUALLY:
            newState = {
                ...state,
                queue: {
                    ...state.queue,
                    songsAddedManually: [...state.queue.songsAddedManually, ...action.songs],
                }
            }
            break
        case POP_FROM_SONGS_ADDED_MANUALLY:
            newState = {
                ...state,
                queue: {
                    ...state.queue,
                    songsAddedManually: state.queue.songsAddedManually.slice(1)
                }
            }
            break
        case SET_SONGS_HISTORY:
            newState = {
                ...state,
                queue: { ...state.queue, playedSongsHistory: action.songs }
            }
            break
        case ADD_TO_SONGS_HISTORY:
            newState = {
                ...state,
                queue: {
                    ...state.queue,
                    playedSongsHistory: [...state.queue.playedSongsHistory, action.song],
                }
            }
            break
        case POP_FROM_SONGS_HISTORY:
            newState = {
                ...state,
                queue: {
                    ...state.queue,
                    playedSongsHistory: state.queue.playedSongsHistory.slice(0, -1)
                }
            }
            break
        case TOGGLE_SHUFFLE:
            newState = { ...state, queue: { ...state.queue, isShuffle: !state.queue.isShuffle } }
            break
        case TOGGLE_REPEAT:
            newState = { ...state, queue: { ...state.queue, isRepeat: !state.queue.isRepeat } }
            break
        case SET_PLAYER_ROLE:
            newState = { ...state, role: action.role }
            break
        case SET_PLAYER_FROM_SOCKET:
            if (!state.isSync) {
                console.log(action)
                console.log(state.isSync)
                newState = { ...state, ...action.player, isSync: true }
                break
            }
            if (state.isSync) {
                console.log(state.isSync)
                // newState = {
                //     ...state,
                //     control: {
                //         ...action.control,
                //         actionsQueue: action.control.actionsQueue[0],
                //         actionsParams: action.control.actionsParams[0]
                //     },
                //     isSync: true
                // }
                newState = { ...state, ...action.player, isSync: true }
                break
            }

        default:
            return state
    }
    if (state.role === 'owner') {
        const stateToSend = { ...newState }
        delete stateToSend.role
        socketService.emit('player-change', stateToSend)
    }
    return newState
}
