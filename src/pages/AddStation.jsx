import { useSelector } from 'react-redux'
import { addStation } from '../store/actions/station.actions'


export function AddStation(){

    const stations = useSelector(storeState => storeState.stationModule.station)

    console.log(stations)
    return (
        

        <div className="add-station">
            <h1>New Playlist</h1>
        </div>
        
    )
}