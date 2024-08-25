import { useState } from 'react'
import { useSelector } from 'react-redux'

import { setVolume } from '../../store/actions/player.actions'
import { Slider } from '../Slider'
import { SvgButton } from '../SvgButton'

export function VolumeController() {

    const player = useSelector(state => state.playerModule.player)

    const [volumeIcon, setVolumeIcon] = useState('playerVolumeMax')
    const [isMute, setIsMute] = useState(false)

    function handleVolumeChange(volume) {
        setVolume(volume)

        if (volume === 0) {
            setIsMute(true)
            setVolumeIcon('playerVolumeMute')
        } else if (volume < 30) {
            setIsMute(false)
            setVolumeIcon('playerVolumeLow')
        } else if (volume < 70) {
            setIsMute(false)
            setVolumeIcon('playerVolumeMedium')
        } else {
            setIsMute(false)
            setVolumeIcon('playerVolumeHigh')
        }
    }

    return (
        <div className="volume-controller">
            <SvgButton
                btnClass="btn-dark2"
                svgIcon={volumeIcon}
                svgClass="svg-small"
                tooltipTxt={isMute ? 'Unmute' : 'Mute'}
            />
            <Slider value={player.volume} onChange={handleVolumeChange} />
        </div>
    )
}