import { useSelector } from 'react-redux'
import { LeftSideBarHeader} from './LeftSidebar/LeftSideBarHeader.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'
import { LeftSideBarFilter } from './LeftSidebar/LeftSideBarFilter.jsx'
import { StationList } from './StationList.jsx'

export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    // const loggedinUser = false

    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <div className="my-library" >
                <LeftSideBarHeader />
                <LeftSideBarFilter />
                <StationList />
            </div>
        </div>
        
    )
}