import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { GlobalNav } from '../cmps/GlobalNav.jsx'
import { LeftSidebar } from '../cmps/LeftSidebar.jsx'
import { NowPlayingDetails } from '../cmps/NowPlayingDetails.jsx'
import { Player } from '../cmps/Player.jsx'


import { loadStations } from '../store/actions/station.actions.js'

export function StationIndex() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    const mainLayout = loggedinUser ? 'main-layout-loggedin' : 'main-layout'
    return (
        <div className={`station-index ${mainLayout}`}>
            {loggedinUser && <div className="global-nav-container">
                <GlobalNav />
            </div>}
            <div className="left-sidebar-container">
                <LeftSidebar />
            </div>
            <div className="main-view-container">
                <Outlet />
            </div>
            <div className="right-sidebar-container">
                <NowPlayingDetails />
            </div>
            <div className="now-playing-bar-container">
                <Player />
            </div>
        </div>
    )
}