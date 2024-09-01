export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_FILTER_BY_MAIN = 'SET_FILTER_BY_MAIN'

const initialState = {
    filterBy: {
        txt: '',
        stationType: '',
        playListCreator: '',
        sortField: '',
        sortDir: '',
    }

}

export function filterByReducer(state = initialState, action) {
    var newState = state

    switch (action.type) {
        case SET_FILTER_BY:
            newState = { ...state, filterBy: action.filterBy }
            break

        case SET_FILTER_BY_MAIN:
            newState = { ...state, filterByMain: action.filterByMain }
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


    state = filterByReducer(state, { type: SET_FILTER_BY, filterBy: { ...filterBy, txt: 'party' } })
    console.log('After SET_FILTER_BY:', state)

}

