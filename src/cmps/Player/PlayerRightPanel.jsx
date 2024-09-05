import { useSelector } from 'react-redux'


import { setRightSidebarContent, rightSidebarContentKeys, setIsRightSidebarOpen } from '../../store/actions/system.actions'
import { VolumeController } from './VolumeController'
import { PanelIcon } from './PanelIcon'
import { useEffect } from 'react'

export function PlayerRightPanel() {

    const activeIcon = useSelector(state => state.systemModule.rightSidebarContent)
    const isRightSidebarOpen = useSelector(state => state.systemModule.isRightSidebarOpen)

    useEffect(() => {
        if (!isRightSidebarOpen) setRightSidebarContent('')
    }, [isRightSidebarOpen])

    function handleIconClick(key) {
        if (activeIcon === key) {
            setRightSidebarContent('')
            setIsRightSidebarOpen(false)
        } else {
            setRightSidebarContent(key)
            setIsRightSidebarOpen(true)
        }
    }

    return (
        <div className="player-right-panel">
            <PanelIcon
                svgIcon="playerNowPlaying"
                tooltipTxt="Now playing view"
                isActive={activeIcon === rightSidebarContentKeys.NOW_PLAYING}
                onClick={() => handleIconClick(rightSidebarContentKeys.NOW_PLAYING)}
            />
            <PanelIcon
                svgIcon="playerLyrics"
                tooltipTxt="Lyrics"
                isActive={activeIcon === rightSidebarContentKeys.LYRICS}
                onClick={() => handleIconClick(rightSidebarContentKeys.LYRICS)}
            />
            <PanelIcon
                svgIcon="playerQueue"
                tooltipTxt="Queue"
                isActive={activeIcon === rightSidebarContentKeys.QUEUE}
                onClick={() => handleIconClick(rightSidebarContentKeys.QUEUE)}
            />
            <PanelIcon
                svgIcon="playerConnectDevice"
                tooltipTxt="Connect a device"
                isActive={activeIcon === rightSidebarContentKeys.CONNECT_DEVICE}
                onClick={() => handleIconClick(rightSidebarContentKeys.CONNECT_DEVICE)}
            />
            <VolumeController />
            <PanelIcon
                svgIcon="playerOpenMiniPlayer"
                tooltipTxt="Open Miniplayer"
            />
            <PanelIcon
                svgIcon="playerFullScreen"
                tooltipTxt="Full screen"
            />
        </div>
    )
}