import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StationList } from "../StationList"
import { loadStations } from '../../store/actions/station.actions'

export function MainViewBody() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterByMain = useSelector(storeState => storeState.filterByModule.filterByMain)

    const [ stationsMain, setStationsMain ] = useState([])

    useEffect(() => {
        loadStations(filterByMain)
        setStationsMain(structuredClone(stations))

        
        
        
    }, [])
    
    

    return (
        <div className="main-view-body">
            
            <StationList stations={stationsMain} />
            
        </div>
    )
}