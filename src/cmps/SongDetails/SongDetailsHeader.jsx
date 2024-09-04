
import { SvgIcon } from "../SvgIcon"

export function SongDetailsHeader({ song, songDurationTxt, viewMode }) {

    return (
        <div className="song-details-header">
            <div className="song-cover-container">
                <img className="song-cover" src={song.imgUrl} alt={song.songName} />
            </div>

            <div className="song-info">
                <div className="type">Song</div>
                <div className="song-name">{song.songName}</div>
                <div>
                    <span>{song.artist}</span>
                    •
                    <span>{new Date(song.publishedAt).getFullYear()}</span>
                    •
                    <span>{songDurationTxt}</span>
                    •
                    <span>{song.playCount}</span>
                </div>
            </div>
        </div >
    )
}

