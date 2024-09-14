import { Link } from 'react-router-dom'
import { PlayButton } from '../Buttons/PlayButton'

export function MiniSongPreview({ song, type = "simple", isCurrentlyPlaying, onClickAdd, showPlayBtn }) {

    let articleClassName
    let imgClassName
    switch (type) {
        case 'with-add-btn':
            articleClassName = 'mini-song-preview add-songs'
            imgClassName = 'thumbnail'
            break
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
            {showPlayBtn &&
                <PlayButton
                    type="songPreview"
                    song={song}
                />}

            <div className="song-info">
                <div className="song-name">
                    <Link to={`/track/${song.spotifyId}`}>{song.songName}</Link>
                </div>
                <div className="artist">{song.artist.name}</div>
            </div>
            {/* {(type === 'with-add-btn') && <div className="search-songs"> */}
            {(type === 'with-add-btn') && <span className="album">{song.album.name}</span>}
            {(type === 'with-add-btn') && <button onClick={() => onClickAdd(song)} className="btn-tinted add-btn">Add</button>}
            {/* </div>} */}
        </article>
    )
}
