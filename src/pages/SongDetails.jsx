import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { youtubeService } from '../services/youtube.service.js'
import { utilService } from '../services/util.service.js'
import { SongDetailsHeader } from '../cmps/SongDetails/SongDetailsHeader.jsx'
import { SongDetailsActions } from '../cmps/SongDetails/SongDetailsActions.jsx'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { AddSongs } from '../cmps/AddSongs.jsx'
import { Footer } from '../cmps/Footer.jsx'


export function SongDetails() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [song, setSong] = useState(null)
    const [bgColor, setBgColor] = useState(utilService.getRandomColor())


    useEffect(() => {
        setBgColor(utilService.getRandomColor())
        loadSong(id)
    }, [id])

    async function loadSong(id) {
        setIsLoading(true)
        try {
            const song = await youtubeService.getSongById(id)
            setSong(song)
        } catch (err) {
            console.error(`Couldn't load song from song details`, err)
        } finally {
            setIsLoading(false)
        }
    }

    const songDuration = !song
        ? 0
        : (song.duration.hours * 3600) + (song.duration.minutes * 60) + song.duration.seconds

    const songDurationTxt = utilService.getTimeStr(songDuration)

    const lyrics =
        `I used to rule the world
            Seas would rise when I gave the word
            Now in the morning, I sleep alone
            Sweep the streets I used to own
            I used to roll the dice
            Feel the fear in my enemy's eyes`

    return (
        <div className="song-details"
            style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 30%, #121212 100%)` }}
        >
            {isLoading && <div>Loading...</div>}
            {song && (
                <div>
                    <SongDetailsHeader
                        song={song}
                        songDurationTxt={songDurationTxt}
                    />
                    <SongDetailsActions
                        song={song}
                    />
                    <section className="lyrics">
                        <h1>Lyrics</h1>
                        <p><LongTxt txt={lyrics} /></p>
                    </section>
                    <section className="artist-container list">
                        <div className="image-container">
                            <img
                                className="artist-img"
                                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                                alt="Artist img">
                            </img>
                        </div>
                        <div className="text">
                            <div className="type"> Artist </div>
                            <div className="name">{song.artist}</div>
                        </div>
                    </section>
                    <AddSongs
                        value={song.artist}
                        style={"recommended"}
                    />
                </div>
            )}
            <Footer />
        </div>
    )
}



