import { PlayButton } from './Player/PlayButton'

export function StationPreview({ station, style }) {

    let articleClassName

    switch (style) {
        case 'leftSide':
            articleClassName = 'list'
            break
        case 'minimal':
            articleClassName = 'list minimal'
            break
        case 'card':
            articleClassName = 'card'
            break
    }

    return (
        <div className="station-preview">
            <article className={articleClassName}>
                <img src={station.stationImgUrl} alt="" />
                <div className="text">
                    <div className="station-name">{station.name}</div>
                    {style === 'leftSide' && <div>{station.type} • {station.createdBy.fullName}</div>}
                    <PlayButton
                        type="stationPreview"
                        stationId={station._id}
                        stationName={station.name}
                        songId={station.songs[0]?.songId}
                        songName={station.songs[0]?.songName}
                    />
                </div>
            </article>
        </div>
    )
}