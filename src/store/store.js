import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { stationReducer } from './station.reducer'
import { userReducer } from './user.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    userModule: userReducer,
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
