import { useParams } from 'react-router-dom'

export function StationDetails() {

    const { stationId } = useParams()

    return (
        <div className="station-details">
            Station details: {stationId}
        </div>
    )
}