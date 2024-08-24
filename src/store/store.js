import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { stationReducer } from './reducers/station.reducer'
import { filterByReducer } from './reducers/filterBy.reducer'
import { userReducer } from './reducers/user.reducer'
import { playerReducer } from './reducers/player.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    filterByModule: filterByReducer,
    userModule: userReducer,
    playerModule: playerReducer,
    systemModule: systemReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
