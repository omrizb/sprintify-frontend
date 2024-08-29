import { SvgIcon } from "../SvgIcon"

export function StationDetailsHeader({ station  }) {

    const songCountTxt = formatSongCountTxt()
    const durationTxt = formatDurationTxt()

    function formatSongCountTxt() {
        const songCount = station.songs.length
        return songCount > 1 ? ` • ${songCount} songs` : ` • ${songCount} song`
    }

    function formatDurationTxt() {
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `,${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }

    
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

