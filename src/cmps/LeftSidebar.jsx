import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'
import { stationService } from '../services/station/index.js'

import { LeftSideBarHeader } from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'
import { updateFilterBy } from '../store/actions/filterBy.actions.js'


export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const loggedinUser = false
    // const [ filterBy, setFilterBy ] = useState(stationService.getDefaultFilter())

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    

    useEffect(() => {
        loadStations(filterBy)
        console.log('filterBy from LeftSideBar', filterBy)
    }, [filterBy])

    
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