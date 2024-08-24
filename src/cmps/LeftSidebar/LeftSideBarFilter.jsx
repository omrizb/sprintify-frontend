import { useState, useEffect } from 'react'

import { DropDownMenu } from "../DropDownMenu"
import { SvgIcon } from "../SvgIcon"


export function LeftSideBarFilter() {

    const [ showMenu, setShowMenu] = useState(false)

    return (
        <div className="sidebar-filter">
            <div className="category">
                <button className="btn-tinted">Playlists</button>
                <button className="btn-tinted">Artists</button>
                <button className="btn-tinted">Albums</button>
            </div>
            <div className="sidebar-search">
                <button className="search icon btn-medium"><SvgIcon iconName={"search"}    /> </button>
                <div className="sort-by">
                    <button onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}  className="btn-medium">
                        Recents
                        <div className="icon"><SvgIcon iconName={"recents"}    /> </div>
                    </button>
                    {showMenu && <DropDownMenu />}
                </div>
                
            </div>
        </div>
    )
}