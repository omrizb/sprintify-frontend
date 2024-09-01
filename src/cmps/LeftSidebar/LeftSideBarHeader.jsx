import { useState } from 'react'
import { addStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'

import { SvgIcon } from "../SvgIcon"
import { DropDownMenu } from '../DropDownMenu'

export function LeftSideBarHeader() {
    const navigate = useNavigate()
    const [ showMenu, setShowMenu] = useState(false)

    const createPlaylist =  {
        type: 'list-item',
        name: 'Create a new playlist',
        icon: 'library',
        action: 'add-station',
        topDivision: '',
        isChosen: false
    }
    
    const listItems = [createPlaylist]

    function handleAction(action){
        console.log(action)
        if(action === 'add-station') handleAddStation()
    }

    async function handleAddStation(){
        setShowMenu(prevShowMenu => !prevShowMenu)
        try {
            const station = await addStation()
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