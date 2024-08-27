import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stationService } from '../services/station/station.service.local'


export function SongDetails() {

    const { id } = useParams()
    const [ song , setSong ] = useState({})

    useEffect(() => {
        loadSong(id)
    }, [])

    async function loadSong(songId) {
        try {
            const songToLoad = await stationService.getSong(songId)
            setSong(songToLoad)

        } catch (err) {
            console.log(`Couldn't load song from songdetails`, err)
        }
    }

    return (
        <div className="song-details">
            
            {song.songName}
           
        </div>
    )
}