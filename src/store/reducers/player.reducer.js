export const SET_PLAYER = 'SET_PLAYER'
export const SET_ACTION = 'SET_ACTION'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_STATION_SONGS = 'SET_STATION_SONGS'
export const SET_STATION_ID = 'SET_STATION_ID'
export const SET_STATION_NAME = 'SET_STATION_NAME'
export const MARK_STATION_SONG_AS_PLAYED = 'MARK_STATION_SONG_AS_PLAYED'
export const SET_SONG_HISTORY = 'SET_SONG_HISTORY'
export const ADD_TO_SONG_HISTORY = 'ADD_TO_SONG_HISTORY'
export const SET_QUEUE = 'SET_QUEUE'
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'

const initialState = {
    player: {
        songId: '',
        totalDuration: '',
        elapsedDuration: 0,
        isPlaying: false,
        volume: 100,
        action: '',
        actionParam: ''
    },
    stationId: '',
    stationName: '',
    stationSongs: [],
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
            newState = {
                ...state,
                player: {
                    ...state.player,
                    action: action.action,
                    actionParam: action.actionParam
                }
            }
            break
        case SET_VOLUME:
            newState = {
                ...state,
                player: { ...state.player, volume: action.volume }
            }
            break
        case SET_STATION_ID:
            newState = { ...state, stationId: action.stationId }
            break
        case SET_STATION_NAME:
            newState = { ...state, stationName: action.stationName }
            break
        case SET_STATION_SONGS:
            newState = {
                ...state,
                stationSongs: action.stationSongs.map(song => ({ songId: song.songId, played: false }))
            }
            break
        case MARK_STATION_SONG_AS_PLAYED:
            newState = {
                ...state,
                stationSongs: state.stationSongs.map(song => (song.songId === action.songId) ? ({ songId: song.songId, played: true }) : song)
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
            newState = { ...state, queue: [...action.queue] }
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
