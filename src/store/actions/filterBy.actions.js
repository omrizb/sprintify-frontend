import { store } from '../store.js'
import { SET_FILTER_BY } from '../reducers/filterBy.reducer.js'


export async function updateFilterBy(filterBy) {
    try {
        store.dispatch(getCmdSetFilterBy(filterBy))
    } catch (err) {
        console.log('Cannot set filter', err)
        throw err
    }
}


// Command Creators:

function getCmdSetFilterBy(filterBy) {
    return {
        type: SET_FILTER_BY,
        filterBy
    }
}




