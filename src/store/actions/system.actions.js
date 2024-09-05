import { store } from '../store.js'
import { SET_RIGHT_SIDEBAR_CONTENT, SET_RIGHT_SIDEBAR_WIDTH, SET_IS_SIDEBAR_OPEN } from '../reducers/system.reducer.js'

export const rightSidebarContentKeys = {
    NOW_PLAYING: 'nowPlaying',
    LYRICS: 'lyrics',
    QUEUE: 'queue',
    CONNECT_DEVICE: 'connectDevice',
    OPEN_MINIPLAYER: 'openMiniplayer',
    FULL_SCREEN: 'fullScreen'
}

export function setRightSidebarContent(rightSidebarContent) {
    store.dispatch({ type: SET_RIGHT_SIDEBAR_CONTENT, rightSidebarContent })

}

export function setRightSidebarWidth(rightSidebarWidth) {
    store.dispatch({ type: SET_RIGHT_SIDEBAR_WIDTH, rightSidebarWidth })
}

export function setIsRightSidebarOpen(isOpen) {
    store.dispatch({ type: SET_IS_SIDEBAR_OPEN, isOpen })
}