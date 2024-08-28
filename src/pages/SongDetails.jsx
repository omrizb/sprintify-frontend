import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SongPreview } from '../cmps/StationDetails/SongPreview'
import { youtubeService } from '../services/youtube.service.js'
import { Footer } from '../cmps/Footer.jsx'
import { utilService } from '../services/util.service.js'
import { SongDetailsHeader } from '../cmps/SongDetails/SongDetailsHeader.jsx'
import { SongDetailsActions } from '../cmps/SongDetails/SongDetailsActions.jsx'
import { LongTxt } from '../cmps/LongTxt.jsx'


export function SongDetails() {

    const { id } = useParams()
    const [songYT, setSongYT] = useState({})
    const [bgColor, setBgColor] = useState(utilService.getRandomColor())


    useEffect(() => {
        setBgColor(utilService.getRandomColor())
        loadSong(id)
    }, [])

    async function loadSong(songId) {
        try {
            const songFromYT = await youtubeService.getVideoById(songId)
            const { snippet, contentDetails } = songFromYT
            const duration = youtubeService.parseISODuration(contentDetails.duration)
            console.log('Parsed Duration:', duration)

            const song = {
                songId: songId,
                songName: snippet.title,
                description: snippet.description,
                imgUrl: snippet.thumbnails.high.url,
                duration,
                artist: snippet.channelTitle,
                publishedAt: snippet.publishedAt,
            }

            setSongYT(song)
            console.log('songFromYT:', songFromYT)

        } catch (err) {
            console.error(`Couldn't load song from songdetails`, err)
        }
    }

    const songDuration =
        songYT.duration
            ? (songYT.duration.hours * 3600) + (songYT.duration.minutes * 60) + songYT.duration.seconds
            : 0;

    const songDurationTxt = utilService.getTimeStr(songDuration);

    const lyrics =
        `I used to rule the world
Seas would rise when I gave the word
Now in the morning, I sleep alone
Sweep the streets I used to own
I used to roll the dice
Feel the fear in my enemy's eyes`

    return (
        <div className="song-details"
            style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 30%, #121212 100%)` }}        >
            <SongDetailsHeader
                song={songYT}
                songDurationTxt={songDurationTxt}
            />
            <SongDetailsActions
                song={songYT}
            />
            <section className="lyrics">
                <h1>Lyrics</h1>
                <p><LongTxt txt={lyrics} /></p>
            </section>
            <section className="artist-container list">
                <div className="image-container">
                    <img className="artist-img" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="Artist img"></img>
                </div>
                <div className="text">
                    <div className="type"> Artist </div>
                    <div className="name">{songYT.artist}</div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

