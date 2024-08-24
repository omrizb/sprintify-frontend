import { useState } from 'react'
import YouTube from 'react-youtube'

import { SvgIcon } from './SvgIcon'

export function Player({ videoId }) {

    const [player, setPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
        },
    }

    function onReady({ target }) {
        console.log(target)
        setPlayer(target)
        target.pauseVideo()
    }

    function handlePlayPause() {
        const playerState = player.getPlayerState()
        if (playerState !== 1) {
            player.playVideo()
            setIsPlaying(true)
        } else {
            player.pauseVideo()
            setIsPlaying(false)
        }
    }

    return (
        <div className="player-container">
            <YouTube videoId="BciS5krYL80" opts={opts} onReady={onReady} />
            <button onClick={handlePlayPause} className='btn-player-play'>{isPlaying ? <SvgIcon iconName="playerPause" /> : <SvgIcon iconName="playerPlay" />}</button>
        </div>
    )
}