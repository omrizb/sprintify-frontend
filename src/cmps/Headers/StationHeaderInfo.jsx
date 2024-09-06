export function StationHeaderInfo({ station, onEditStation }) {

    const songCount = station.songs.length
    const songCountTxt = formatSongCountTxt()
    const stationDuration = station.songs.reduce((acc, song) => {
        return acc + song.duration
    }, 0)
    const stationDurationTxt = formatDurationTxt(stationDuration)

    function formatSongCountTxt() {
        if (songCount > 1) return `${songCount} songs`
        else if (songCount === 1) return `${songCount} song`
        else return ''
    }

    function formatDurationTxt(duration) {
        const hours = Math.floor(duration / 3600)
        const minutes = Math.floor((duration % 3600) / 60)
        const seconds = duration % 60

        return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }


    return (
        <div className="station-info">
            <div className="station-type">{station.type}</div>
            <div onClick={onEditStation} className="station-name medium-title">{station.name}</div>
            <div className="station-description">{station.description}</div>
            <div className="bottom-info">
                <span className="created-by">{station.createdBy.fullName}</span>
                {songCount &&
                    <>
                        <span className="dot"></span>
                        <span className="song-count">{songCountTxt}, </span>
                        <span className="total-duration">{stationDurationTxt}</span>
                    </>}
            </div>
        </div>

    )




}