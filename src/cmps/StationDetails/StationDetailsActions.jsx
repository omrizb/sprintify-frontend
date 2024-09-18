import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { playerActions, setPlayerAction, setPlayerFromSocket } from '../../store/actions/player.actions.js'
import { addStationToLibrary, removeStation, removeStationFromLibrary } from '../../store/actions/station.actions.js'

import { EditStation } from '../EditStation.jsx'
import { Modal } from '../Modal.jsx'
import { DropDownMenu } from '../Menus/DropDownMenu.jsx'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PopUp } from '../PopUp.jsx'
import { Tooltip } from '../Tooltip.jsx'
import { SOCKET_EMIT_JOIN_MUTUAL_STATION } from '../../services/socket.service.js'


export function StationDetailsActions({ station, stationMeta }) {

    const navigate = useNavigate()
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const pinnedStation = (station.isPinned === true)

    const [viewType, setViewType] = useState('list')
    const [showViewMenu, setShowViewMenu] = useState(false)
    const showViewBtnRef = useRef(null)
    const [showMoreMenu, setShowMoreMenu] = useState(false)
    const showMoreBtnRef = useRef(null)
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
            icon: 'addToQueue',
            onClick: () => setPlayerAction(playerActions.ADD_TO_QUEUE, { songs: station.songs })
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
            onClick: () => {
                const lastIdx = stations.findIndex(item => item._id === station._id)
                removeStationFromLibrary(station, userId, lastIdx)
            }
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

    function onClickMutualListen() {
        console.log('Mutual listening')
        socketService.emit(SOCKET_EMIT_JOIN_MUTUAL_STATION, station._id)
        socketService.on('on-player-change', state => {
            setPlayerFromSocket(state)
        })
    }


    return (
        <div className="station-action-bar" >

            {showPlay && <PlayButton
                type={'stationDetails'}
                stationId={station._id}
                stationName={station.name}
                song={station.songs[0]}
            />}

            {showAddToLibrary && <div
                onClick={() => addStationToLibrary(station, userId)}>
                <AddToButton type="addToLibrary" /></div>}

            {showRemoveFromLibrary && <div
                onClick={() => {
                    const lastIdx = stations.findIndex(item => item._id === station._id)
                    removeStationFromLibrary(station, userId, lastIdx)
                }}>
                <VButton type="removeFromLibrary" /></div>}

            {(!pinnedStation) &&
                <div ref={showMoreBtnRef} className="show-more"
                    onClick={() => setShowMoreMenu(prevShowMoreMenu => !prevShowMoreMenu)}>
                    {showMore && (<SvgButton
                        btnClass={"btn-dark2"}
                        svgIcon={"dotsBig"}
                        svgClass={"svg-big2"}
                        tooltipTxt={`More options for ${station.name}`}
                    />)}
                    {showMoreMenu && <PopUp btnRef={showMoreBtnRef} onClosePopUp={() => setShowMoreMenu(false)} >
                        <DropDownMenu listItems={moreList} />
                    </PopUp>}

                </div>}

            {!isOwnedByUser && <Tooltip txt="Better together 🎧">
                <img
                    className="mutual-listen"
                    onClick={onClickMutualListen}
                    src="https://us.123rf.com/450wm/yusufdemirci/yusufdemirci1807/yusufdemirci180700225/105063894-vector-illustration-of-a-kids-dancing.jpg?ver=6"
                    alt="" />
            </Tooltip>}



            <div className="view-as">
                <button
                    ref={showViewBtnRef}
                    className="btn-dark2-simple flex-regular-gap"
                    onClick={() => setShowViewMenu(prevShowViewMenu => !prevShowViewMenu)}>
                    <span>{viewType}</span>
                    <SvgIcon iconName={viewType} svgClass="svg-small1" />
                </button>

                {showViewMenu && <PopUp btnRef={showViewBtnRef} onClosePopUp={() => setShowViewMenu(false)} >
                    <DropDownMenu listItems={viewList} />
                </PopUp>}

            </div>

            {isModalOpen &&
                <Modal closeModal={() => setIsModalOpen(false)} >
                    <EditStation station={station} onCloseEdit={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
    )
}




