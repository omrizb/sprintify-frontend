import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'

import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { addSongToStation } from '../store/actions/station.actions'

import { PlayButton } from './Buttons/PlayButton'
import { SvgIcon } from './SvgIcon'
import { showSuccessMsg } from '../services/event-bus.service'

export function StationPreview({ station: stationPreview, style, colorActiveStationId, onSetBgColor }) {

    const station = useSelector(store => store.stationModule.station)
    const user = useSelector(store => store.userModule.user)
    const isSongDragged = useSelector(store => store.systemModule.isSongDragged)
    const [isStationDraggedOver, setIsStationDraggedOver] = useState(false)
    const stationDndRef = useRef(null)

    const [stationPreviewImageColor, setStationPreviewImageColor] = useState(null)
    const fac = new FastAverageColor()

    const pinnedStation = (stationPreview.isPinned === true)
    const cannotDropSong = isSongDragged && (stationPreview.createdBy.id !== user._id)

    useEffect(() => {
        const element = stationDndRef.current

        return dropTargetForElements({
            element,
            canDrop: ({ source }) => {
                if (cannotDropSong) return
                return ('songName' in source.data)
            },
            getData: () => stationPreview,
            onDragEnter: () => {
                if (cannotDropSong) return
                setIsStationDraggedOver(true)
            },
            onDragLeave: () => setIsStationDraggedOver(false),
            onDrop: ({ self, source }) => {
                const songToAdd = { ...source.data, addedAt: Date.now() }
                const targetStation = self.data
                addSongToStation(targetStation, songToAdd)
                setIsStationDraggedOver(false)
            }
        })
    }, [isSongDragged])

    useEffect(() => {
        if (stationPreview._id === colorActiveStationId && stationPreviewImageColor) {
            onSetBgColor(stationPreviewImageColor)
        }
    }, [colorActiveStationId])

    function handleImageLoad(ev) {
        fac.getColorAsync(ev.target)
            .then(color => setStationPreviewImageColor(color.hex))
            .catch(err => console.log('Error getting average color from image.', err))
    }

    let articleClassName
    let stationPreviewType
    let textSectionClass
    let stationInfoClass

    switch (style) {
        case 'leftSide':
            articleClassName = 'list'
            stationPreviewType = 'stationPreviewLight'
            textSectionClass = 'text'
            stationInfoClass = 'station-info'
            break
        case 'leftSideMinimal':
            articleClassName = 'list'
            stationPreviewType = 'stationPreviewLight'
            textSectionClass = 'text floating-text'
            stationInfoClass = 'station-info'
            break
        case 'minimal':
            articleClassName = 'list-minimal'
            stationPreviewType = 'stationPreview'
            textSectionClass = 'text'
            stationInfoClass = 'hidden'
            break
        case 'card':
            articleClassName = 'card'
            stationPreviewType = 'stationPreview'
            textSectionClass = 'text'
            stationInfoClass = 'hidden'
            break
    }

    const stationPreviewClass = [
        'station-preview',
        articleClassName,
        (station && stationPreview._id === station._id) ? 'highlighted' : '',
        (cannotDropSong) ? 'disabled' : '',
        (isStationDraggedOver) ? 'dragged-over' : ''
    ].join(' ')

    return (
        <article ref={stationDndRef} className={stationPreviewClass}>
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
                {(style !== 'leftSideMinimal') &&
                    <PlayButton
                        type={stationPreviewType}
                        stationId={stationPreview._id}
                        stationName={stationPreview.name}
                        song={stationPreview.songs[0]}
                    />}
            </div>

            <div className={textSectionClass}>
                <div className="station-name">{stationPreview.name}</div>

                {(!pinnedStation) &&
                    <div
                        className={stationInfoClass}>
                        {stationPreview.type} • {stationPreview.createdBy.fullName}
                    </div>}

                {pinnedStation &&
                    <div
                        className={stationInfoClass}>
                        <SvgIcon iconName={"pin"} />
                        <span>{stationPreview.type} • {stationPreview.songs.length} songs</span>
                    </div>}
            </div>

        </article>
    )
}