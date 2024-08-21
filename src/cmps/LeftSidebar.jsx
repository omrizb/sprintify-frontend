import { useSelector } from 'react-redux'
import { MyLibrary } from './LeftSidebar/MyLibrary.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'

export function LeftSidebar() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    return (
        <div className="left-sidebar">
            {!loggedinUser && <SidebarNav />}
            <MyLibrary />
        </div>
    )
}