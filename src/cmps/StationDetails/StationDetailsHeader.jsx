
import { SvgIcon } from "../SvgIcon"

export function StationDetailsHeader({ station, songCountTxt, durationTxt  }) {


    
 
    return (
        <div className="station-details-header">
            <div className="station-cover-container">
               { (station.stationImgUrl) && <img className="station-cover" src={station.stationImgUrl} alt="Station Cover" />}
                {(!station.stationImgUrl) && <div className="icon new-playlist">
                    <SvgIcon iconName={"music"}/>  
                    </div>  }
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
                   {(songCountTxt) && <span>{songCountTxt}</span>} 
                   {(durationTxt) && <span>{durationTxt}</span>}
                </div>
            </div>
        </div >
    )
}

