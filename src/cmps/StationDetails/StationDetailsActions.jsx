import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { PlayButton } from '../Player/PlayButton.jsx'

export function StationDetailsActions({ station, stationMeta, onRemoveStation }) {

    const [showMenu, setShowMenu] = useState(false)

    const viewTitle ={
        type: 'title',
        name: 'View as',
        icon: '',
        action: '',
        topDivision: '',
        isChosen: false
    }
    
    const compact =  {
        type: 'list-item',
        name: 'Compact',
        icon: 'compact',
        action: '',
        topDivision: '',
        isChosen: false
    }
    const list = {...compact, name:'List', icon: 'list', isChosen: true}
    const listItems = [compact, list]
    
    const { isOwnedByUser } = stationMeta
    const {
        showPlay,
        showAddToLibrary,
        showRemoveFromLibrary,
        showFollowUnfollow,
        showMore,
        songsDisplay,
    } = stationMeta.stationActionsBar
    // console.log('stationMeta.stationActionsBar:', stationMeta.stationActionsBar)

    const handleViewModeClick = (mode) => {
        changeViewMode(mode)
    }

    return (
        <div className="station-action-bar">

            {showPlay && <PlayButton
                type={'stationDetails'}
                stationId={station._id}
                stationName={station.name}
                songId={station.songs[0]?.songId}
                songName={station.songs[0]?.songName}
            />}

            {showAddToLibrary && <SvgButton
                btnClass={"btn-dark2"}
                svgIcon={"addPlaylist"}
                svgClass={"svg-big2"}
                tooltipTxt={`Save to Your Library`}
            />}

            {showRemoveFromLibrary && <SvgButton
                btnClass={"btn-v"}
                svgIcon={"removePlaylist"}
                svgClass={"svg-big2"}
                tooltipTxt={`Remove from Your Library`}
            />}

            {isOwnedByUser && <button
                className={"btn-dark2"}
                onClick={onRemoveStation}
            >X</button>}

            {showFollowUnfollow && (
                <>
                    <button className="following-btn">Following</button>
                    <button className="following-btn">Follow</button>
                </>
            )}

            {showMore && (<SvgButton
                btnClass={"btn-dark2"}
                svgIcon={"dots"}
                svgClass={"svg-big2"}
                tooltipTxt={`More options for ${station.name}`}
            />)}

            <div className="view-as">
                <button className="btn-dark2-simple flex-regular-gap" onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                    {(songsDisplay === 'list')
                        ? <><span>List</span><SvgIcon iconName="list" svgClass="svg-small" /></>
                        : <><span>Compact</span><SvgIcon iconName="compact" svgClass="svg-small" /></>
                    }
                </button>
                {showMenu && <DropDownMenu listItems={listItems} />}
            </div>
        </div>
    )
}

