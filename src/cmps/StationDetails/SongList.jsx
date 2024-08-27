import { SongPreview } from '../StationDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ songs }) {
    
    return (
        <div className="song-list">
            <header>
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div><SvgIcon iconName={"duration"}    /></div>

            </header>
            <ul>
                {songs.map(song =>
                    <li key={song.songId} >
                        <SongPreview song={song} index={1} style={'list'}/>
                    </li>)
                }
            </ul>
        </div> 
    )
}

