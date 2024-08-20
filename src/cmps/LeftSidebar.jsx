import { MyLibrary } from './LeftSidebar/MyLibrary.jsx'
import { SidebarNav } from './LeftSidebar/SidebarNav.jsx'

export function LeftSidebar() {
    return (
        <div className="left-sidebar">
            <SidebarNav />
            <MyLibrary />
        </div>
    )
}