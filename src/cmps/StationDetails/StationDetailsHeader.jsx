
export function StationDetailsHeader({ stationMeta, songCountTxt, durationTxt }) {
    const { type, isLikedSongs, isEmptyStation, isOwnedByUser } = stationMeta

    const showSongCountTxt = type === 'playlist' && !isEmptyStation
    const showDurationTxt = type === 'playlist' && !isLikedSongs

    return (
        <div className="station-header">
            <img className="station-cover" src={station.imgUrl} alt="Station Cover" />
            <div className="station-info">
                <p>{station.type}</p>
                <h1>{station.name}</h1>
                <p>
                    {station.createdBy.fullName}
                    {showSongCountTxt && <><span className="dot">{songCountTxt()}</span></>}
                    {showDurationTxt && <><span>, </span><span>{durationTxt()}</span></>}
                </p>
            </div>
        </div>
    )
}

