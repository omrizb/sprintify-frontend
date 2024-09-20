import { useEffect, useState } from 'react'
import { spotifyService } from '../../services/spotify.service.js'
import { MiniSongPreview } from '../SongDetails/MiniSongPreview.jsx'
import { ArtistPreview } from '../Artists/ArtistPreview.jsx'



export function NowPlayingDetails({ song }) {

    const [artist, setArtist] = useState()

    useEffect(() => {
        if (!song) return
        loadArtist()
    }, [song])

    async function loadArtist() {
        try {
            setArtist(await spotifyService.getArtist(song.artist.spotifyId))
        } catch (err) {
            console.log('NowPlayingDetails error: Could not load artist.', err)
        }
    }

    return (
        <div className="now-playing-details">
            <MiniSongPreview song={song} type="card" />
            {artist && <ArtistPreview artist={artist} />}
        </div>
    )
}
