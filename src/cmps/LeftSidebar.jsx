import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'
import { loadStationToPlayer } from '../store/actions/player.actions.js'
import { stationService } from '../services/station/index.js'

import { LeftSideBarHeader } from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'
import { updateFilterBy } from '../store/actions/filterBy.actions.js'


export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const loggedinUser = false

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        if (!stations || !stations.length) return
        const station = stations.find(station => station.songs.length > 0)
        loadStationToPlayer(station._id, station.songs[0].songId)
    }, [stations])


    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <div className="my-library" >
                <LeftSideBarHeader />
                <LeftSideBarFilter />
                <StationList stations={stations} viewArea={'leftSide'} />
            </div>
        </div>

    )
}