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
    }

    const { songName, artist, album, url, imgUrl, duration } = song
    const songDuration = song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds

    //switch case to various displays: main-view, now-playing, song-list
    return (
        <div className={`song-preview ${articleClassName}`}>
            {songPreviewType === 'songPreviewlist' && <div>{index}</div>}
            <div className="title-column">
                <img src={imgUrl} alt="" />
                <div className="text">
                    <Link to={`/track/${song.songId}`}>
                        <div>{songName}</div>
                    </Link>
                    <div>{artist}</div>
                </div>
            </div>
            {articleClassName !== 'list-minimal' && <div>{album}</div>}
            <div>{utilService.getTimeStr(songDuration)}</div>
            {isOwnedByUser && <button className="btn-tinted" onClick={()=> onRemoveSong(song.songId)}>X</button> }
            
        </div>
    )
}

