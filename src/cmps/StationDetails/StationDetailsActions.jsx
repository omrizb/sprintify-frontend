import { useState, useEffect } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'

export function StationDetailsActions({ station, stationMeta, onRemoveStation }) {

    const [showViewMenu, setShowViewMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)

    const { isOwnedByUser } = stationMeta
    const {
        showPlay,
        showAddToLibrary,
        showRemoveFromLibrary,
        showFollowUnfollow,
        showMore,
        songsDisplay,
    } = stationMeta.stationActionsBar

    const viewList = getViewList()
    const moreList = getMoreList()
    
    const [listItemsView, setListItemsView] = useState(viewList)
    const [listItemsMore, setListItemsMore] = useState(moreList)
    

    function getViewList() {
        const title = {
            type: 'title',
            name: 'View as',
            icon: '',
            topDivision: '',
            isChosen: false
        }
        const compact = {
            type: 'list-item',
            name: 'Compact',
            icon: 'compact',
            topDivision: '',
            isChosen: false
        }
        const list = { ...compact, name: 'List', icon: 'list', isChosen: true }

        return [title, compact, list]
    }

    function getMoreList() {
        const addToQueque = {
            type: 'list-item',
            name: 'Add to queque',
            icon: 'addToQueque',
            topDivision: '',
            isChosen: false
        }
        const editDetails = { ...addToQueque, name: 'Edit details', icon: 'editDetails' }
        const deleteStation = { ...addToQueque, name: 'Delete', icon: 'delete' }

        if (isOwnedByUser) return [addToQueque, editDetails, deleteStation]
        return [addToQueque, editDetails]
    }

    function findChosenItem() {
        const chosen = listItemsView.find(listItem => listItem.isChosen === true)
        return chosen.name
    }

    function findChosenItemIcon() {
        const chosen = listItemsView.filter(listItem => listItem.icon !== '')
            .find(listItem => listItem.isChosen === true)
        return chosen.icon
    }

    function handleViewAction(listItem) {

        setListItemsView(prevListItemsView =>
            prevListItemsView.map(item => {
                if (item.type === 'title') return item
                else {
                    return {
                        ...item,
                        isChosen: (item.name === listItem.name)
                    }
                }
            }
            ))

    }

    function handleMoreAction(listItem) {
        if(listItem.name === 'Delete') onRemoveStation()
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

            {showAddToLibrary && <AddToButton type="addToLibrary" />}

            {showRemoveFromLibrary && <VButton type="removeFromLibrary" />}

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
                    svgIcon={"dotsBig"}
                    svgClass={"svg-big2"}
                    tooltipTxt={`More options for ${station.name}`}
                />)}
                {showMoreMenu && <DropDownMenu listItems={listItemsMore} handleAction={handleMoreAction} />}

            </div>

            <div className="view-as">
                <button
                    className="btn-dark2-simple flex-regular-gap"
                    onClick={() => setShowViewMenu(prevShowViewMenu => !prevShowViewMenu)}>
                    <span>{findChosenItem()}</span>
                    <SvgIcon iconName={findChosenItemIcon()} svgClass="svg-small1" />
                </button>
                {showViewMenu && <DropDownMenu listItems={listItemsView} handleAction={handleViewAction} />}
            </div>
        </div>
    )
}




