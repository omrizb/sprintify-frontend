import { SvgIcon } from './SvgIcon'
import { Tooltip } from './Tooltip'

export function SvgButton({ btnClass, svgIcon, svgClass, tooltipTxt, onClick }) {

    const buttonElement = (
        <button className={btnClass} onClick={onClick}>
            <SvgIcon iconName={svgIcon} svgClass={svgClass || undefined} />
        </button>
    )

    return (tooltipTxt) ? (
        <Tooltip txt={tooltipTxt}>
            {buttonElement}
        </Tooltip>
    ) : (
        buttonElement
    )
}