
export function StationPreview({ station }) {

    return <article className="station-preview">
        <img src={station.stationImgUrl} alt="" />
        <section className="text">
            <div className="station-name">{station.name}</div>
            <div>{station.type} • {station.createdBy.fullName}</div>
        </section>
        
    </article>
}