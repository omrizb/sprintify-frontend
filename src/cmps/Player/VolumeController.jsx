import { Slider } from '../Slider'
import { SvgIcon } from '../SvgIcon'

export function VolumeController() {
    return (
        <div className="volume-controller">
            <button className="btn-dark2">
                <SvgIcon iconName="playerVolume" svgClass="svg-small" />
            </button>
            <Slider />
        </div>
    )
}