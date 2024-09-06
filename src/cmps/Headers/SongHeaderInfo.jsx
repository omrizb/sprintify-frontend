export function SongHeaderInfo({ song }) {

    const songDurationTxt = formatDurationTxt(song.duration)

    //get song/album creation date
    //get followers


    function formatDurationTxt(duration) {
        const hours = Math.floor(duration / 3600)
        const minutes = Math.floor((duration % 3600) / 60)
        const seconds = duration % 60

        const parts = []

        if (hours > 0) {
            parts.push(`${hours} hr`)
        }
        if (minutes > 0) {
            parts.push(`${minutes} min`)
        }
        if (seconds > 0 || parts.length === 0) {
            parts.push(`${seconds} sec`)
        }

        return parts.join(' ')
    }


    return (
        <div className="station-info">
            <div className="station-type">Song</div>
            <div className="station-name medium-title">{song.songName}</div>
            <div className="bottom-info">
                <span className="artist">{song.artist.name}</span>
                <span className="dot"></span>
                <span className="album">{song.album.name}</span>
                <span className="dot"></span>
                <span className="total-duration">{songDurationTxt}</span>
                <span className="dot"></span>
                <span className="release-date">{song.releaseDate}</span>

            </div>
        </div>

    )


}