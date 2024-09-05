import { useEffect, useRef, useState } from 'react'
import { FastAverageColor } from 'fast-average-color'

import { colorUtilService } from '../../services/color.util.service'
import { SvgIcon } from '../SvgIcon'

export function StationDetailsHeader({ station, onSetBgColor, onEditStation }) {

    const [stationNameClass, setStationNameClass] = useState('station-name')
    const [headerBgColor, setHeaderBgColor] = useState()
    const [headerDarkerBgColor, setHeaderDarkerBgColor] = useState()
    const stationNameRef = useRef(null)
    const fac = new FastAverageColor()

    useEffect(() => {
        adjustStationNameSize()
        window.addEventListener('resize', adjustStationNameSize)
        return () => window.removeEventListener('resize', adjustStationNameSize)
    }, [])

    function adjustStationNameSize() {
        // const containerWidth = stationNameRef.current.parentElement.offsetWidth
        // const containerHeight = stationNameRef.current.parentElement.offsetHeight

        // if (stationNameRef.current.scrollHeight > 120) {
        //     if (stationNameClass === 'station-name') setStationNameClass('station-name medium-title')
        //     if (stationNameClass === 'station-name medium-title') setStationNameClass('station-name small-title')
        // } else {
        //     if (stationNameClass === 'station-name medium-title') setStationNameClass('station-name')
        //     if (stationNameClass === 'station-name small-title') setStationNameClass('station-name medium-title')
        // }
        // console.log('containerWidth', containerWidth)
        // console.log('containerHeight', containerHeight)
        // console.log(stationNameRef.current.scrollWidth)
        // console.log(stationNameRef.current.scrollHeight)
    }

    const songCount = station.songs.length
    const songCountTxt = formatSongCountTxt()
    const durationTxt = formatDurationTxt()

    function formatSongCountTxt() {
        if (songCount > 1) return `${songCount} songs`
        else if (songCount === 1) return `${songCount} song`
        else return ''
    }

    function formatDurationTxt() {
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }

    function onUpdateStation(station) {
        console.log(station._id)
    }

    function handleImageLoad(ev) {
        fac.getColorAsync(ev.target)
            .then(color => {
                setHeaderBgColor(color.hex)
                setHeaderDarkerBgColor(colorUtilService.adjustBrightness(color.hex, 0.4))
                onSetBgColor(color.hex)
            })
            .catch(err => console.log('Error getting average color from image.', err))
    }

    return (
        <div
            className="station-details-header"
            style={{ backgroundImage: `linear-gradient(to bottom, ${headerBgColor}cc, ${headerDarkerBgColor})` }}
        >
            <div className="station-cover-container">
                {(station.stationImgUrl)
                    ? <img
                        crossOrigin="anonymous"
                        className="station-cover"
                        src={station.stationImgUrl}
                        alt="Station Cover"
                        onLoad={handleImageLoad}
                    />
                    : <div className="icon new-playlist">
                        <SvgIcon iconName={"music"} />
                    </div>}
                <div className="overlay">
                    <div className="overlay-content">
                        <button className="editImage icon btn-medium-with-hover">
                            <SvgIcon iconName="editImage" />
                        </button>
                        <span>Choose photo</span>
                    </div>
                </div>
            </div>

            <div className="station-info">
                <div className="station-type">{station.type}</div>
                <div ref={stationNameRef} onClick={onEditStation} className={`${stationNameClass} medium-title`}>{station.name}</div>
                <div className="station-description">{station.description}</div>
                <div className="bottom-info">
                    <span className="created-by">{station.createdBy.fullName}</span>
                    {songCount &&
                        <>
                            <span className="dot"></span>
                            <span className="song-count">{songCountTxt}, </span>
                            <span className="total-duration">{durationTxt}</span>
                        </>}
                </div>
            </div>
        </div >
    )
}

