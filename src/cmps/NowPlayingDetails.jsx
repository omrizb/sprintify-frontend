import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { youtubeService } from '../services/youtube.service'

export function NowPlayingDetails() {

    const player = useSelector(state => state.playerModule.player)
    const stationName = useSelector(state => state.playerModule.stationName)
    const [song, setSong] = useState(null)

    useEffect(() => {
        loadSong(player.songId)
    }, [player.songId])

    async function loadSong(songId) {
        const ytSong = await youtubeService.getSongById(songId)
        setSong(ytSong)
    }

    return (
        <div className="now-playing-details">
            <h2>Station: {stationName}</h2>
            <pre>{JSON.stringify(song, false, 4)}</pre>

        </div>
    )
}