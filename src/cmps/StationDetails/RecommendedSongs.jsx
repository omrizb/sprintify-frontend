import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import { spotifyService } from '../../services/spotify.service'



export function RecommendedSongs({ station, setSongs }) {


    useEffect(() => {
        loadSongs()
    }, [])


    async function loadSongs() {

        try {

            const songs = await spotifyService.getRecommendations(station.songs)
            setSongs(songs)


        } catch (err) {
            console.log(`Couldn't load songs`, err)
        }
    }

    return (
        <div className="recommended-songs">
            <header>
                <h2>Recommended</h2>
                <p>Based on what's in this playlist</p>
            </header>
        </div>
    )

}