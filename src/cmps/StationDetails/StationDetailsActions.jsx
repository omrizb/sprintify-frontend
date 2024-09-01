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
        const title ={
            type: 'title',
            name: 'View as',
            icon: '',
            topDivision: '',
            isChosen: false
        }
        const compact =  {
            type: 'list-item',
            name: 'Compact',
            icon: 'compact',
            topDivision: '',
            isChosen: false
        }
        const list = {...compact, name:'List', icon: 'list', isChosen: true}

        return [title, compact, list]
    }

    function getMoreList(){
        const addToQueque =  {
            type: 'list-item',
            name: 'Add to queque',
            icon: 'addToQueque',
            topDivision: '',
            isChosen: false
        }
        const editDetails = {...addToQueque, name:'Edit details', icon: 'editDetails'}
        const deleteStation = {...addToQueque, name:'Delete', icon: 'delete'}

        return [addToQueque, editDetails, deleteStation]
    }

    function findChosenItem(){
        const chosen = listItemsView.find(listItem => listItem.isChosen === true)
        return chosen.name
    }

    function findChosenItemIcon(){
        const chosen = listItemsView.filter(listItem => listItem.icon !== '')
                        .find(listItem => listItem.isChosen === true)
        return chosen.icon
    
    }

    function handleViewAction(listItem){
        
        setListItemsView(prevListItemsView => 
            prevListItemsView.map(item => {
                if(item.type === 'title')  return item   
                else {
                    return {
                        ...item,
                        isChosen: (item.name === listItem.name)
                    }
                }
            }
        ))  
        
    }

    function handleMoreAction(listItem){
        console.log(listItem.name)
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
                {showMoreMenu && <DropDownMenu listItems={listItemsMore} handleAction = {handleMoreAction} />}
                
            </div>

            

            <div className="view-as">
                <button 
                className="btn-dark2-simple flex-regular-gap" 
                onClick={() => setShowViewMenu(prevShowViewMenu => !prevShowViewMenu)}>
                    <span>{findChosenItem()}</span>
                    <SvgIcon iconName={findChosenItemIcon()} svgClass="svg=small"/>
                </button>
                {showViewMenu && <DropDownMenu listItems={listItemsView} handleAction ={handleViewAction} />}
            </div>
        </div>
    )
}




