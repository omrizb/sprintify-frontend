import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'

export function SongPreview({ song, index, style, onRemoveSong }) {
    let articleClassName
    let songPreviewType

    const isStationOwner = true

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
            {isStationOwner && <button onClick={()=> onRemoveSong(song.songId)}>Remove</button> }
            
        </div>
    )
}




// {
//     songId: 'fJ9rUzIMcZQ',
//     songName: 'Bohemian Rhapsody',
//     artist: 'Queen',
//     album: 'A Night at the Opera',
//     url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
//     imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
//     duration: { hours: 0, minutes: 6, seconds: 0 }
// },