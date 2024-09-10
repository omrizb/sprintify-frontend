import { useRef, useState } from 'react'
import { addStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'

import { SvgIcon } from "../SvgIcon"
import { DropDownMenu } from '../Menus/DropDownMenu'
// import { stationService } from '../../services/station/station.service.local'
import { stationService } from '../../services/station/station.service.remote'
import { PopUp } from '../PopUp'

export function LeftSideBarHeader({ loggedinUser }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const addBtnRef = useRef(null)

    const listItems = [{
        type: 'list-item',
        name: 'Create a new playlist',
        icon: 'library',
        topDivision: '',
        isChosen: false,
        onClick: handleAddStation
    }]

    async function handleAddStation() {
        setShowMenu(prevShowMenu => !prevShowMenu)
        try {
            const newStation = stationService.getEmptyStation()

            const { _id, fullName, imgUrl } = loggedinUser
            newStation.createdBy = {
                id: _id,
                fullName,
                imgUrl
            }

            const station = await addStation(newStation)
            navigate(`/station/${station._id}`)
        } catch (err) {
            console.log('Cannot add a station')
        }
    }

    return (
        <div className="sidebar-header">
            <div className="library">
                <div className="icon"> <SvgIcon iconName={"library"} /> </div>
                Your Library
            </div>

            <div className="add-playlist">
                <button ref={addBtnRef} className="plus icon btn-medium-with-hover"
                    onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                    <SvgIcon iconName={"plus"} />
                </button>

                {showMenu &&
                    <PopUp btnRef={addBtnRef} onClosePopUp={() => setShowMenu(false)} >
                        <DropDownMenu listItems={listItems} />
                    </PopUp>
                }
            </div>
        </div>
    )
}