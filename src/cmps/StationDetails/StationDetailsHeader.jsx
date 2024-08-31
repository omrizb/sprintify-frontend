import { useEffect, useRef, useState } from 'react'

import { SvgIcon } from '../SvgIcon'

export function StationDetailsHeader({ station, bgColor, onEditStation }) {

    const [stationNameClass, setStationNameClass] = useState('station-name')
    const stationNameRef = useRef(null)

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

    return (
        <div className="station-details-header" style={{ backgroundColor: bgColor }}>
            <div className="station-cover-container">
                {(station.stationImgUrl)
                    ? <img className="station-cover" src={station.stationImgUrl} alt="Station Cover" />
                    : <div className="icon new-playlist">
                        <SvgIcon iconName={"music"} />
                    </div>}
                <div className="overlay">
                    <div className="overlay-content">
                        <button className="editImage icon btn-medium">
                            <SvgIcon iconName="editImage" />
                        </button>
                        <span>Choose photo</span>
                    </div>
                </div>
            </div>

            <div className="station-info">
                <div className="station-type">{station.type}</div>
                <div ref={stationNameRef} onClick={onEditStation} className={stationNameClass}>{station.name}</div>
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

