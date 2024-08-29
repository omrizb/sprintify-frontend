import { SongPreview } from '../StationDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ songs, onRemoveSong }) {

    return (
        <div className="song-list">
            <header className="list-style">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div className="duration"><SvgIcon iconName={"duration"} /></div>

            </header>
            <ul>
                {songs.map((song, index) =>
                    <li key={song.songId} >
                        <SongPreview song={song} index={index + 1} style={'list-style'} onRemoveSong={onRemoveSong} />
                    </li>)
                }
            </ul>
        </div>
    )
}

