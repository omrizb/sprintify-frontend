
import { SvgIcon } from "../SvgIcon"

export function StationDetailsHeader({ station, showSongCountTxt, songCountTxt, showDurationTxt, durationTxt }) {

    return (
        <div className="station-details-header">
            <div className="station-cover-container">
                <img className="station-cover" src={station.stationImgUrl} alt="Station Cover" />
                <div className="overlay">
                    <div className="overlay-content">
                        <button className="editImage icon btn-medium">
                            <SvgIcon iconName={"editImage"} />
                        </button>
                        <span>Choose photo</span>
                    </div>
                </div>
            </div>

            <div className="station-info">
                <div className="station-type">{station.type}</div>
                <div className="station-name">{station.name}</div>
                <div>
                    <span className="station-createdBy">{station.createdBy.fullName}</span>
                    {showSongCountTxt && <><span className="dot">{songCountTxt}</span></>}
                    {showDurationTxt && <><span>, </span><span>{durationTxt}</span></>}
                </div>
            </div>
        </div >
    )
}

