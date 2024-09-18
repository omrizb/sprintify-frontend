import { useNavigate } from "react-router-dom"
import { PlayButton } from "../Buttons/PlayButton"
import { StationTopResult } from "./StationTopResult"
import { SongTopResult } from "./SongTopResult"

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

                {(type === 'station') && <StationTopResult station={item} />}

                {(type === 'song') && <SongTopResult song={item} />}

            </div>
        </div>

    )

}