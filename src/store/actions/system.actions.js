import { store } from '../store.js'
import { SET_RIGHT_SIDEBAR_CONTENT, SET_RIGHT_SIDEBAR_WIDTH } from '../reducers/system.reducer.js'

export const rightSidebarContentKeys = {
    NOW_PLAYING: 'nowPlaying',
    LYRICS: 'lyrics',
    QUEUE: 'queue',
    CONNECT_DEVICE: 'connectDevice',
    OPEN_MINIPLAYER: 'openMiniplayer',
    FULL_SCREEN: 'fullScreen'
}

export async function setRightSidebarContent(rightSidebarContent) {
    try {
        store.dispatch({ type: SET_RIGHT_SIDEBAR_CONTENT, rightSidebarContent })
    } catch (err) {
        console.log('System Actions error: setRightSidebarContent:', err)
    }
}

export async function setRightSidebarWidth(rightSidebarWidth) {
    try {
        store.dispatch({ type: SET_RIGHT_SIDEBAR_WIDTH, rightSidebarWidth })
    } catch (err) {
        console.log('System Actions error: setRightSidebarWidth:', err)
    }
}