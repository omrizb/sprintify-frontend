import { useState } from 'react'
import { addStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'

import { SvgIcon } from "../SvgIcon"
import { DropDownMenu } from '../DropDownMenu'
import { stationService } from '../../services/station/station.service.local'

export function LeftSideBarHeader() {
    const navigate = useNavigate()
    const [ showMenu, setShowMenu] = useState(false)

    const createPlaylist =  {
        type: 'list-item',
        name: 'Create a new playlist',
        icon: 'library',
        topDivision: '',
        isChosen: false
    }
    
    const listItems = [createPlaylist]

    function handleAction(listItem){
        if(listItem.name === 'Create a new playlist') handleAddStation()
    }

    async function handleAddStation(){
        setShowMenu(prevShowMenu => !prevShowMenu)
        try {
            const newStation = stationService.getEmptyStation()
            const savedStation = await stationService.save(newStation)
            const station = await addStation(savedStation)
            navigate(`/station/${station._id}`)
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
                    <DropDownMenu listItems = {listItems} handleAction = {handleAction} />
                }
            </div>
        </div>
    )
}