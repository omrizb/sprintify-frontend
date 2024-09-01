import { SvgButton } from '../SvgButton'

export function AddToButton({ type }) {

    let btnClass
    let svgClass
    let tooltipTxt

    switch (type) {
        case 'addToLibrary':
            btnClass = 'btn-dark2'
            svgClass = 'svg-big2'
            tooltipTxt = 'Save to Your Library'
            break
        case 'addToLikedSongs':
            btnClass = 'btn-dark2-small'
            svgClass = 'svg-small1'
            tooltipTxt = 'Add to Liked Songs'
            break
    }

    return (
        <SvgButton
            btnClass={btnClass}
            svgIcon="addTo"
            svgClass={svgClass}
            tooltipTxt="Save to Your Library"
        />
    )
}