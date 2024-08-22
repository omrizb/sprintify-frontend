import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { StationIndex } from './pages/StationIndex.jsx'
import { MainView } from './pages/MainView.jsx'
import { Search } from './pages/Search.jsx'
import { StationDetails } from './pages/StationDetails.jsx'

import './assets/style/main.scss'

export function App() {
    return (

        
        // <UserMsg />

        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<StationIndex />}>
                        <Route index element={<MainView />} />
                        <Route path="/station/:id" element={<StationDetails />} />
                        <Route path="/search" element={<Search />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    )
}