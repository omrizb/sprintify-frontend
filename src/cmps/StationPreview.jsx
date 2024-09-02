import { useSelector } from 'react-redux'
import { PlayButton } from './Buttons/PlayButton'
import { SvgIcon } from './SvgIcon'

export function StationPreview({ station: stationPreview, style }) {

    const station = useSelector(storeState => storeState.stationModule.station)

    function isHighlighted() {
        if (station) {
            if (stationPreview._id === station._id) return 'highlighted'
        }
        return ''
    }

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
        <article className={`station-preview ${articleClassName} ${isHighlighted()}`}>
            <div className="image-container">
                {(stationPreview.stationImgUrl) && <img src={stationPreview.stationImgUrl} alt="" />}
                {(!stationPreview.stationImgUrl) && <div className="icon">
                    <SvgIcon iconName={"music"} />
                </div>}
                <PlayButton
                    type={stationPreviewType}
                    stationId={stationPreview._id}
                    stationName={stationPreview.name}
                    songId={stationPreview.songs[0]?.songId}
                    songName={stationPreview.songs[0]?.songName}
                />
            </div>
            <div className="text">
                <div className="station-name">{stationPreview.name}</div>
                {style === 'leftSide' && <div className="station-info">{stationPreview.type} • {stationPreview.createdBy.fullName}</div>}
            </div>
        </article>
    )
}