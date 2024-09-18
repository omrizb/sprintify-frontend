import { PlayButton } from "../Buttons/PlayButton"

export function SongTopResult({ song }) {
    return (
        <div>
            <div className="img-container">
                <PlayButton
                    type="stationPreview"
                    stationName={song.songName}
                    song={song}
                />
                <img src={song.imgUrl.big} alt="" />
            </div>

            <div className="card-info">
                <span className="name">{song.songName}</span>


                <div className="bottom-line">
                    <span className="type">Song</span>
                    <span className="dot"> • </span>
                    <span className="artist">{song.artist.name}</span>

                </div>
            </div>
        </div>

    )
}