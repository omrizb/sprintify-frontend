import { useSelector } from 'react-redux'

import { rightSidebarContentKeys, setIsRightSidebarOpen } from '../store/actions/system.actions.js'

import { NowPlayingDetails } from '../cmps/RightSidebar/NowPlayingDetails.jsx'
import { NowPlayingLyrics } from '../cmps/RightSidebar/NowPlayingLyrics.jsx'
import { SongsQueue } from '../cmps/RightSidebar/SongsQueue.jsx'
import { ConnectDevice } from '../cmps/RightSidebar/ConnectDevice.jsx'
import { SvgButton } from './SvgButton.jsx'
import { SlidingText } from './SlidingText.jsx'

export function RightSideBar() {

    const song = useSelector(state => state.playerModule.player.song)
    const rightSidebarContent = useSelector(state => state.systemModule.rightSidebarContent)

    if (!song) return <div className="right-side-bar"></div>

    let rightSidebarContentCmp
    let headerTxt

    switch (rightSidebarContent) {
        case rightSidebarContentKeys.NOW_PLAYING:
            headerTxt = song.songName
            rightSidebarContentCmp = <NowPlayingDetails song={song} />
            break
        case rightSidebarContentKeys.LYRICS:
            headerTxt = `Lyrics: ${song.songName}`
            rightSidebarContentCmp = <NowPlayingLyrics />
            break
        case rightSidebarContentKeys.QUEUE:
            headerTxt = 'Queue'
            rightSidebarContentCmp = <SongsQueue />
            break
        case rightSidebarContentKeys.CONNECT_DEVICE:
            headerTxt = 'Connect to a device'
            rightSidebarContentCmp = <ConnectDevice />
            break
    }

    return (
        <div className="right-side-bar">
            <header>
                <div className="header-text"><SlidingText txt={headerTxt} /></div>
                {rightSidebarContent === rightSidebarContentKeys.NOW_PLAYING &&
                    <SvgButton
                        btnClass="btn-medium-hover-white"
                        svgIcon="dotsSmall"
                        svgClass="svg-small1"
                        tooltipTxt={`More options for ${song.songName}`}
                    />}
                <SvgButton
                    btnClass="btn-medium-with-hover"
                    svgIcon="close"
                    svgClass="svg-small1"
                    tooltipTxt="close"
                    onClick={() => setIsRightSidebarOpen(false)}
                />
            </header>
            {rightSidebarContent && rightSidebarContentCmp}
        </div>
    )
}