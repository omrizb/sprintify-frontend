import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { utilService } from '../services/util.service.js'
import { updateStation, loadStation } from '../store/actions/station.actions.js'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { SongList } from '../cmps/SongDetails/SongList.jsx'
import { Footer } from '../cmps/Footer.jsx'
import { AddSongs } from '../cmps/AddSongs.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { Modal } from '../cmps/Modal.jsx'
import { HeaderFixer } from '../cmps/HeaderFixer.jsx'
import { PlayButton } from '../cmps/Buttons/PlayButton.jsx'
import { EditStation } from '../cmps/EditStation.jsx'


export function StationDetails() {

    const { id } = useParams()

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const station = useSelector(storeState => storeState.stationModule.station)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const bgColor = useRef(utilService.getRandomColor())

    useEffect(() => {
        onLoad(id)
    }, [id])

    async function onLoad(id) {
        try {
            setIsLoading(true)
            await loadStation(id)
            setIsLoading(false)
        } catch (err) {
            console.log('Error: StationDetails, loadStation:', err)
        }
    }

    function onRemoveSong(songId) {
        const updatedSongsArr = station.songs.filter(song => song.songId !== songId)
        const stationToSave = { ...station, songs: updatedSongsArr }
        updateStation(stationToSave)
    }

    function onEdit() {
        if (!isOwnedByUser) return
        console.log('onEdit from Station Details')
        setIsModalOpen(true)
    }

    if (isLoading) return <Loader />
    if (!station) return <div className="station-details">No station to display</div>

    const isEmptyStation = station.songs.length === 0
    const isOwnedByUser = station.createdBy.id === loggedinUser._id
    const isLikedByUser = station.likedByUsers.includes(loggedinUser._id)
    const stationMeta = {
        isOwnedByUser,
        userId: loggedinUser._id,
        isLikedByUser,
        stationActionsBar: {
            'showPlay': station.type === 'playlist' && !isEmptyStation,
            'showRemoveFromLibrary': !isOwnedByUser && isLikedByUser,
            'showAddToLibrary': !isOwnedByUser && !isLikedByUser,
            'showMore': !station.isLikedSongs,
            'songsDisplay': loggedinUser.songsDisplay || 'list'
        }
    }

    return (isLoading)
        ? <Loader />
        : <div className="station-details">
            <HeaderFixer
                header={renderHeader(station)}
                className="padded-top-rounded-box"
                bgColor={bgColor.current}
                showFromY={150}
            >
                <StationDetailsHeader
                    station={station}
                    bgColor={bgColor.current}
                    onEdit={onEdit}
                    onEditStation={() => setIsModalOpen(true)}

                />

                <div className="secondary-background" style={{ backgroundColor: bgColor.current }}></div>

                <StationDetailsActions
                    station={station}
                    stationMeta={stationMeta}
                />

                {(station.songs.length > 0) && <SongList
                    station={station}
                    likedSongsIds={loggedinUser.likedSongsIds}
                    onRemoveSong={onRemoveSong}
                    type="table"
                />}

                {isOwnedByUser && <AddSongs />}

                <Footer />
            </HeaderFixer>

            {isModalOpen &&
                <Modal closeModal={() => setIsModalOpen(false)} >
                    <EditStation station={station} onCloseEdit={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
}

function renderHeader(station) {
    return (
        <div className="flex-regular-gap">
            {station &&
                <>
                    <PlayButton
                        type={'stationDetailsSmall'}
                        stationId={station._id}
                        stationName={station.name}
                        song={station.songs[0]}
                    />
                    <div className="title-medium">{station.name}</div>
                </>
            }
        </div>
    )
}