
import { SvgIcon } from "../SvgIcon"

import { SongPreview } from '../StationDetails/SongPreview.jsx'

export function SongList({ songs, viewMode }) {
    return (
        <ul className={`song-list ${viewMode}`}>
            <li className="song-list-header">
                <div className="index-header">
                    <div>#</div>
                </div>
                <div className="col-header-flex">
                    <div>
                        <div className="col-header-txt-flex">
                            <span>Title</span>
                        </div>
                    </div>
                </div>
                {viewMode === 'compact' &&
                    <div className="col-header-flex">
                        <div>
                            <div className="col-header-txt-flex">
                                <span>Artist</span>
                            </div>
                        </div>
                    </div>

                }
                <div className="col-header-flex">
                    <div>
                        <div className="col-header-txt-flex">
                            <span>Album</span>
                        </div>
                    </div>
                </div>
                {viewMode === 'list' &&
                    <div className="col-header-flex">
                        <div>
                            <div className="col-header-txt-flex">
                                <span>Date added</span>
                            </div>
                        </div>
                    </div>
                }
                <div className="duration-header">
                    <div>
                        <div className="duration-flex">
                            <div className="duration icon btn-medium">
                                <SvgIcon iconName={"duration"} />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            {songs.map((song, index) => (
                <SongPreview
                    key={song.songId}
                    song={song}
                    index={index}
                    viewMode={viewMode}
                />
            ))}
        </ul>

    )
}

