export const SET_RIGHT_SIDEBAR_CONTENT = 'SET_RIGHT_SIDEBAR_CONTENT'
export const SET_RIGHT_SIDEBAR_WIDTH = 'SET_RIGHT_BAR_WIDTH'
export const SET_IS_SIDEBAR_OPEN = 'SET_IS_SIDEBAR_OPEN'
export const SET_IS_SONG_DRAGGED = 'SET_IS_SONG_DRAGGED'

const initialState = {
    rightSidebarContent: 'nowPlaying',
    rightSidebarWidth: 280,
    isRightSidebarOpen: false,
    isSongDragged: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_RIGHT_SIDEBAR_CONTENT:
            return { ...state, rightSidebarContent: action.rightSidebarContent }
        case SET_RIGHT_SIDEBAR_WIDTH:
            return { ...state, rightSidebarWidth: action.width }
        case SET_IS_SIDEBAR_OPEN:
            return { ...state, isRightSidebarOpen: action.isOpen }
        case SET_IS_SONG_DRAGGED:
            return { ...state, isSongDragged: action.isDragged }
        default: return state
    }
}
