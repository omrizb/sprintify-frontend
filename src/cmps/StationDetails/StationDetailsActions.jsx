import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'

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


    const { isOwnedByUser } = stationMeta
    const {
        showPlay,
        showAddToLibrary,
        showRemoveFromLibrary,
        showFollowUnfollow,
        showMore,
        songsDisplay,
    } = stationMeta.stationActionsBar

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

            {showAddToLibrary && <AddToButton type="addToLibrary" />}

            {showRemoveFromLibrary && <VButton type="removeFromLibrary" />}

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

            {showMore && <DotsButton type="stationDetails" elementName={station.name} />}

            <div className="view-as">
                <button className="btn-dark2-simple flex-regular-gap" onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                    {(songsDisplay === 'list')
                        ? <><span>List</span><SvgIcon iconName="list" svgClass="svg-small1" /></>
                        : <><span>Compact</span><SvgIcon iconName="compact" svgClass="svg-small1" /></>
                    }
                </button>
                {showMenu && <DropDownMenu display={display} />}
            </div>
        </div>
    )
}

