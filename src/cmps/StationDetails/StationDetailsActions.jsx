import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'

export function StationDetailsActions({ stationMeta }) {

    const [showMenu, setShowMenu] = useState(false)

    const display = {
        sortBy: {
            'showRecents': false,
            'showRecentlyAdded': false,
            'showAlpha': false,
            'showCreator': false,
            'showCustom': false
        },
        viewAs: {
            'showCompact': true,
            'showList': true,
            'showGrid': false,
        }
    }
    const {
        showPlay,
        showAddRemove,
        showFollowUnfollow,
        showMore,
        showView,
    } = stationMeta.stationActionsBar

    const handleViewModeClick = (mode) => {
        changeViewMode(mode)
    }

    return (
        <div className="station-action-bar">
            <div className="station-action-bar-row">
                <div className="station-action-bar-container">
                    {showPlay && (
                        <div className="wrap-playPlaylist">
                            <button className="action-bar-btn playPlaylist icon btn-medium">
                                <SvgIcon iconName={"playPlaylist"} />
                            </button>
                        </div>
                    )}

                    {showAddRemove && (
                        <>
                            <button className="action-bar-btn removePlaylist icon btn-medium">
                                <SvgIcon iconName={"removePlaylist"} />
                            </button>
                            <button className="action-bar-btn addPlaylist icon btn-medium">
                                <SvgIcon iconName={"addPlaylist"} />
                            </button>
                        </>
                    )}

                    {showFollowUnfollow && (
                        <>
                            <button className="following-btn">Following</button>
                            <button className="following-btn">Follow</button>
                        </>
                    )}

                    {showMore && (
                        <button className="action-bar-btn dots icon btn-medium">
                            <SvgIcon iconName={"dots"} />
                        </button>
                    )}
                </div>
                <div className="view-as">
                    {showView && (
                        <>
                            <div onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)} className="recents" >
                                List
                                <div className="icon"><SvgIcon iconName={"list"} /> </div>
                            </div>
                            {showMenu && <DropDownMenu display={display} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

