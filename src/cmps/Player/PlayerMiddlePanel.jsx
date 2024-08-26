import { useSelector } from 'react-redux'

import { setPlayer, play, pause } from '../../store/actions/player.actions'

import { SvgButton } from '../SvgButton'

export function PlayerMiddlePanel({ getPlayerState }) {

    const player = useSelector(state => state.playerModule.player)

    function handlePlayPause() {
        const playerState = getPlayerState()
        if (playerState !== 1) {
            play()
            setPlayer({ isPlaying: true })
        } else {
            pause()
            setPlayer({ isPlaying: false })
        }
    }

    return (
        <div className="player-middle-panel">
            <SvgButton
                btnClass="btn-player-play"
                svgIcon={player.isPlaying ? 'playerPause' : 'playerPlay'}
                svgClass="svg-small"
                tooltipTxt={player.isPlaying ? 'Pause' : 'Play'}
                onClick={handlePlayPause}
            />
        </div>
    )
}