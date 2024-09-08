import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { spotifyService } from '../services/spotify.service.js'
import { DetailsPageHeader } from '../cmps/Headers/DetailsPageHeader.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { HeaderFixer } from '../cmps/HeaderFixer.jsx'
import { PlayButton } from '../cmps/Buttons/PlayButton.jsx'
import { colorUtilService } from '../services/color.util.service.js'


export function SongDetails() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [song, setSong] = useState({})
    const [bgColor, setBgColor] = useState()



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
            <HeaderFixer
                header={renderHeader(song)}
                className="padded-top-rounded-box"
                bgColor={bgColor && colorUtilService.adjustBrightness(bgColor, 0.4)}
                showFromY={150}
            >

                <DetailsPageHeader
                    song={song}
                    pageType={'song'}
                    onSetBgColor={setBgColor} />
            </HeaderFixer>

        </div>

}

function renderHeader(song) {
    return (
        <div className="flex-regular-gap">
            {song &&
                <>
                    <PlayButton
                        type="song-preview"
                        song={song}
                    />
                    <div className="title-medium">{song.name}</div>
                </>
            }
        </div>
    )
}



