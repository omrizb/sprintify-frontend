import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'

export function StationDetailsActions({ station, stationMeta, onRemoveStation }) {

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
    // console.log('stationMeta.stationActionsBar:', stationMeta.stationActionsBar)

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
                            <SvgButton
                                btnClass={"action-bar-btn icon"}
                                svgIcon={"removePlaylist"}
                                svgClass={"svg-big"}
                                tooltipTxt={`Remove from Your Library`}
                            />
                            <SvgButton
                                btnClass={"action-bar-btn icon"}
                                svgIcon={"addPlaylist"}
                                svgClass={"svg-big"}
                                tooltipTxt={`Save to Your Library`}
                            />
                        </>
                    )}

                    {showFollowUnfollow && (
                        <>
                            <button className="following-btn">Following</button>
                            <button className="following-btn">Follow</button>
                        </>
                    )}

                    {showMore && (
                        <SvgButton
                            btnClass={"action-bar-btn icon"}
                            svgIcon={"dots"}
                            svgClass={"svg-big"}
                            tooltipTxt={`More options for ${station.name}`}
                        />

                        
                    )}
                    <button onClick={onRemoveStation} className="btn-tinted">Remove</button>


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

