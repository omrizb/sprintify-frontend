import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SvgButton } from '../SvgButton'
import { loadSongToPlayer, loadStationToPlayer, pause, play } from '../../store/actions/player.actions'

export function PlayButton({ type, stationId, stationName, songId, songName }) {

    const player = useSelector(state => state.playerModule.player)
    const playerStationId = useSelector(state => state.playerModule.stationId)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (playerStationId !== stationId) {
            setIsPlaying(false)
        } else if (type === 'songPreview' && player.songId === songId) {
            (player.songId === songId) ? setIsPlaying(player.isPlaying) : setIsPlaying(false)
        } else {
            setIsPlaying(player.isPlaying)
        }
    }, [player.isPlaying, player.songId, playerStationId])

    function handleClick() {
        if (playerStationId !== stationId) {
            loadStationToPlayer(stationId, songId)
            play()
            setIsPlaying(true)
            return
        } else if (player.songId !== songId) {
            loadSongToPlayer(songId)
            play()
            setIsPlaying(true)
            return
        }

        if (!player.isPlaying) {
            play()
        } else {
            pause()
        }
    }

    let btnClass = ''
    let svgClass = ''
    let tooltipTxt = ''

    if (type === 'stationDetails') {
        btnClass = 'btn-station-details'
        svgClass = 'svg-big'
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
        svgClass = 'svg-small'
        tooltipTxt = songName
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