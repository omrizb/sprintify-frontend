import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'
import { loadFirstStation } from '../store/actions/player.actions.js'

import { LeftSideBarHeader } from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'
import { updateFilterBy } from '../store/actions/filterBy.actions.js'


export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const userId = loggedinUser._id

    const isFirstSongLoaded = useSelector(storeState => storeState.playerModule.isFirstSongLoaded)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    useEffect(() => {
        updateFilterBy({ ...filterBy, userId })
    }, [])

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        if (!stations || !stations.length || isFirstSongLoaded) return
        const station = stations.find(station => station.songs.length > 0)
        loadFirstStation(station._id, station.songs[0])
    }, [stations])

    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <div className="my-library" >
                <LeftSideBarHeader loggedinUser={loggedinUser} />
                <LeftSideBarFilter userId={userId} />
                <StationList stations={stations} className="left-side-stations" previewStyle="leftSide" />
            </div>
        </div>

    )
}