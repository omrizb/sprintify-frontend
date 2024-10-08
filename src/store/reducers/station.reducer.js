export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const SET_STATION_BACKUP = 'SET_STATION_BACKUP'
export const RESTORE_FROM_BACKUP = 'RESTORE_FROM_BACKUP'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UPDATE_STATIONS = 'UPDATE_STATIONS'
export const UPDATE_STATION_AND_STAY = 'UPDATE_STATION_AND_STAY'


const initialState = {
    stations: [],
    station: null,
    stationBackup: null,
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {

        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break

        case SET_STATION:
            newState = { ...state, station: action.station }
            break

        case SET_STATION_BACKUP:
            newState = { ...state, stationBackup: state.station }
            break

        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, station: lastRemovedStation }
            break

        case ADD_STATION:
            if (state.stations.length === 0) {
                newState = {
                    ...state,
                    stations: [action.station]
                }
                break
            }

            const pinnedStations = state.stations.filter(station => station.isPinned === true)
            const unPinnedStations = state.stations.filter(station => station.isPinned === false)

            if (state.station.lastIdx) {
                var idx = state.station.lastIdx - pinnedStations.length
            }
            else idx = 0

            newState = {
                ...state,
                stations: [
                    ...pinnedStations,
                    ...unPinnedStations.slice(0, idx),
                    action.station,
                    ...unPinnedStations.slice(idx)
                ],

                station: action.station
            }
            break


        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations, station: action.station }
            break

        case RESTORE_FROM_BACKUP:
            stations = state.stations.map(station => (station._id === state.stationBackup._id) ? state.stationBackup : station)
            newState = { ...state, stations, station: state.stationBackup }
            break

        case UPDATE_STATIONS:
            const updatedStations = state.stations.map(station => {
                const updatedStation = action.stations.find(updated => updated._id === station._id)
                return updatedStation ? updatedStation : station
            })

            newState = { ...state, stations: updatedStations }
            break

        case UPDATE_STATION_AND_STAY:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break

        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const station1 = { _id: 'b101', vendor: 'Station ' + parseInt(Math.random() * 10), msgs: [] }
    const station2 = { _id: 'b102', vendor: 'Station ' + parseInt(Math.random() * 10), msgs: [] }

    state = stationReducer(state, { type: SET_STATIONS, stations: [station1] })
    console.log('After SET_STATIONS:', state)

    state = stationReducer(state, { type: ADD_STATION, station: station2 })
    console.log('After ADD_STATION:', state)

    state = stationReducer(state, { type: UPDATE_STATION, station: { ...station2, vendor: 'Good' } })
    console.log('After UPDATE_STATION:', state)

    state = stationReducer(state, { type: REMOVE_STATION, stationId: station2._id })
    console.log('After REMOVE_STATION:', state)

    // const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    // state = stationReducer(state, { type: ADD_STATION_MSG, stationId: station1._id, msg })
    // console.log('After ADD_STATION_MSG:', state)

    state = stationReducer(state, { type: REMOVE_STATION, stationId: station1._id })
    console.log('After REMOVE_STATION:', state)
}
