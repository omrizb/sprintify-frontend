import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ station, songs, onRemoveSong }) {

    return (
        <div className="song-list">
            {(songs.length > 0) && <header className="list-style">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div className="duration"><SvgIcon iconName={"duration"} /></div>

            </header>}
            <ul>
                {songs.map((song, index) =>
                    <li key={song.songId} >
                        <SongPreview station={station} song={song} index={index + 1} style={'list-style'} onRemoveSong={onRemoveSong} />
                    </li>)
                }
            </ul>
        </div>
    )
}

