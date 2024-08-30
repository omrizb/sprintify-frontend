import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { youtubeService } from '../services/youtube.service.js'
import { utilService } from '../services/util.service.js'
import { SongPreview } from '../cmps/SongDetails/SongPreview.jsx'

export function SearchResults() {
    const [isLoading, setIsLoading] = useState(true)
    const { txt } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        loadSongs(txt)
    }, [])

    async function loadSongs(value) {
        setIsLoading(true)
        try {
            const loadedSongs = await youtubeService.getVideos(value)
            setSongs(loadedSongs)
        } catch (err) {
            console.error(`Couldn't load videos`, err)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div>
            <h1>Search Results:</h1>

            {(!songs) && <h2> Youtube is blocking us!!</h2>}
            {songs &&
                <ul >
                    {songs.map((song, index) =>
                        <li key={song.songId} >
                            <SongPreview song={song} index={0} style={'search'} />
                        </li>)
                    }
                </ul>}
        </div>

    )
}
