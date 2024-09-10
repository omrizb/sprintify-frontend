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

    const user = useSelector(storeState => storeState.userModule.user)

    const isFirstSongLoaded = useSelector(storeState => storeState.playerModule.isFirstSongLoaded)
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    useEffect(() => {
        if (!user) return
        updateFilterBy({ ...filterBy, userId: user._id })
    }, [])

    useEffect(() => {
        if (!user) return
        loadStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        if (!user || !stations || !stations.length || isFirstSongLoaded) return
        const station = stations.find(station => station.songs.length > 0)
        loadFirstStation(station._id, station.songs[0])
    }, [stations])

    return (
        <div className="left-sidebar">
            {user
                ? <div className="my-library" >
                    <LeftSideBarHeader loggedinUser={user} />
                    <LeftSideBarFilter userId={user._id} />
                    <StationList stations={stations} className="left-side-stations" previewStyle="leftSide" />
                </div>
                : <SidebarNav />
            }
        </div>
    )
}