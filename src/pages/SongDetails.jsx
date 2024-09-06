import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { spotifyService } from '../services/spotify.service.js'
import { DetailsPageHeader } from '../cmps/Headers/DetailsPageHeader.jsx'
import { Loader } from '../cmps/Loader.jsx'


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


    return (isLoading)
        ? <Loader /> :
        <div className="song-details">

            <DetailsPageHeader song={song} pageType={'song'} />

        </div>

}



