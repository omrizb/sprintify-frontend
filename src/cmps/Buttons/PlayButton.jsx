import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { youtubeService } from '../../services/youtube.service'
import { showErrorMsg } from '../../services/event-bus.service'
import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { SvgButton } from '../SvgButton'

export function PlayButton({ type, stationId, stationName, song }) {

    const player = useSelector(state => state.playerModule.player)
    const playerStationId = useSelector(state => state.playerModule.stationId)
    const [isPlaying, setIsPlaying] = useState(false)


    useEffect(() => {
        if (stationId && playerStationId !== stationId) {
            setIsPlaying(false)
        } else if (type === 'songPreview') {
            (player.song.spotifyId === song.spotifyId) ? setIsPlaying(player.isPlaying) : setIsPlaying(false)
        } else {
            setIsPlaying(player.isPlaying)
        }
    }, [player.isPlaying, player.song.spotifyId, playerStationId])

    async function handleClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!song) return
        if (stationId && playerStationId !== stationId) {
            setPlayerAction(playerActions.PAUSE)
            setPlayerAction(playerActions.LOAD_STATION, { stationId, song })
            setPlayerAction(playerActions.PLAY)
            setIsPlaying(true)
            return
        }

        if (player.song.spotifyId !== song.spotifyId && type === 'songPreview') {
            const singleSong = await getYtId(song)
            setPlayerAction(playerActions.PAUSE)
            setPlayerAction(playerActions.LOAD_SONG, { song: singleSong })
            setPlayerAction(playerActions.PLAY)
            setIsPlaying(true)
            return
        }

        if (!player.isPlaying) {
            setPlayerAction(playerActions.PLAY)
        } else {
            setPlayerAction(playerActions.PAUSE)
        }

    }

    async function getYtId(song) {
        if (song.YtId) return

        try {
            var ytSong = await youtubeService.getTopVideo(`song: ${song.songName} by ${song.artist.name}`)
            song.ytId = ytSong.songId
            return song
        } catch (err) {
            console.log('Could not get song from YouTube.', err)
            showErrorMsg('Defective song')
        }
    }

    let btnClass = ''
    let svgClass = ''
    let tooltipTxt = ''

    if (type === 'stationDetails') {
        btnClass = 'btn-station-details'
        svgClass = 'svg-normal'
        tooltipTxt = stationName
    } else if (type === 'stationDetailsSmall') {
        btnClass = 'btn-station-details-small'
        svgClass = 'svg-normal'
        tooltipTxt = stationName
    } else if (type === 'stationPreview') {
        btnClass = 'btn-station-preview'
        svgClass = 'svg-normal'
        tooltipTxt = stationName
    } else if (type === 'stationPreviewLight') {
        btnClass = 'btn-station-preview-light'
        svgClass = 'svg-normal'
        tooltipTxt = stationName
    } else if (type === 'songPreview') {
        btnClass = 'btn-song-preview'
        svgClass = 'svg-small2'
        tooltipTxt = song.songName
    }

    return (
        <div key={playerStationId} className="play-button">
            <SvgButton
                btnClass={btnClass}
                svgIcon={isPlaying ? 'playerPause' : 'playerPlay'}
                svgClass={svgClass}
                tooltipTxt={isPlaying ? `Pause ${tooltipTxt}` : `Play ${tooltipTxt}`}
                onClick={handleClick}
            />
        </div>
    )
}