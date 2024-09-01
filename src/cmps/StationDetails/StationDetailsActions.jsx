import { useState, useEffect } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { Modal } from '../Modal.jsx'
import { EditStation } from '../EditStation.jsx'
import { addStation, removeStation, updateStation } from '../../store/actions/station.actions.js'

export function StationDetailsActions({ station, stationMeta, onRemoveStation }) {

    const [showViewMenu, setShowViewMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { isOwnedByUser, userId, isLikedByUser } = stationMeta
    const {
        showPlay,
        showAddToLibrary,
        showRemoveFromLibrary,
        showMore,
        songsDisplay,
    } = stationMeta.stationActionsBar

    const viewList = getViewList()
    const moreList = getMoreList()

    const [listItemsView, setListItemsView] = useState(viewList)
    const [listItemsMore, setListItemsMore] = useState(moreList)


    useEffect(() => {
        const updatedViewList = getViewList()
        const updatedMoreList = getMoreList()
        setListItemsView([...updatedViewList])
        setListItemsMore([...updatedMoreList])
    }, [isLikedByUser])


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
        const addToQueue = buildListObj({ name: 'Add to queue', icon: 'addToQueue' })

        const editDetails = { ...addToQueue, name: 'Edit details', icon: 'editDetails' }
        const deleteStation = { ...addToQueue, name: 'Delete', icon: 'delete' }
        const removeFromLibrary = { ...addToQueue, name: 'Remove from Your Library', icon: 'removeFromLibrary' }
        const addToLibrary = { ...addToQueue, name: 'Add to Your Library', icon: 'addToLibrary' }

        if (isOwnedByUser) return [addToQueue, editDetails, deleteStation]
        if (!isOwnedByUser && isLikedByUser) return [removeFromLibrary, addToQueue]
        if (!isOwnedByUser && !isLikedByUser) return [addToLibrary, addToQueue]
    }

    function buildListObj(props) {
        return {
            type: 'list-item',
            name: '',
            icon: '',
            topDivision: '',
            isChosen: false,
            ...props
        }
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
        console.log(listItem.name)
        if (listItem.name === 'Delete') onRemoveStation()
        if (listItem.name === 'Edit details') {
            setIsModalOpen(true)
            setShowMoreMenu(false)
        }
        if (listItem.name === 'Remove from Your Library') {
            const likedByArr = station.likedByUsers.filter(user => user !== userId)
            updateStation({ ...station, likedByUsers: [...likedByArr] })
            removeStation(station._id)
        }
        if (listItem.name === 'Add to Your Library') {
            updateStation({ ...station, likedByUsers: [...station.likedByUsers, userId] })
            addStation(station)
        }
    }

    const handleViewModeClick = (mode) => {
        changeViewMode(mode)
    }

    return (
        <div className="station-action-bar" >

            {showPlay && <PlayButton
                type={'stationDetails'}
                stationId={station._id}
                stationName={station.name}
                songId={station.songs[0]?.songId}
                songName={station.songs[0]?.songName}
            />}

            {showAddToLibrary && <AddToButton type="addToLibrary" />}

            {showRemoveFromLibrary && <VButton type="removeFromLibrary" />}

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

            {isModalOpen &&
                <Modal closeModal={() => setIsModalOpen(false)} >
                    <EditStation station={station} onCloseEdit={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
    )
}




