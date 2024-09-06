import { Link } from 'react-router-dom'

export function MiniSongPreview({ song, type = 'simple', isSongPlaying }) {

    let articleClassName
    let imgClassName
    switch (type) {
        case 'simple':
            articleClassName = 'mini-song-preview'
            imgClassName = 'thumbnail'
            break
        case 'bigger':
            articleClassName = 'mini-song-preview'
            imgClassName = 'thumbnail bigger'
            break
        case 'card':
            articleClassName = 'mini-song-preview card'
            imgClassName = 'thumbnail card'
            break
    }

    return (
        <article className={`${articleClassName} ${isSongPlaying && 'currently-playing'}`}>
            <img className={imgClassName} src={song.imgUrl.big} alt={song.songName} />
            <div className="song-info">
                <span className="song-name"><Link to={`/track/${song.spotifyId}`}>{song.songName}</Link></span>
                <span className="artist">{song.artist.name}</span>
            </div>
        </article>
    )
}
