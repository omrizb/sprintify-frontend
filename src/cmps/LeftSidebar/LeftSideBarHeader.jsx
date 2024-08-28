import { useState } from 'react'
import { addStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'

import { SvgIcon } from "../SvgIcon"

export function LeftSideBarHeader() {
    const navigate = useNavigate()
    const [ showMenu, setShowMenu] = useState(false)

    async function handleAddStation(){
        setShowMenu(prevShowMenu => !prevShowMenu)
      
        try {
            const station = await addStation()
            navigate(`/playlist/${station._id}`)
        } catch (err) {
            console.log('Cannot add a station')
        }   
    }

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
                        <li onClick={handleAddStation}>
                            <div><SvgIcon iconName={"library"}    /></div>
                            <div>Create a new playlist</div>
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}