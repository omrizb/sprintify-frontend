import { useNavigate } from "react-router-dom"

export function TopResult({ item, type }) {

    const navigate = useNavigate()

    function onClick() {
        if (type === 'song') return
        console.log('plantedStation')
        navigate(`/station/${item._id}`)
    }




    return (
        <div className="top-result" onClick={onClick}>

            <h2>Top Result</h2>

            <div className="top-result-card">
                {(type === 'song') && <img src={item.imgUrl.big} alt="" />}
                {(type === 'station') && <img src={item.stationImgUrl} alt="" />}

                <div className="card-info">
                    {(type === 'song') && <span className="name">{item.songName}</span>}
                    {(type === 'station') && <span className="name">{item.name}</span>}

                    <div className="bottom-line">
                        <span className="type">{item.type}</span>
                        <span className="dot"> • </span>
                        {(type === 'song') && <span className="artist">{item.artist.name}</span>}
                        {(type === 'station') && <span className="artist">{item.createdBy.fullName}</span>}
                    </div>
                </div>
            </div>
        </div>

    )

}