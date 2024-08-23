import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'
import { stationService } from '../services/station/index.js'

import { LeftSideBarHeader} from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'


export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const loggedinUser = false
    // const [ filterBy, setFilterBy ] = useState(stationService.getDefaultFilter())

    const stations = useSelector(storeState => storeState.stationModule.stations)
    
    useEffect(() => {

        loadStations()
       
    }, [])

    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <div className="my-library" >
                <LeftSideBarHeader />
                <LeftSideBarFilter />
                <StationList stations={stations} />
            </div>
        </div>
        
    )
}