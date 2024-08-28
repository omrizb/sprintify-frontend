import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"


export function LeftSideBarHeader() {

    const [ showMenu, setShowMenu] = useState(false)

    return (
        <div className="sidebar-header">
            <div className="library">
                <div className="icon"> <SvgIcon iconName={"library"}    /> </div>
                Your Library
            </div>
            
            <div className="add-playlist">
                <button className="plus icon btn-medium"
                        onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                    <SvgIcon iconName={"plus"} /> 
                </button>

                {showMenu &&
                    <ul className= "drop-down-menu" >
                        <li>
                            <div><SvgIcon iconName={"library"}    /></div>
                            <div>Create a new playlist</div>
                        </li>
                    </ul>
                }
            </div>
            

            

        </div>
    )
}