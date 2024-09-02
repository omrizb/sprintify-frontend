import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'

export function SongPreview(props) {

    const { song, stationId, likedSongsIds, hoveredSongId, selectedSongId, index, type, onRemoveSong } = props

    let articleClassName
    switch (type) {
        case 'list':
            articleClassName = 'list dynamic-grid'
    }


    const { songId, songName, artist, album, url, imgUrl, duration } = song
    const isHovered = song.songId === hoveredSongId
    const isHighlighted = isHovered || song.songId === selectedSongId
    const isLikedByUser = likedSongsIds && likedSongsIds.includes(song.songId)

    return (
        <article className={`song-preview ${articleClassName} ${isHighlighted ? 'highlight' : ''}`}>
            <div className="index flex">
                {isHovered
                    ? <PlayButton
                        type="songPreview"
                        stationId={stationId}
                        songId={songId}
                        songName={songName}
                    />
                    : index}
            </div>
            <div className="small-preview flex">
                <img className="thumbnail" src={imgUrl} alt={songName} />
                <span className="song-name"><Link to={`/track/${songId}`}>{songName}</Link></span>
                <span className="artist">{artist}</span>
            </div>
            <div className="album">{album}</div>
            <div className="song-duration">
                {/* <button className="btn-tinted"
                    onClick={() => onRemoveSong(song.songId)}>X
                </button>
                <button className="btn-tinted"
                    onClick={() => onAddSong(song)}>Add
                </button> */}
                <div className="add-btn-container">
                    {<DynamicButton isHighlighted={isHighlighted} isLikedByUser={isLikedByUser} />}
                </div>
                <span>{utilService.getTimeStr(duration)}</span>
                <div className="dots-container">{isHighlighted && <DotsButton type="songPreview" elementName={songName} />}</div>
            </div>
        </article>
    )
}

function DynamicButton({ isLikedByUser, isHighlighted }) {
    if (isLikedByUser) return <VButton type="addToStation" />
    else if (isHighlighted) return <AddToButton type="addToLikedSongs" />
}

