import { useState } from 'react'
import { SongPreview } from '../SongDetails/SongPreview'


export function SongListSearchPage({ songs, myStations, likedSongsStation }) {

    const [hoveredSpotifyId, setHoveredSpotifyId] = useState(null)
    const [selectedSpotifyId, setSelectedSpotifyId] = useState(null)

    const isSearchOrigin = true

    function onSetSelectedSpotifyId(spotifyId) {
        setSelectedSpotifyId(spotifyId)
    }


    return (

        <div className="song-list search-results-page">
            <h2>Songs</h2>
            <ul className="list-body">
                {songs.map(song => {
                    const selectedSongClass = (song.spotifyId === selectedSpotifyId) ? 'selected' : ''
                    return <li
                        key={song.spotifyId}
                        className={`song-list-item ${selectedSongClass}`}
                        onMouseEnter={() => setHoveredSpotifyId(song.spotifyId)}
                        onMouseLeave={() => setHoveredSpotifyId('')}
                        onClick={() => onSetSelectedSpotifyId(song.spotifyId)}
                    >
                        <SongPreview
                            isSearchOrigin={isSearchOrigin}
                            type={'mini-table'}
                            song={song}
                            isOwnedByUser={false}
                            myStations={myStations}
                            likedSongsStation={likedSongsStation}
                            hoveredSpotifyId={hoveredSpotifyId}
                            selectedSpotifyId={selectedSpotifyId}
                        />
                    </li>
                })}
            </ul>
        </div>
    )

}