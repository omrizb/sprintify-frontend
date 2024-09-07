import { useSelector } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'

import { PlayButton } from './Buttons/PlayButton'
import { SvgIcon } from './SvgIcon'
import { useEffect, useState } from 'react'

export function StationPreview({ station: stationPreview, style, colorActiveStationId, onSetBgColor }) {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [stationPreviewImageColor, setStationPreviewImageColor] = useState(null)
    const fac = new FastAverageColor()

    const pinnedStation = (stationPreview.isPinned === true)

    useEffect(() => {
        if (stationPreview._id === colorActiveStationId && stationPreviewImageColor) {
            onSetBgColor(stationPreviewImageColor)
        }
    }, [colorActiveStationId])

    function isHighlighted() {
        if (station) {
            if (stationPreview._id === station._id) return 'highlighted'
        }
        return ''
    }

    function handleImageLoad(ev) {
        fac.getColorAsync(ev.target)
            .then(color => setStationPreviewImageColor(color.hex))
            .catch(err => console.log('Error getting average color from image.', err))
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
                {(stationPreview.stationImgUrl) && <img
                    crossOrigin="anonymous"
                    src={stationPreview.stationImgUrl}
                    alt=""
                    onLoad={handleImageLoad}
                />}
                {(!stationPreview.stationImgUrl) && <div className="icon">
                    <SvgIcon iconName={"music"} />
                </div>}
                <PlayButton
                    type={stationPreviewType}
                    stationId={stationPreview._id}
                    stationName={stationPreview.name}
                    song={stationPreview.songs[0]}
                />
            </div>
            <div className="text">
                <div className="station-name">{stationPreview.name}</div>

                {(style === 'leftSide' && (!pinnedStation)) &&
                    <div className="station-info">
                        {stationPreview.type} • {stationPreview.createdBy.fullName}
                    </div>}

                {(style === 'leftSide' && (pinnedStation)) &&
                    <div className="station-info liked">
                        <SvgIcon iconName={"pin"} />
                        <span>{stationPreview.type} • {stationPreview.songs.length} songs</span>
                    </div>}
            </div>
        </article>
    )
}