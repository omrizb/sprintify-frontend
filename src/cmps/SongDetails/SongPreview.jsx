import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'

export function SongPreview({ station, song, index, style, onRemoveSong }) {
    let articleClassName
    let songPreviewType

    if (station) {
        var isOwnedByUser = station.createdBy.id === 'AAAA'
    }

    switch (style) {
        case 'list-style':
            articleClassName = 'list-style'
            songPreviewType = 'songPreviewlist'
            break
        case 'minimal':
            articleClassName = 'list-minimal'
            songPreviewType = 'songPreviewlist'
            break
        case 'card':
            articleClassName = 'card'
            songPreviewType = 'songPreviewCard'
            break
        case 'recommended':
            articleClassName = 'recommended'
            songPreviewType = 'songPreviewlist'
            break
        case 'search':
            articleClassName = 'search'
            songPreviewType = 'songPreviewlist'
            break
    }


    const { songName, artist, album, url, imgUrl, duration } = song
    const songDuration = !song.duration
        ? ""
        : (song.duration.hours * 3600) + (song.duration.minutes * 60) + (song.duration.seconds)

    //switch case to various displays: main-view, now-playing, song-list
    if (!song) return <div>Loading...</div>
    return (
        <div className={`song-preview ${articleClassName}`}>
            {songPreviewType === 'songPreviewlist' &&
                articleClassName !== 'recommended' &&
                articleClassName !== 'search' &&
                <div>{index}</div>}

            <div className="title-column">
                {articleClassName !== 'list-minimal' &&
                    <img src={imgUrl} alt="" />}

                <div className="text">
                    <Link to={`/track/${song.songId}`}>
                        <div>{songName}</div>
                    </Link>
                    <div>{artist}</div>
                </div>
            </div>

            {articleClassName !== 'recommended' &&
                articleClassName !== 'search' && <div>{album}</div>}

            {songPreviewType === 'songPreviewlist' &&
                articleClassName !== 'recommended' &&
                articleClassName !== 'search' &&
                <div>{utilService.getTimeStr(songDuration)}</div>}

            {songPreviewType === 'songPreviewlist' &&
                articleClassName !== 'recommended' &&
                articleClassName !== 'search' &&
                isOwnedByUser &&
                <button className="btn-tinted"
                    onClick={() => onRemoveSong(song.songId)}>X
                </button>}

            {articleClassName === 'recommended' &&
                <button className="btn-tinted"
                    onClick={() => onAddSong(song)}>Add
                </button>}
        </div>
    )
}

