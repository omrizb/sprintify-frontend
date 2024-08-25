export function SongPreview({ song, index, viewMode }) {
    return (
        <li className="song-preview">
            <span className="song-index">{index + 1}</span>
            <div className="song-info">
                {viewMode === 'list' && (
                    <img src={song.imgUrl} alt={song.songName} className="song-cover" />
                )}
                <div className="song-details">
                    <span className="song-name">{song.songName}</span>
                    {viewMode === 'list' && <span className="song-artist">{song.artist}</span>}
                </div>
            </div>
            {viewMode === 'compact' && <span className="song-artist">{song.artist}</span>}
            <span className="song-album">{song.album}</span>
            {viewMode === 'list' && <span className="song-date">{/* dateAdded */}</span>}
            <span className="song-duration">{`${song.duration.hours}:${String(song.duration.minutes).padStart(2, '0')}:${String(song.duration.seconds).padStart(2, '0')}`}</span>
        </li>
    )
}




