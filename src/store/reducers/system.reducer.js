export const SET_RIGHT_SIDEBAR_CONTENT = 'SET_RIGHT_SIDEBAR_CONTENT'
export const SET_RIGHT_SIDEBAR_WIDTH = 'SET_RIGHT_BAR_WIDTH'

const initialState = {
    rightSidebarContent: 'nowPlaying',
    rightSidebarWidth: 280
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_RIGHT_SIDEBAR_CONTENT:
            return { ...state, rightSidebarContent: action.rightSidebarContent }
        case SET_RIGHT_SIDEBAR_WIDTH:
            return { ...state, rightSidebarWidth: action.width }
        default: return state
    }
}
