
export function StationPreview({ station, style }) {

    return (

        <div className="station-preview">
            {(style === 'leftSide') &&
                <article className="list">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                            <div>{station.type} • {station.createdBy.fullName}</div>
                        </section>
                </article>}

            {(style === 'minimal') &&
                <article className="list minimal">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                        </section>
                </article>}

            {(style === 'card') &&
                <article className="station-preview card">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                        </section>
                </article>}
        </div>

            

        )
}