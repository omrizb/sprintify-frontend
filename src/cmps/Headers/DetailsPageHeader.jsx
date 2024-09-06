import { useEffect, useRef, useState } from 'react'
import { FastAverageColor } from 'fast-average-color'

import { colorUtilService } from '../../services/color.util.service'
import { SvgIcon } from '../SvgIcon'
import { StationHeaderInfo } from './StationHeaderInfo'
import { SongHeaderInfo } from './SongHeaderInfo'


export function DetailsPageHeader({ station, song, onSetBgColor, onEditStation, pageType }) {

    const [stationNameClass, setStationNameClass] = useState('station-name')
    const [headerBgColor, setHeaderBgColor] = useState()
    const [headerDarkerBgColor, setHeaderDarkerBgColor] = useState()
    const stationNameRef = useRef(null)
    const fac = new FastAverageColor()

    const headerImg = pageType === 'station' ? station.stationImgUrl : song.imgUrl.big
    console.log(song)

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
                {(headerImg)
                    ? <img
                        crossOrigin="anonymous"
                        className="station-cover"
                        src={headerImg}
                        alt="Station Cover"
                        onLoad={handleImageLoad}
                    />
                    : <div className="icon new-playlist">
                        <SvgIcon iconName={"music"} />
                    </div>}

                {(pageType === 'station') && <div className="overlay">
                    <div className="overlay-content">
                        <button className="editImage icon btn-medium-with-hover">
                            <SvgIcon iconName="editImage" />
                        </button>
                        <span>Choose photo</span>
                    </div>
                </div>}
            </div>


            {(pageType === 'station') && <StationHeaderInfo
                station={station}
                onEditStation={onEditStation}
            />}

            {(pageType === 'song') && <SongHeaderInfo
                song={song}
            />}


        </div >
    )
}

