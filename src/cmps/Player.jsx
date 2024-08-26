import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'

import { playerActions, setPlayer } from '../store/actions/player.actions'
import { PlayerLeftPanel } from './Player/PlayerLeftPanel'
import { PlayerMiddlePanel } from './Player/PlayerMiddlePanel'
import { PlayerRightPanel } from './Player/PlayerRightPanel'

export function Player({ songId = 'BciS5krYL80' }) {

    const player = useSelector(state => state.playerModule.player)
    const [ytPlayer, setYtPlayer] = useState(null)

    useEffect(() => {
        if (!ytPlayer) return
        ytPlayer.setVolume(player.volume)
    }, [player.volume])

    useEffect(() => {
        if (!ytPlayer) return
        switch (player.action) {
            case playerActions.PLAY:
                ytPlayer.playVideo()
                break
            case playerActions.PAUSE:
                ytPlayer.pauseVideo()
                break
        }
    }, [player.action])

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
        },
    }

    function onReady({ target }) {
        target.pauseVideo()
        setYtPlayer(target)
        setPlayer({
            songId,
            isPlaying: false,
            totalDuration: target.getDuration(),
            volume: target.getVolume(),
        })
    }

    function getPlayerState() {
        return ytPlayer.getPlayerState()
    }

    return (
        <div className="player-container">
            <YouTube videoId={songId} opts={opts} onReady={onReady} />
            <PlayerLeftPanel />
            <PlayerMiddlePanel getPlayerState={getPlayerState} />
            <PlayerRightPanel />
        </div>
    )
}