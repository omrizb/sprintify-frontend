import { StationList } from './StationList'

export function StationSection({ titleTxt, ListClassName, stations, previewStyle }) {

    return (
        <div className="station-section">

            <div className="section-header">
                <div className="section-title">{titleTxt}</div>
                <div className="show-all">Show all</div>
            </div>

            <StationList className={ListClassName} stations={stations} previewStyle={previewStyle} />
        </div>
    )
}