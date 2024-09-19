import { useRef, useState } from 'react'
import { addStation } from '../../store/actions/station.actions'
import { useNavigate } from 'react-router-dom'

import { SvgIcon } from "../SvgIcon"
import { DropDownMenu } from '../Menus/DropDownMenu'
// import { stationService } from '../../services/station/station.service.local'
import { stationService } from '../../services/station/station.service.remote'
import { PopUp } from '../PopUp'

export function LeftSideBarHeader({ loggedinUser, setLibraryDisp }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [display, setDisplay] = useState('open')
    const addBtnRef = useRef(null)

    const listItems = [{
        type: 'list-item',
        name: 'Create a new playlist',
        icon: 'createNewStation',
        iconClass: 'svg-small1',
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

    function onClickLibraryIcon(status) {
        setDisplay(status)
        setLibraryDisp(status)

    }

    return (
        <div className="sidebar-header">
            {(display == 'open') && <div className="library">
                <div
                    onClick={() => onClickLibraryIcon('close')}
                    className="icon">
                    <SvgIcon iconName={"library"} svgClass="svg-big1" />
                </div>
                <p>Your Library</p>
            </div>}

            {(display == 'close') && <div className="library">
                <div
                    onClick={() => onClickLibraryIcon('open')}
                    className="icon">
                    <SvgIcon iconName={"libraryClose"} svgClass="svg-big1" />
                </div>
            </div>}

            {(display === 'open') &&
                <div className="add-playlist">
                    <button ref={addBtnRef} className="plus icon btn-medium-with-hover"
                        onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                        <SvgIcon iconName={"plus"} svgClass="svg-small1" />
                    </button>

                    {showMenu &&
                        <PopUp btnRef={addBtnRef} onClosePopUp={() => setShowMenu(false)} >
                            <DropDownMenu listItems={listItems} />
                        </PopUp>
                    }
                </div>}
        </div>
    )
}