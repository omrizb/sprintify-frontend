import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'
import _ from 'lodash'

import { playerActions, executePlayerAction } from '../store/actions/player.actions'
import { PlayerLeftPanel } from './Player/PlayerLeftPanel'
import { PlayerMiddlePanel } from './Player/PlayerMiddlePanel'
import { PlayerRightPanel } from './Player/PlayerRightPanel'

export function Player() {

    const player = useSelector(state => state.playerModule.player)
    const control = useSelector(state => state.playerModule.control)
    const queue = useSelector(state => state.playerModule.queue)
    const loggedinUser = useSelector(state => state.userModule.user)

    const ytPlayerRef = useRef(null)
    const [isYtPlayerReady, setIsYtPlayerReady] = useState(false)
    const isProcessingRef = useRef(false)
    const [intervalId, setIntervalId] = useState(null)
    const playerElapsedDurationRef = useRef(player.elapsedDuration)

    useEffect(() => {
        if (!ytPlayerRef.current) return
        ytPlayerRef.current.addEventListener('onStateChange', onUpdatePlayerState)
        return () => {
            ytPlayerRef.current.removeEventListener('onStateChange', onUpdatePlayerState)
        }
    }, [ytPlayerRef.current])

    useEffect(() => {
        if (!ytPlayerRef.current
            || !isYtPlayerReady
            || control.actionsQueue.length === 0
            || isProcessingRef.current
        ) return

        isProcessingRef.current = true

        const actionToExecute = control.actionsQueue[0]
        const { song, songs, stationId, seconds, volume } = control.actionParams[0]

        // Check the next action to execute
        // console.log('Executing action:', actionToExecute, control.actionParams[0])

        switch (actionToExecute) {
            case playerActions.LOAD_SONG:
                executePlayerAction.addSongToSongsHistory(player.song)
                executePlayerAction.loadSongToPlayer(song)

                const songIdx = queue.originalStationSongs.findIndex(s => s.spotifyId === song.spotifyId)

                if (songIdx !== -1) {
                    const songs = (queue.isShuffle)
                        ? _.shuffle(queue.originalStationSongs)
                        : (songIdx + 1 === queue.originalStationSongs.length)
                            ? []
                            : queue.originalStationSongs.slice(songIdx + 1)

                    executePlayerAction.setSongsRemainingStationQueue(songs)
                }

                break

            case playerActions.LOAD_STATION:
                executePlayerAction.addSongToSongsHistory(player.song)
                executePlayerAction.loadStationToPlayer(stationId, song)
                break

            case playerActions.PLAY:
                ytPlayerRef.current.playVideo()
                executePlayerAction.setPlayer({ isPlaying: true })
                startSongDurationPolling()
                break

            case playerActions.PAUSE:
                ytPlayerRef.current.pauseVideo()
                executePlayerAction.setPlayer({ isPlaying: false })
                stopSongDurationPolling()
                break

            case playerActions.GOTO:
                ytPlayerRef.current.seekTo(seconds, true)
                break

            case playerActions.SET_VOLUME:
                ytPlayerRef.current.setVolume(volume)
                executePlayerAction.setPlayer({ volume })
                break

            case playerActions.PLAY_NEXT:
                let nextSong

                if (queue.songsAddedManually.length > 0) {
                    nextSong = queue.songsAddedManually[0]
                    executePlayerAction.removeNextSongFromAddedManuallyQueue()

                } else if (queue.remainingStationSongs.length > 0) {
                    nextSong = queue.remainingStationSongs[0]
                    executePlayerAction.removeNextSongFromRemainingStationQueue()

                } else if (queue.isRepeat) {
                    const songs = (queue.isShuffle)
                        ? _.shuffle(queue.originalStationSongs)
                        : queue.originalStationSongs

                    nextSong = songs[0]
                    executePlayerAction.setSongsRemainingStationQueue(songs.slice(1))

                } else {
                    executePlayerAction.setPlayer({ isPlaying: false })
                    break
                }

                executePlayerAction.addSongToSongsHistory(player.song)
                executePlayerAction.setPlayer({ song: nextSong })
                break

            case playerActions.PLAY_PREV:
                let prevSong
                if (queue.playedSongsHistory.length > 0) {
                    prevSong = queue.playedSongsHistory[0]
                    executePlayerAction.removeSongFromSongsHistory()
                } else {
                    break
                }

                executePlayerAction.setPlayer({ song: prevSong })
                break

            case playerActions.TOGGLE_SHUFFLE:
                if (queue.isShuffle) {
                    const currSongIdx = queue.originalStationSongs.findIndex(song => song.spotifyId === player.song.spotifyId)
                    const songsAfterCurrSong = (currSongIdx + 1 === queue.originalStationSongs.length)
                        ? []
                        : queue.originalStationSongs.slice(currSongIdx + 1)
                    executePlayerAction.setSongsRemainingStationQueue(songsAfterCurrSong)
                } else {
                    const shuffledSongs = _.shuffle(queue.originalStationSongs)
                    executePlayerAction.setSongsRemainingStationQueue(shuffledSongs)
                }
                executePlayerAction.toggleShuffle()
                break

            case playerActions.TOGGLE_REPEAT:
                executePlayerAction.toggleRepeat()
                break

            case playerActions.ADD_TO_QUEUE:
                executePlayerAction.addSongsToAddedManuallyQueue(songs)
                break

            case playerActions.REMOVE_FROM_QUEUE:
                break

            case playerActions.CLEAR_QUEUE:
                executePlayerAction.setSongsAddedManuallyQueue([])
                break

            case playerActions.RESET_ACTION:
                break
        }
        executePlayerAction.removeTopActionFromQueue()
        isProcessingRef.current = false
    }, [control])

    useEffect(() => {
        playerElapsedDurationRef.current = player.elapsedDuration
    }, [player.elapsedDuration])

    function startSongDurationPolling() {
        if (intervalId) clearInterval(intervalId)

        const id = setInterval(() => {
            const elapsedDuration = Math.floor(ytPlayerRef.current.getCurrentTime())
            if (elapsedDuration !== playerElapsedDurationRef.current) {
                executePlayerAction.setPlayer({ elapsedDuration })
            }
        }, 213)
        setIntervalId(id)
    }

    function stopSongDurationPolling() {
        clearInterval(intervalId)
    }

    function onReady({ target }) {
        target.setVolume(player.volume)
        ytPlayerRef.current = target
        setIsYtPlayerReady(true)
        executePlayerAction.setPlayer({
            totalDuration: target.getDuration(),
            elapsedDuration: 0
        })
    }

    function onUpdatePlayerState(ev) {

        switch (ev.data) {
            case -1:
                break
            case YT.PlayerState.ENDED:
                playerActions
                break
            case YT.PlayerState.PLAYING:
                break
            case YT.PlayerState.PAUSED:
                break
            case YT.PlayerState.BUFFERING:
                break
            case YT.PlayerState.CUE:
                break
        }
    }

    function getPlayerState() {
        if (!ytPlayerRef.current) return
        return ytPlayerRef.current.getPlayerState()
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: player.isPlaying ? 1 : 0,
        },
    }

    return (
        <div className="player-container">
            {loggedinUser
                ? <YouTube videoId={player.song.ytId} opts={opts} onReady={onReady} />
                : <div></div>
            }
            <PlayerLeftPanel />
            <PlayerMiddlePanel getPlayerState={getPlayerState} />
            <PlayerRightPanel />
        </div>
    )
}