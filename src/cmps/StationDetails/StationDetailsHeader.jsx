import { useSelector } from 'react-redux'

export function StationDetailsHeader({ stationMeta }) {
    const station = useSelector((storeState) => storeState.stationModule.station)
    const { type, isLikedSongs, isEmptyStation, isOwnedByUser } = stationMeta

    const isDisplaySongCountTxt = type === 'playlist' && !isEmptyStation
    const isDisplayDurationTxt = type === 'playlist' && !isLikedSongs


    function songCountTxt() {
        if (!isDisplaySongCountTxt) return ''
        const songCount = station.songs.length
        return songCount > 1 ? `${songCount} songs` : `${songCount} song`
    }


    function durationTxt() {
        if (!isDisplayDurationTxt) return ''
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }

    return (
        <div className="station-header">
            <img className="station-cover" src={station.imgUrl} alt="Station Cover" />
            <div className="station-info">
                <p>{station.type}</p>
                <h1>{station.name}</h1>
                <p>
                    {station.createdBy.fullName}
                    {isDisplaySongCountTxt && <><span className="dot">{songCountTxt()}</span></>}
                    {isDisplayDurationTxt && <><span>, </span><span>{durationTxt()}</span></>}
                </p>
            </div>
        </div>
    )
}

