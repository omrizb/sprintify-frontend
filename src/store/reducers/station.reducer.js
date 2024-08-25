export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_SONG_TO_STATION = 'ADD_SONG_TO_STATION'
export const REMOVE_SONG_FROM_STATION = 'REMOVE_SONG_FROM_STATION'
const currStation = {
    _id: 'A1b2C3d4E5',
    name: 'Summer Vibes',
    type: 'playlist',
    // type: 'podcast',
    isLikedSongs: false,
    // isLikedSongs: true,
    tags: ['Happy', 'Chill', 'Upbeat'],
    imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
    description: 'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
    isOwnedByUser: true,
    createdBy: {
        id: 'A1b2C3d4E5',
        fullName: 'Olivia Smith',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    },
    likedByUsers: ['F6g7H8i9J0', 'K1L2M3N4O5'],//isLikedSongs:false,
    // likedByUsers: ['A1b2C3d4E5'],//isLikedSongs:true only id createdBy
    songs: [
        {
            songId: 'fJ9rUzIMcZQ',
            songName: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
            imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
            duration: { hours: 0, minutes: 6, seconds: 0 }
        },
        {
            songId: 'JGwWNGJdvx8',
            songName: 'Shape of You',
            artist: 'Ed Sheeran',
            album: '÷ (Divide)',
            url: 'https://www.youtube.com/embed/JGwWNGJdvx8',
            imgUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
            duration: { hours: 0, minutes: 4, seconds: 24 }
        },
        {
            songId: 'Zi_XLOBDo_Y',
            songName: 'Billie Jean',
            artist: 'Michael Jackson',
            album: 'Thriller',
            url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
            imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
            duration: { hours: 0, minutes: 4, seconds: 56 }
        }
    ]
}
const initialState = {
    stations: [],
    station: currStation //fix later to null
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
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break
        case ADD_SONG_TO_STATION:
            newState = { ...state, station: { ...state.station, songs: [...state.station.songs || [], action.song] } }
            break
        case REMOVE_SONG_FROM_STATION:
            const updatedSongs = state.station.songs.filter(song => song.songId !== action.songId)
            newState = { ...state, station: { ...state.station, songs: updatedSongs } }
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

