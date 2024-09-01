import { SvgButton } from '../SvgButton'

export function DotsButton({ type, elementName }) {

    let btnClass
    let svgIcon
    let svgClass

    switch (type) {
        case 'stationDetails':
            btnClass = 'btn-dark2'
            svgIcon = 'dotsBig'
            svgClass = 'svg-big2'
            break
        case 'songPreview':
            btnClass = 'btn-primary-transparent-small'
            svgIcon = 'dotsSmall'
            svgClass = 'svg-small1'
            break
    }

    return (
        <SvgButton
            btnClass={btnClass}
            svgIcon={svgIcon}
            svgClass={svgClass}
            tooltipTxt={`More options for ${elementName}`}
        />
    )
}