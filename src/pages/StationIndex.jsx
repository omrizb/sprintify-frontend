import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { rightSidebarContentKeys } from '../store/actions/system.actions.js'

import { spotifyService } from '../services/spotify.service.js'
import { GlobalNav } from '../cmps/GlobalNav.jsx'
import { LeftSidebar } from '../cmps/LeftSidebar.jsx'
import { Player } from '../cmps/Player.jsx'
import { NowPlayingDetails } from '../cmps/RightSidebar/NowPlayingDetails.jsx'
import { NowPlayingLyrics } from '../cmps/RightSidebar/NowPlayingLyrics.jsx'
import { SongsQueue } from '../cmps/RightSidebar/SongsQueue.jsx'
import { ConnectDevice } from '../cmps/RightSidebar/ConnectDevice.jsx'

export function StationIndex() {

    const loggedinUser = useSelector(state => state.userModule.user)
    const rightSidebarContent = useSelector(state => state.systemModule.rightSidebarContent)
    const rightSidebarWidth = useSelector(state => state.systemModule.rightSidebarWidth)
    const mainViewContainerRef = useRef()

    let rightSidebarContentCmp
    switch (rightSidebarContent) {
        case rightSidebarContentKeys.NOW_PLAYING:
            rightSidebarContentCmp = <NowPlayingDetails />
            break
        case rightSidebarContentKeys.LYRICS:
            rightSidebarContentCmp = <NowPlayingLyrics />
            break
        case rightSidebarContentKeys.QUEUE:
            rightSidebarContentCmp = <SongsQueue />
            break
        case rightSidebarContentKeys.CONNECT_DEVICE:
            rightSidebarContentCmp = <ConnectDevice />
            break
    }

    const mainLayout = loggedinUser ? 'main-layout-loggedin' : 'main-layout'
    return (
        <div className={`station-index ${mainLayout}`}>
            {loggedinUser && <div className="global-nav-container">
                <GlobalNav />
            </div>}
            <div className="left-sidebar-container">
                <LeftSidebar />
            </div>
            <div className="main-view-container" ref={mainViewContainerRef}>
                <Outlet key={useParams().id} context={{ containerRef: mainViewContainerRef }} />
            </div>
            <div
                className={`right-sidebar-container${!rightSidebarContent ? ' right-sidebar-closed' : ''}`}
                style={rightSidebarContent ? { width: rightSidebarWidth } : undefined}
            >
                {rightSidebarContent && rightSidebarContentCmp}
            </div>
            <div className="now-playing-bar-container">
                <Player />
            </div>
        </div >
    )
}