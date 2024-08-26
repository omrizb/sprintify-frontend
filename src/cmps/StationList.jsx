import { StationPreview } from "./StationPreview.jsx"
import { useSelector } from 'react-redux'



export function StationList({stations}) {

    const player = useSelector(storeState => storeState.playerModule.player)
    // console.log(player)

    return (
        <section>
        <ul className="station-list">
            {stations.map(station =>
                <li key={station._id} >
                    <StationPreview station={station}/>
                </li>)
            }
        </ul>
    </section>
    )
}