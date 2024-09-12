import { store } from '../store.js'
import { userService } from '../../services/user/user.service.remote.js'
import { SET_USER } from '../reducers/user.reducer.js'
import { SET_STATION, SET_STATIONS } from '../reducers/station.reducer.js'
import { RESET_FILTER_BY } from '../reducers/filterBy.reducer.js'
import { SET_FIRST_SONG_LOADED } from '../reducers/player.reducer.js'
import { socketService } from '../../services/socket.service.js'

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: SET_STATION, stations: null })
        store.dispatch({ type: SET_STATIONS, stations: [] })
        store.dispatch({ type: RESET_FILTER_BY })
        store.dispatch({ type: SET_FIRST_SONG_LOADED, isLoaded: false })
        socketService.logout()
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}

