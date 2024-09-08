export function TopResult({ song }) {

    return (
        <div className="top-result">
            <h2>Top Result</h2>
            <div className="top-result-card">
                <img src={song.imgUrl.big} alt="" />
                <div className="card-info">
                    <span className="name">{song.songName}</span>
                    <div className="bottom-line">
                        <span className="type">Song</span>
                        <span className="dot"> • </span>
                        <span className="artist">{song.artist.name}</span>
                    </div>

                </div>
            </div>

        </div>

    )

}