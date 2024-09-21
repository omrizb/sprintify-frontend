import { SvgButton } from '../SvgButton'

export function PanelIcon({ svgIcon, tooltipTxt, isActive, onClick }) {

    const btnClass = (isActive) ? 'btn-dark2 active-icon' : 'btn-dark2'

    return (
        <div className="panel-icon">
            <SvgButton
                btnClass={btnClass}
                svgIcon={svgIcon}
                svgClass="svg-small1"
                tooltipTxt={tooltipTxt}
                onClick={onClick}
                style={{ position: 'relative' }}
            />
        </div>
    )
}