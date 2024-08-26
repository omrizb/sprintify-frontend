
export function StationPreview({ station, style }) {

    return (

        <div>
            {(style === 'leftSide') &&
                <article className="station-preview">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                            <div>{station.type} • {station.createdBy.fullName}</div>
                        </section>
                </article>}

            {(style === 'minimal') &&
                <article className="station-preview minimal">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                        </section>
                </article>}

            {(style === 'big-square') &&
                <article className="station-preview">
                    <img src={station.stationImgUrl} alt="" />
                        <section className="text">
                            <div className="station-name">{station.name}</div>
                        </section>
                </article>}
        </div>

            

        )
}