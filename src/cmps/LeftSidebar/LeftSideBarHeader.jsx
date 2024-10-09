import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { AddNewStationBtn } from './AddNewStationBtn'


export function LeftSideBarHeader({ loggedinUser, setLibraryDisp }) {

    const [display, setDisplay] = useState('close')

    function onClickLibraryIcon(status) {
        setDisplay(status)
        setLibraryDisp(status)

    }

    return (
        <div className="sidebar-header">

            {(display === 'open') && <div className="library">
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
                <AddNewStationBtn loggedinUser={loggedinUser} />}

        </div>
    )
}