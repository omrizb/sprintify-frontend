import { SvgIcon } from './SvgIcon'
import { TooltipContainer } from './TooltipContainer'

export function SvgButton({ btnClass, svgIcon, svgClass, tooltipTxt, onClick, style }) {

    const buttonElement = (
        <button className={btnClass} onClick={onClick} style={style}>
            <SvgIcon iconName={svgIcon} svgClass={svgClass || undefined} />
        </button>
    )

    return (tooltipTxt) ? (
        <TooltipContainer txt={tooltipTxt}>
            {buttonElement}
        </TooltipContainer>
    ) : (
        buttonElement
    )
}