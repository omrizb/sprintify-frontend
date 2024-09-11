export const SET_FILTER_BY = 'SET_FILTER_BY'
export const RESET_FILTER_BY = 'RESET_FILTER_BY'

const defaultFilterBy = {
    txt: '',
    stationType: '',
    createdBy: '',
    sortField: '',
    sortDir: '',
    userId: '',
    createdAt: '',
    addedAt: ''
}

const initialState = {
    filterBy: defaultFilterBy
}

export function filterByReducer(state = initialState, action) {
    var newState = state

    switch (action.type) {
        case SET_FILTER_BY:
            newState = { ...state, filterBy: action.filterBy }
            break

        case RESET_FILTER_BY:
            newState = { ...state, filterBy: defaultFilterBy }
            break

        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const filterBy = { txt: 'chill', sortField: 'playlists', sortDir: 1 }


    state = filterByReducer(state, { type: SET_FILTER_BY, filterBy: filterBy })
    console.log('After SET_FILTER_BY:', state)


}

