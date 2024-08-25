import { SvgButton } from '../SvgButton'
import { VolumeController } from './VolumeController'

export function PlayerRightPanel() {

    return (
        <div className="player-right-panel">
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerNowPlaying"
                svgClass="svg-small"
                tooltipTxt="Now playing view"
            />
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerLyrics"
                svgClass="svg-small"
                tooltipTxt="Lyrics"
            />
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerQueue"
                svgClass="svg-small"
                tooltipTxt="Queue"
            />
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerConnectDevice"
                svgClass="svg-small"
                tooltipTxt="Connect a device"
            />
            <VolumeController />
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerOpenMiniPlayer"
                svgClass="svg-small"
                tooltipTxt="Open Miniplayer"
            />
            <SvgButton
                btnClass="btn-dark2"
                svgIcon="playerFullScreen"
                svgClass="svg-small"
                tooltipTxt="Full screen"
            />
        </div>
    )
}