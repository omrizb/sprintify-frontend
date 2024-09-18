import { PlayButton } from "../Buttons/PlayButton";

export function StationTopResult({ station }) {

    return (
        <div>
            <div className="img-container">
                <PlayButton
                    type="stationPreview"
                    stationId={station._id}
                    stationName={station.name}
                    song={station.songs[0]}
                />
                <img src={station.stationImgUrl} alt="" />
            </div>

            <div className="card-info">

                <span className="name">{station.name}</span>

                <div className="bottom-line">
                    <span className="type">Playlist</span>
                    <span className="dot"> • </span>
                    <span className="artist">{station.createdBy.fullName}</span>
                </div>
            </div>

        </div>
    )


}