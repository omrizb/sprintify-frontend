import { Link } from 'react-router-dom';

import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgButton } from '../SvgButton.jsx'

export function NowPlayingDetails({ song }) {

    return (
        <div className="now-playing-details">
            <pre>
                {JSON.stringify(song, false, 4)}
            </pre>

            {/* {song && (
                <>
                    <section className="header-container">
                        <Link to={`/track/${song.songId}`} className="link text-normal">
                            {song.songName}
                        </Link>
                        
                    </section>
                    <div className="scroll-container">
                        <section className="content">
                            <SongPreview song={song} index={0} style={'card'} />
                            <SongPreview song={song} index={0} style={'card'} />
                            <SongPreview song={song} index={0} style={'card'} />
                            <SongPreview song={song} index={0} style={'card'} />
                        </section>
                    </div>
                </>
            )} */}
        </div>
    )




}
