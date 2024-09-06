import { Link } from 'react-router-dom';

import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgButton } from '../SvgButton.jsx'
import { MiniSongPreview } from '../SongDetails/MiniSongPreview.jsx';

export function NowPlayingDetails({ song }) {

    return (
        <div className="now-playing-details">
            <MiniSongPreview song={song} type="card" />
        </div>
    )




}
