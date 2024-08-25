import { useState } from 'react'
import { useSelector } from 'react-redux'

import { setVolume } from '../../store/actions/player.actions'
import { Slider } from '../Slider'
import { SvgIcon } from '../SvgIcon'

export function VolumeController() {

    const player = useSelector(state => state.playerModule.player)

    const [volumeIcon, setVolumeIcon] = useState('playerVolumeMax')

    function handleVolumeChange(volume) {
        setVolume(volume)

        if (volume === 0) {
            setVolumeIcon('playerVolumeMute');
        } else if (volume < 30) {
            setVolumeIcon('playerVolumeLow');
        } else if (volume < 70) {
            setVolumeIcon('playerVolumeMedium');
        } else {
            setVolumeIcon('playerVolumeHigh');
        }
    }

    return (
        <div className="volume-controller">
            <button className="btn-dark2">
                <SvgIcon iconName={volumeIcon} svgClass="svg-small" />
            </button>
            <Slider value={player.volume} onChange={handleVolumeChange} />
        </div>
    )
}