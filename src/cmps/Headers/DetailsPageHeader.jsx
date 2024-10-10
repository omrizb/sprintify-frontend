import { useState } from 'react'
import { FastAverageColor } from 'fast-average-color'

import { colorUtilService } from '../../services/color.util.service'
import { SvgIcon } from '../SvgIcon'
import { StationHeaderInfo } from './StationHeaderInfo'
import { SongHeaderInfo } from './SongHeaderInfo'
import { Link } from 'react-router-dom'
import { SvgButton } from '../SvgButton'


export function DetailsPageHeader({ station, song, onSetBgColor, onEditStation, pageType, isOwnedByUser = false }) {


    const [headerBgColor, setHeaderBgColor] = useState()
    const [headerDarkerBgColor, setHeaderDarkerBgColor] = useState()
    const fac = new FastAverageColor()

    const headerImg = pageType === 'station' ? station.stationImgUrl : song.imgUrl.big

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

                {(pageType === 'station' && !station.isPinned && isOwnedByUser) &&
                    <div
                        className="overlay"
                        onClick={onEditStation}
                    >
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

