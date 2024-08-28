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

    useEffect(() => {
        loadSong(id)
        return console.log(songYT)
    }, [])

    async function loadSong(songId) {
        try {
            const songFromYT = await youtubeService.getVideoById(songId)
            const { snippet, contentDetails } = songFromYT
            const duration = youtubeService.parseISODuration(contentDetails.duration)
            console.log('duration:', duration)

            const song = {
                songId: songId,
                songName: snippet.title,
                description: snippet.description,
                imgUrl: snippet.thumbnails.high.url,
                // duration,
                artist: snippet.channelTitle,
                publishedAt: snippet.publishedAt,
            }

            setSongYT(song)
            console.log('songFromYT:', songFromYT)

        } catch (err) {
            console.error(`Couldn't load song from songdetails`, err)
        }
    }
    const songDuration = (songYT.duration.hours * 3600) + (songYT.duration.minutes * 60) + songYT.duration.seconds
    const songDurationTxt = utilService.getTimeStr(songDuration)

    const lyrics =
        `I used to rule the world
Seas would rise when I gave the word
Now in the morning, I sleep alone
Sweep the streets I used to own
I used to roll the dice
Feel the fear in my enemy's eyes
Listen as the crowd would sing
Now the old king is dead, long live the king
One minute, I held the key
Next the walls were closed on me
And I discovered that my castles stand
Upon pillars of salt and pillars of sand
I hear Jerusalem bells a-ringin'
Roman Cavalry choirs are singin'
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason, I can't explain
Once you'd gone, there was never, never an honest word
And that was when I ruled the world
It was a wicked and wild wind
Blew down the doors to let me in
Shattered windows and the sound of drums
People couldn't believe what I'd become
Revolutionaries wait
For my head on a silver plate
Just a puppet on a lonely string
Aw, who would ever wanna be king?
I hear Jerusalem bells a-ringin'
Roman Cavalry choirs are singing
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason, I can't explain
I know Saint Peter won't call my name
Never an honest word
But that was when I ruled the world
Oh-oh-oh, oh-oh, oh
Oh-oh-oh, oh-oh, oh
Oh-oh-oh, oh-oh, oh
Oh-oh-oh, oh-oh, oh
Oh-oh-oh, oh-oh, oh
I hear Jerusalem bells a-ringin'
Roman Cavalry choirs are singin'
Be my mirror, my sword and shield
My missionaries in a foreign field
For some reason I can't explain
I know Saint Peter won't call my name
Never an honest word
But that was when I ruled the world`

    return (
        <div className="song-details">
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

