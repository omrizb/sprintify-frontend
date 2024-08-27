import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { stationService } from '../services/station/station.service.local'
import { SongPreview } from '../cmps/StationDetails/SongPreview'


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
            
            {/* <SongPreview song={song} viewMode={'song-details'} /> */}
            <div>{song.songId}</div>
            <div>{song.songName}</div>
            <div>{song.album}</div>
            <div>{song.artist}</div>
           
        </div>
    )
}

