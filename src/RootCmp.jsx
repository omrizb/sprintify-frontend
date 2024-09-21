import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { StationIndex } from './pages/StationIndex.jsx'
import { MainView } from './pages/MainView.jsx'
import { Search } from './pages/Search.jsx'
import { SearchResults } from './pages/SearchResults.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { SongDetails } from './pages/SongDetails.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Tooltip } from './cmps/Tooltip.jsx'

import './assets/style/main.scss'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <UserMsg />
                <Tooltip />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<StationIndex />}>
                        <Route index element={<MainView />} />
                        <Route path="/station/:id" element={<StationDetails />} />
                        <Route path="/track/:id" element={<SongDetails />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:txt" element={<SearchResults />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </Provider>
    )
}