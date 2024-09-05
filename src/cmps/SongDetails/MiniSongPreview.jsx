import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function MiniSongPreview({ song, type = 'simple' }) {

    const currPlayingSong = useSelector(store => store.playerModule.player.song)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    const isCurrentlyPlaying = song.songId === currPlayingSong.songId && isPlaying

    let imgClassName
    switch (type) {
        case 'simple':
            imgClassName = 'thumbnail'
            break
        case 'bigger':
            imgClassName = 'thumbnail bigger'
            break
    }

    return (
        <div className={`mini-song-preview ${isCurrentlyPlaying && 'currently-playing'}`}>
            <img className={imgClassName} src={song.imgUrl} alt={song.songName} />
            <div className="song-info">
                <span className="song-name"><Link to={`/track/${song.songId}`}>{song.songName}</Link></span>
                <span className="artist">{song.artist}</span>
            </div>
        </div>
    )
}
