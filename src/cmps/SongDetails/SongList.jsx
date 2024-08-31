import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ station, onRemoveSong }) {

    return (
        <div className="song-list">
            <div className="list-header dynamic-grid">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div className="duration"><SvgIcon iconName={"duration"} /></div>
            </div>
            <ul className="list-body">
                {station.songs.map((song, index) =>
                    <li key={song.songId} >
                        <SongPreview type={'list'} onRemoveSong={onRemoveSong} station={station} song={song} index={index + 1} />
                    </li>)
                }
            </ul>
        </div>
    )
}

