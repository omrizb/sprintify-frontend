import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { spotifyService } from '../services/spotify.service.js'
import { DetailsPageHeader } from '../cmps/Headers/DetailsPageHeader.jsx'


export function SongDetails() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [song, setSong] = useState({})



    useEffect(() => {
        loadSong(id)
    }, [id])

    async function loadSong(id) {
        setIsLoading(true)
        try {
            const song = await spotifyService.getSong(id)
            setSong(song)
        } catch (err) {
            console.error(`Couldn't load song from song details`, err)
        } finally {
            setIsLoading(false)
        }
    }

    // const songDuration = !song
    //     ? 0
    //     : (song.duration.hours * 3600) + (song.duration.minutes * 60) + song.duration.seconds

    // const songDurationTxt = utilService.getTimeStr(songDuration)



    return (
        <div className="song-details">

            {isLoading && <div>Loading...</div>}

            {(!isLoading) &&
                <DetailsPageHeader song={song} pageType={'song'} />
            }


        </div>
    )
}



