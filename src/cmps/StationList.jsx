import { StationPreview } from "./StationPreview.jsx"


export function StationList({stations}) {

    return (
        <section>
        <ul className="station-list">
            {stations.map(station =>
                <li key={station._id}>
                    <StationPreview station={station}/>
                </li>)
            }
        </ul>
    </section>
    )
}