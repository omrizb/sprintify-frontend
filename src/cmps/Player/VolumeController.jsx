import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { Slider } from '../Slider'
import { SvgButton } from '../SvgButton'

export function VolumeController() {

    const player = useSelector(state => state.playerModule.player)
    const [volumeIcon, setVolumeIcon] = useState('playerVolumeHigh')
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(0)

    function handleMuteUnmute() {
        if (player.volume > 0) {
            setVolumeBeforeMute(player.volume)
            handleVolumeChange(0)
        } else {
            handleVolumeChange(volumeBeforeMute)
        }
    }

    function handleVolumeChange(volume) {

        setPlayerAction(playerActions.SET_VOLUME, { volume })

        if (volume === 0) {
            setVolumeIcon('playerVolumeMute')
        } else if (volume < 30) {
            setVolumeIcon('playerVolumeLow')
        } else if (volume < 70) {
            setVolumeIcon('playerVolumeMedium')
        } else {
            setVolumeIcon('playerVolumeHigh')
        }
    }

    return (
        <div className="volume-controller">
            <SvgButton
                btnClass="btn-dark2"
                svgIcon={volumeIcon}
                svgClass="svg-small1"
                tooltipTxt={player.isMute ? 'Unmute' : 'Mute'}
                onClick={handleMuteUnmute}
            />
            <Slider value={player.volume} onChange={handleVolumeChange} />
        </div>
    )
}