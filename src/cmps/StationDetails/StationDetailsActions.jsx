import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { PlayButton } from '../Player/PlayButton.jsx'

export function StationDetailsActions({ station, stationMeta, onRemoveStation }) {

    const [showViewMenu, setShowViewMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)

    const viewList = getViewList()
    const moreList = getMoreList()

    const [listItemsView, setListItemsView] = useState(viewList)
    const [listItemsMore, setListItemsMore] = useState(moreList)
    
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

    function getViewList(){
        const compact =  {
            type: 'list-item',
            name: 'Compact',
            icon: 'compact',
            action: '',
            topDivision: '',
            isChosen: false
        }
        const list = {...compact, name:'List', icon: 'list', isChosen: true}

        return [compact, list]
    }

    function getMoreList(){
        const addToQueque =  {
            type: 'list-item',
            name: 'Add to queque',
            icon: 'addToQueque',
            action: 'add-to-queque',
            topDivision: '',
            isChosen: false
        }
        const editDetails = {...addToQueque, name:'Edit details', icon: 'editDetails', action: 'edit-station'}
        const deleteStation = {...addToQueque, name:'Delete', icon: 'delete', action: 'remove-station'}

        return [addToQueque, editDetails, deleteStation]
    }


    function findChosenItem(){
        const chosenViewItem = listItemsView.find(listItem => listItem.isChosen === true)
        return chosenViewItem.name
    }
    function findChosenItemIcon(){
        const chosenViewItem = listItemsView.find(listItem => listItem.isChosen === true)
        return chosenViewItem.icon
    
    }

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

            <div className="show-more" 
            onClick={() => setShowMoreMenu(prevShowMoreMenu => !prevShowMoreMenu)}>
                {showMore && (<SvgButton
                    btnClass={"btn-dark2"}
                    svgIcon={"dots"}
                    svgClass={"svg-big2"}
                    tooltipTxt={`More options for ${station.name}`}
                />)}
                {showMoreMenu && <DropDownMenu listItems={listItemsMore} />}
                
            </div>

            

            <div className="view-as">
                <button 
                className="btn-dark2-simple flex-regular-gap" 
                onClick={() => setShowViewMenu(prevShowViewMenu => !prevShowViewMenu)}>
                    <span>{findChosenItem()}</span>
                    <SvgIcon iconName={findChosenItemIcon()} svgClass="svg=small"/>
                </button>
                {showViewMenu && <DropDownMenu listItems={listItemsView} />}
            </div>
        </div>
    )
}




