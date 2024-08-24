import { svgService } from '../services/svg.service.js'

export function SvgIcon({ iconName, svgClass = '' }) {

    const svg = svgService.getSvg(iconName)
    const svgWithClass = (svgClass) ? svg.replace(/<svg/, `<svg class="${svgClass}"`) : svg
    return <i dangerouslySetInnerHTML={{ __html: svgWithClass }} ></i>
}