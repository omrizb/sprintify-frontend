import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StationList } from "../StationList"
import { stationService } from '../../services/station/station.service.local'
import { loadStations } from '../../store/actions/station.actions'

export function MainViewBody() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterByMain = useSelector(storeState => storeState.filterByModule.filterByMain)

    const [ stationsMain, setStationsMain ] = useState([])

    useEffect(() => {
        loadStationsMain(filterByMain)
    
    }, [])

    async function loadStationsMain(filterByMain) {
        try {
            const stations = await stationService.query(filterByMain)
            setStationsMain(stations)
            
        } catch (err) {
            
            console.log('MainBody loading stations:', err)
        } 
    }
    
    

    return (
        <div className="main-view-body">
            
            <StationList stations={stationsMain} viewArea = {'mainView'} />
            
        </div>
    )
}