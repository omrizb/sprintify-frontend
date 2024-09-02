import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { addStationToLibrary, removeStation, removeStationFromLibrary } from '../../store/actions/station.actions.js'

import { EditStation } from '../EditStation.jsx'
import { Modal } from '../Modal.jsx'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'


export function StationDetailsActions({ station, stationMeta }) {

    const navigate = useNavigate()

    const [viewType, setViewType] = useState('list')
    const [showViewMenu, setShowViewMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { isOwnedByUser, userId, isLikedByUser } = stationMeta
    const {
        showPlay,
        showAddToLibrary,
        showRemoveFromLibrary,
        showMore
    } = stationMeta.stationActionsBar


    const viewList = [
        buildListObj({
            name: 'View as',
            type: 'title'
        }),
        buildListObj({
            name: 'Compact',
            icon: 'compact',
            isChosen: (viewType === 'compact'),
            onClick: () => setViewType('compact')
        }),
        buildListObj({
            name: 'List',
            icon: 'list',
            isChosen: (viewType === 'list'),
            onClick: () => setViewType('list')
        })

    ]

    const moreList = getMoreList()

    function getMoreList() {
        const addToQueue = buildListObj({
            name: 'Add to queue',
            icon: 'addToQueue'
        })

        const deleteStation = buildListObj({
            name: 'Delete',
            icon: 'delete',
            onClick: () => {
                removeStation(station._id)
                navigate(`/`)
            }
        })

        const editDetails = buildListObj({
            name: 'Edit details',
            icon: 'editDetails',
            onClick: () => {
                setIsModalOpen(true)
                setShowMoreMenu(false)
            }
        })

        const removeFromLibrary = buildListObj({
            name: 'Remove from Your Library',
            icon: 'removeFromLibrary',
            onClick: () => removeStationFromLibrary(station, userId)
        })

        const addToLibrary = buildListObj({
            name: 'Add to Your Library',
            icon: 'addToLibrary',
            onClick: () => addStationToLibrary(station, userId)
        })

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
            onClick: noop,
            ...props
        }
    }

    function noop() { }


    return (
        <div className="station-action-bar" >

            {showPlay && <PlayButton
                type={'stationDetails'}
                stationId={station._id}
                stationName={station.name}
                songId={station.songs[0]?.songId}
                songName={station.songs[0]?.songName}
            />}

            {showAddToLibrary && <div
                onClick={() => addStationToLibrary(station, userId)}>
                <AddToButton type="addToLibrary" /></div>}

            {showRemoveFromLibrary && <div
                onClick={() => removeStationFromLibrary(station, userId)}>
                <VButton type="removeFromLibrary" /></div>}

            <div className="show-more"
                onClick={() => setShowMoreMenu(prevShowMoreMenu => !prevShowMoreMenu)}>
                {showMore && (<SvgButton
                    btnClass={"btn-dark2"}
                    svgIcon={"dotsBig"}
                    svgClass={"svg-big2"}
                    tooltipTxt={`More options for ${station.name}`}
                />)}
                {showMoreMenu && <DropDownMenu listItems={moreList} />}

            </div>

            <div className="view-as">
                <button
                    className="btn-dark2-simple flex-regular-gap"
                    onClick={() => setShowViewMenu(prevShowViewMenu => !prevShowViewMenu)}>
                    <span>{viewType}</span>
                    <SvgIcon iconName={viewType} svgClass="svg-small1" />
                </button>
                {showViewMenu && <DropDownMenu listItems={viewList} />}
            </div>

            {isModalOpen &&
                <Modal closeModal={() => setIsModalOpen(false)} >
                    <EditStation station={station} onCloseEdit={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
    )
}




