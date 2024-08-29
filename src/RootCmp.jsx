import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { StationIndex } from './pages/StationIndex.jsx'
import { MainView } from './pages/MainView.jsx'
import { Search } from './pages/Search.jsx'
import { SearchResults } from './pages/SearchResults.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { SongDetails } from './pages/SongDetails.jsx'

import './assets/style/main.scss'
import { AddStation } from './pages/AddStation.jsx'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                {/* <UserMsg /> */}
                <Routes>
                    <Route path="/" element={<StationIndex />}>
                        <Route index element={<MainView />} />
                        <Route path="/station/:id" element={<StationDetails />} />
                        <Route path="/track/:id" element={<SongDetails />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:txt" element={<SearchResults />} />
                        <Route path="/playlist/:id" element={<AddStation />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    )
}