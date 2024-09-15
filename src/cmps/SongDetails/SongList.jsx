import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'
import { ItemTypes } from '../ItemTypes.jsx'

export function SongList({ station, isOwnedByUser, onRemoveSong, likedSongsStation, type, myStations }) {

    const [hoveredSpotifyId, setHoveredSpotifyId] = useState(null)
    const [selectedSpotifyId, setSelectedSpotifyId] = useState(null)


    function onSetSelectedSpotifyId(spotifyId) {
        setSelectedSpotifyId(spotifyId)
    }


    return (
        <div className="song-list inline-container">

            {type === 'table' &&
                <div className={`list-header ${type === 'table' && 'dynamic-grid'}`}>
                    <div className="index">#</div>
                    <div className="title">Title</div>
                    <div className="album">Album</div>
                    <div className="date-added">Date Added</div>
                    <div className="duration"><SvgIcon className="icon" iconName="duration" /></div>
                </div>
            }

            <ul className="list-body">
                {station.songs.map((song, index) => {
                    const selectedSongClass = (song.spotifyId === selectedSpotifyId) ? 'selected' : ''
                    const [collected, drag, dragPreview] = useDrag(() => ({
                        type: ItemTypes.SONG,
                        item: song,
                        collect: (monitor => ({
                            isDragging: monitor.isDragging(),
                            handlerId: monitor.getHandlerId()
                        }))
                    }))
                    console.log(collected)
                    console.log(drag)
                    console.log(dragPreview)
                    return <li
                        key={song.spotifyId}
                        className={`song-list-item ${selectedSongClass}`}
                        onMouseEnter={() => setHoveredSpotifyId(song.spotifyId)}
                        onMouseLeave={() => setHoveredSpotifyId('')}
                        onClick={() => onSetSelectedSpotifyId(song.spotifyId)}
                    >
                        <SongPreview
                            type={type}
                            song={song}
                            station={station}
                            isOwnedByUser={isOwnedByUser}
                            myStations={myStations}
                            stationId={station._id}
                            likedSongsStation={likedSongsStation}
                            onRemoveSong={onRemoveSong}
                            hoveredSpotifyId={hoveredSpotifyId}
                            selectedSpotifyId={selectedSpotifyId}
                            index={index + 1} />
                    </li>
                })}
            </ul>
        </div>
    )
}

