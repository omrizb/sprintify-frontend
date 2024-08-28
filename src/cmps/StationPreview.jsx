import { PlayButton } from './Player/PlayButton'
import { SvgIcon } from './SvgIcon'

export function StationPreview({ station, style }) {

    let articleClassName
    let stationPreviewType

    switch (style) {
        case 'leftSide':
            articleClassName = 'list'
            stationPreviewType = 'stationPreviewLight'
            break
        case 'minimal':
            articleClassName = 'list-minimal'
            stationPreviewType = 'stationPreview'
            break
        case 'card':
            articleClassName = 'card'
            stationPreviewType = 'stationPreview'
            break
    }

    return (
        <article className={`station-preview ${articleClassName}`}>
            <div className="image-container">
                {(station.stationImgUrl) && <img src={station.stationImgUrl} alt="" />}
                {(!station.stationImgUrl) && <div className="icon">
                    <SvgIcon iconName={"music"}/>  
                    </div>  }
                <PlayButton
                    type={stationPreviewType}
                    stationId={station._id}
                    stationName={station.name}
                    songId={station.songs[0]?.songId}
                    songName={station.songs[0]?.songName}
                />
            </div>
            <div className="text">
                <div className="station-name">{station.name}</div>
                {style === 'leftSide' && <div className="station-info">{station.type} • {station.createdBy.fullName}</div>}
            </div>
        </article>
    )
}