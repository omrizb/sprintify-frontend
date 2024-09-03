import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadLibrary, loadStations } from '../store/actions/station.actions.js'
import { playerActions, setPlayerAction } from '../store/actions/player.actions.js'

import { LeftSideBarHeader } from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'


export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const userId = loggedinUser._id

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    useEffect(() => {
        loadLibrary(filterBy, userId)
    }, [filterBy])

    useEffect(() => {
        if (!stations || !stations.length) return
        const station = stations.find(station => station.songs.length > 0)
        setPlayerAction(playerActions.LOAD_STATION, { stationId: station._id, song: station.songs[0] })

    }, [stations])


    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <div className="my-library" >
                <LeftSideBarHeader />
                <LeftSideBarFilter userId={userId} />
                <StationList stations={stations} viewArea={'leftSide'} />
            </div>
        </div>

    )
}