import { SvgButton } from '../SvgButton'

export function VButton({ type }) {

    let btnClass
    let svgClass
    let tooltipTxt

    switch (type) {
        case 'addToStation':
            btnClass = 'btn-v-small'
            svgClass = 'svg-small1'
            tooltipTxt = 'Add to station'
            break
        case 'removeFromLibrary':
            btnClass = 'btn-v'
            svgClass = 'svg-big2'
            tooltipTxt = 'Remove from Your Library'
            break
    }

    return (
        <SvgButton
            btnClass={btnClass}
            svgIcon="removePlaylist"
            svgClass={svgClass}
            tooltipTxt={tooltipTxt}
        />
    )
}