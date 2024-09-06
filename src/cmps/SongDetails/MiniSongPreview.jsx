import { Link } from 'react-router-dom'

export function MiniSongPreview({ song, type = 'simple', isCurrentlyPlaying, onClickAdd }) {

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
        <article className={`${articleClassName} ${isCurrentlyPlaying && 'currently-playing'}`}>
            <img className={imgClassName} src={song.imgUrl.big} alt={song.songName} />
            <div className="song-info">
                <div className="song-name">
                    <Link to={`/track/${song.spotifyId}`}>{song.songName}</Link>
                </div>
                <div className="artist">{song.artist.name}</div>
            </div>
            {(!song.ytId) && <div className="search-songs">
                <span className="album-name">{song.album.name}</span>
                <button onClick={() => onClickAdd(song)} className="btn-tinted add-btn">Add</button>
            </div>}
        </article>
    )
}
