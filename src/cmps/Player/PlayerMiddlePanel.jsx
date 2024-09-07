import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { SvgButton } from '../SvgButton'
import { Slider } from '../Slider'
import { PanelIcon } from './PanelIcon'

export function PlayerMiddlePanel({ getPlayerState }) {

    const player = useSelector(state => state.playerModule.player)
    const queue = useSelector(state => state.playerModule.queue)

    function handlePlayPause() {
        const playerState = getPlayerState()
        if (playerState !== 1) {
            setPlayerAction(playerActions.PLAY)
        } else {
            setPlayerAction(playerActions.PAUSE)
        }
    }

    function handleDurationChange(duration) {
        setPlayerAction(playerActions.GOTO, { seconds: Math.floor(duration) })
    }

    return (
        <div className="player-middle-panel">
            <div className="actions">

                <PanelIcon
                    svgIcon="playerShuffle"
                    tooltipTxt="Shuffle"
                    isActive={queue.isShuffle}
                    onClick={() => setPlayerAction(playerActions.TOGGLE_SHUFFLE)}
                />
                <PanelIcon
                    svgIcon="playerPreviousSong"
                    tooltipTxt="Previous song"
                    onClick={() => setPlayerAction(playerActions.PLAY_PREV)}
                />
                <SvgButton
                    btnClass="btn-player-play"
                    svgIcon={player.isPlaying ? 'playerPause' : 'playerPlay'}
                    svgClass="svg-small1"
                    tooltipTxt={player.isPlaying ? 'Pause' : 'Play'}
                    onClick={handlePlayPause}
                />
                <PanelIcon
                    svgIcon="playerNextSong"
                    tooltipTxt="Next song"
                    onClick={() => setPlayerAction(playerActions.PLAY_NEXT)}
                />
                <PanelIcon
                    svgIcon="playerRepeat"
                    tooltipTxt="Repeat"
                    isActive={queue.isRepeat}
                    onClick={() => setPlayerAction(playerActions.TOGGLE_REPEAT)}
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