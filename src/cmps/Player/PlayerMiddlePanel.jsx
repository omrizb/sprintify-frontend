import { useSelector } from 'react-redux'

import { setPlayer, play, pause } from '../../store/actions/player.actions'

import { SvgIcon } from '../SvgIcon'

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
            <button onClick={handlePlayPause} className='btn-player-play'>
                {player.isPlaying ? <SvgIcon iconName="playerPause" /> : <SvgIcon iconName="playerPlay" />}
            </button>
        </div>
    )
}