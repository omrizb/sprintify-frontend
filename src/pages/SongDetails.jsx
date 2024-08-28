import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SongPreview } from '../cmps/StationDetails/SongPreview'
import { youtubeService } from '../services/youtube.service'


export function SongDetails() {

    const { id } = useParams()
    const [ songYT , setSongYT ] = useState({})

    useEffect(() => {
        loadSong(id)

        return console.log(songYT)
    }, [])

    async function loadSong(songId) {
        try {
            const songFromYT = await youtubeService.getVideoById(songId)
            const { snippet, contentDetails } = songFromYT
            const songObj = {
                songId: songId,
                songName: snippet.title,
                description: snippet.description,
                imgUrl: snippet.thumbnails.high.url
            }
            
            setSongYT(songObj)

        } catch (err) {
            console.log(`Couldn't load song from songdetails`, err)
        }
    }

    
    return (
        <div className="song-details">
            
            {/* <SongPreview song={song} viewMode={'song-details'} /> */}
            
            <h2>{songYT.songName}</h2>
            <div>{songYT.description}</div>
            <img src={songYT.imgUrl} alt="" />
            
        </div>
    )
}

