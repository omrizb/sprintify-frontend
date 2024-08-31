import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'

export function SongPreview({ station, song, index, type, onRemoveSong }) {
    let articleClassName
    let songPreviewType

    if (station) {
        var isOwnedByUser = station.createdBy.id === 'AAAA'
    }

    switch (type) {
        case 'list':
            articleClassName = 'dynamic-grid'
    }

    const { songName, artist, album, url, imgUrl, duration } = song

    return (
        <article className={`song-preview ${articleClassName}`}>
            <div>{index}</div>
            <div>
                <img className="thumbnail" src={imgUrl} alt={songName} />
                <span className="song-name"><Link to={`/track/${song.songId}`}>{songName}</Link></span>
                <span className="artist">{artist}</span>
            </div>
            <div className="album">{album}</div>
            <div className="song-duration">
                {isOwnedByUser && <button className="btn-tinted"
                    onClick={() => onRemoveSong(song.songId)}>X
                </button>}
                <button className="btn-tinted"
                    onClick={() => onAddSong(song)}>Add
                </button>
                {utilService.getTimeStr(duration)}
            </div>
        </article>
    )
}

