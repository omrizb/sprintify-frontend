import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StationList } from "../StationList"
import { stationService } from '../../services/station/station.service.local'
import { Footer } from '../Footer'


export function MainViewBody() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const stations = useSelector(storeState => storeState.stationModule.stations)
    
    const [ stationsMain, setStationsMain ] = useState([])

    useEffect(() => {
        loadStationsMain({stationType: 'playlist'})
    
    }, [])

    async function loadStationsMain(filterBy) {
        try {
            const stations = await stationService.query(filterBy)
            setStationsMain(stations)
            
        } catch (err) {
            
            console.log('MainBody loading stations:', err)
        } 
    }
    
    

    return (
        <div className="main-view-body">
            
            <StationList stations={stationsMain} viewArea = {'mainView'} />
            <Footer />
            
        </div>
    )
}