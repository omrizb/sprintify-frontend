import { useState } from 'react'
import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ station, onRemoveSong, likedSongsStation, type, myStations }) {

    const [hoveredSongId, setHoveredSongId] = useState(null)
    const [selectedSongId, setSelectedSongId] = useState(null)

    function onSetSelectedSongId(songId) {
        setSelectedSongId(songId)
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
                    const selectedSongClass = (song.songId === selectedSongId) ? 'selected' : ''
                    return <li
                        key={song.songId}
                        className={selectedSongClass}
                        onMouseEnter={() => setHoveredSongId(song.songId)}
                        onMouseLeave={() => setHoveredSongId('')}
                        onClick={() => onSetSelectedSongId(song.songId)}
                    >
                        <SongPreview
                            type={type}
                            song={song}
                            myStations={myStations}
                            stationId={station._id}
                            likedSongsStation={likedSongsStation}
                            onRemoveSong={onRemoveSong}
                            hoveredSongId={hoveredSongId}
                            selectedSongId={selectedSongId}
                            index={index + 1} />
                    </li>
                })}
            </ul>
        </div>
    )
}

