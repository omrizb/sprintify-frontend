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
             <ul >
                    {songs.map(song =>
                        <li key={song.videoId} >{song.title}</li>)
                    }
                </ul>
        </div>
        
    )
}
