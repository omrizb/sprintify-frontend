import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { youtubeService } from '../services/youtube.service.js'
import { utilService } from '../services/util.service.js'

export function SearchResults() {

    const { txt } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        loadSongs(txt)
    }, [])

    async function loadSongs(value) {
        try {
            const loadedSongs = await youtubeService.getVideos(value)
            setSongs(loadedSongs)

        } catch (err) {
            console.log(`Couldn't load videos`, err)
        }
    }


    return (
        <div>
            <h1>Search Results:</h1>

            {(!songs) && <h2> Youtube is blocking us!!</h2> }
            {songs &&
                <ul >
                    {songs.map(song =>
                        <li key={song.songId} >{song.songName}</li>)
                    }
                </ul>}
        </div>

    )
}
