import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'

import { playerActions, setPlayer } from '../store/actions/player.actions'
import { PlayerLeftPanel } from './Player/PlayerLeftPanel'
import { PlayerMiddlePanel } from './Player/PlayerMiddlePanel'
import { PlayerRightPanel } from './Player/PlayerRightPanel'

export function Player() {

    const player = useSelector(state => state.playerModule.player)
    const [ytPlayer, setYtPlayer] = useState(null)
    const [intervalId, setIntervalId] = useState(null)

    useEffect(() => {
        if (!ytPlayer) return
        if (intervalId) clearInterval(intervalId)
        if (!player.isPlaying) return

        const id = setInterval(() => {
            const elapsedDuration = Math.floor(ytPlayer.getCurrentTime())
            setPlayer({ elapsedDuration })
        }, 113)
        setIntervalId(id)

        return () => clearInterval(id)
    }, [ytPlayer, player.isPlaying])

    useEffect(() => {
        if (!ytPlayer) return
        ytPlayer.setVolume(player.volume)
    }, [player.volume])

    useEffect(() => {
        if (!ytPlayer) return
        switch (player.action) {
            case playerActions.PLAY:
                ytPlayer.playVideo()
                setPlayer({ isPlaying: true })
                break
            case playerActions.PAUSE:
                ytPlayer.pauseVideo()
                setPlayer({ isPlaying: false })
                break
            case playerActions.GOTO:
                ytPlayer.seekTo(player.actionParam, true)
                break
        }
    }, [player.action, player.actionParam])

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: player.isPlaying ? 1 : 0,
        },
    }

    function onReady({ target }) {
        setYtPlayer(target)
        setPlayer({
            totalDuration: target.getDuration(),
            elapsedDuration: 0
        })
    }

    function getPlayerState() {
        if (!ytPlayer) return
        return ytPlayer.getPlayerState()
    }

    return (
        <div className="player-container">
            <YouTube key={player.songId} videoId={player.songId} opts={opts} onReady={onReady} />
            <PlayerLeftPanel />
            <PlayerMiddlePanel getPlayerState={getPlayerState} />
            <PlayerRightPanel />
        </div>
    )
}