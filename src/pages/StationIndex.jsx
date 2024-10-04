import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { login, logout } from '../store/actions/user.actions.js'
import { GlobalNav } from '../cmps/GlobalNav.jsx'
import { LeftSidebar } from '../cmps/LeftSidebar.jsx'
import { RightSideBar } from '../cmps/RightSideBar.jsx'
import { Player } from '../cmps/Player.jsx'
import { SignupFooter } from '../cmps/SignupFooter.jsx'


export function StationIndex() {

    const user = useSelector(state => state.userModule.user)

    const rightSidebarWidth = useSelector(state => state.systemModule.rightSidebarWidth)
    const isRightSidebarOpen = useSelector(state => state.systemModule.isRightSidebarOpen)
    const mainViewContainerRef = useRef()

    // Unmark to set a default logged in user
    useEffect(() => {
        if (!user) {
            const credentials = {
                username: 'darr',
                password: 'darr'
            }

            onLogin(credentials)
        }
    }, [])

    async function onLogin(credentials) {
        await logout()
        await login(credentials)
        window.location.reload()
    }

    const mainLayout = user ? 'main-layout-loggedin' : 'main-layout'
    return (
        <div className={`station-index ${mainLayout}`}>
            <div className="global-nav-container">
                <GlobalNav />
            </div>
            <div className="left-sidebar-container scrollable-container">
                <LeftSidebar />
            </div>
            <div className="main-view-container scrollable-container" ref={mainViewContainerRef}>
                <Outlet key={useParams().id} context={{ containerRef: mainViewContainerRef }} />
            </div>
            <div
                className={`right-sidebar-container scrollable-container ${!isRightSidebarOpen && 'right-sidebar-closed'}`}
                style={{ width: rightSidebarWidth }}
            >
                <RightSideBar />
            </div>
            <div className="now-playing-bar-container">
                {user
                    ? <Player />
                    : <SignupFooter />
                }
            </div>
        </div >
    )
}