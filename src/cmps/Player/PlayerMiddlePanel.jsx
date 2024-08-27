import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { play, pause, goto } from '../../store/actions/player.actions'
import { SvgButton } from '../SvgButton'
import { Slider } from '../Slider'

export function PlayerMiddlePanel({ getPlayerState }) {

    const player = useSelector(state => state.playerModule.player)

    function handlePlayPause() {
        const playerState = getPlayerState()
        if (playerState !== 1) {
            play()
        } else {
            pause()
        }
    }

    function handleDurationChange(duration) {
        goto(Math.floor(duration))
    }

    return (
        <div className="player-middle-panel">
            <div className="actions">

                <SvgButton
                    btnClass="btn-dark2"
                    svgIcon="playerShuffle"
                    svgClass="svg-small"
                    tooltipTxt="Shuffle"
                />
                <SvgButton
                    btnClass="btn-dark2"
                    svgIcon="playerPreviousSong"
                    svgClass="svg-small"
                    tooltipTxt="Previous song"

                />
                <SvgButton
                    btnClass="btn-player-play"
                    svgIcon={player.isPlaying ? 'playerPause' : 'playerPlay'}
                    svgClass="svg-small"
                    tooltipTxt={player.isPlaying ? 'Pause' : 'Play'}
                    onClick={handlePlayPause}
                />
                <SvgButton
                    btnClass="btn-dark2"
                    svgIcon="playerNextSong"
                    svgClass="svg-small"
                    tooltipTxt="Next song"
                />
                <SvgButton
                    btnClass="btn-dark2"
                    svgIcon="playerRepeat"
                    svgClass="svg-small"
                    tooltipTxt="Repeat"
                />
            </div>
            <div className="duration-bar">
                <div className="elapsed-time">{utilService.getTimeStr(player.elapsedDuration)}</div>
                <Slider
                    key={player.elapsedDuration}
                    value={player.elapsedDuration}
                    min={0}
                    max={player.totalDuration}
                    onChange={handleDurationChange}
                    setOnMouseup={true}
                />
                <div className="total-time">{utilService.getTimeStr(player.totalDuration)}</div>
            </div>
        </div>
    )
}