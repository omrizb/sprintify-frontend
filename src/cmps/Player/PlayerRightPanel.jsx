import { SvgIcon } from '../SvgIcon'

export function PlayerRightPanel() {
    return (
        <div className="player-right-panel">
            <button className="btn-dark2">
                <SvgIcon iconName="playerNowPlaying" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerLyrics" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerQueue" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerConnectDevice" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerVolume" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerOpenMiniPlayer" svgClass="svg-small" />
            </button>
            <button className="btn-dark2">
                <SvgIcon iconName="playerFullScreen" svgClass="svg-small" />
            </button>
        </div>
    )
}