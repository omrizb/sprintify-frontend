import { useRef, useState } from "react"
import { PopUp } from "../PopUp"
import { DropDownMenu } from "../Menus/DropDownMenu"
import { SvgIcon } from "../SvgIcon"
import { addStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station/station.service.remote"

export function AddNewStationBtn({ loggedinUser }) {

    const [showMenu, setShowMenu] = useState(false)
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

    return (

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
        </div>
    )

}