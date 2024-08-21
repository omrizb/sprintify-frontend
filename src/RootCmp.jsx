import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { StationIndex } from './pages/StationIndex.jsx'
import { MainView } from './pages/MainView.jsx'
import { Search } from './pages/Search.jsx'
import { imgService } from './services/imgService.js'

import './assets/style/main.scss'

export function App() {
    return (

        // <AppHeader />
        // <UserMsg />
        
        <Provider store={store}>
            <img src={imgService.getImg('liked')} alt="" />
            <Router>
                <Routes>
                    <Route path="/" element={<StationIndex />}>
                        <Route index element={<MainView />} />
                        <Route path="/search" element={<Search />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    )
}