import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addStation, updateStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'

import { SvgIcon } from "../SvgIcon"
import { stationService } from '../../services/station/station.service.local'
// import { stationService } from '../../services/station'


export function LeftSideBarHeader() {
    const navigate = useNavigate()
    const stations = useSelector(storeState => storeState.stationModule.station)
    const [ showMenu, setShowMenu] = useState(false)


    async function addPlaylist(){
        setShowMenu(prevShowMenu => !prevShowMenu)
        const newStation = stationService.getEmptyStation()
    
        try {
            const station = await addStation(newStation)
            console.log(station)
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
                        <li onClick={addPlaylist}>
                            <div><SvgIcon iconName={"library"}    /></div>
                            <div>Create a new playlist</div>
                        </li>
                    </ul>
                }
            </div>
            

            

        </div>
    )
}