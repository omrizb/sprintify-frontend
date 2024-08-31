import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import { removeStation, updateStation, loadStation } from '../store/actions/station.actions.js'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { SongList } from '../cmps/SongDetails/SongList.jsx'
import { Footer } from '../cmps/Footer.jsx'
import { AddSongs } from '../cmps/AddSongs.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { Modal } from '../cmps/Modal.jsx'
import { HeaderFixer } from '../cmps/HeaderFixer.jsx'
import { PlayButton } from '../cmps/Player/PlayButton.jsx'
import { EditStation } from '../cmps/EditStation.jsx'


export function StationDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

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

    async function onRemoveStation() {
        try {
            await removeStation(station._id)
        } catch (err) {
            console.log('Error: StationDetails, onRemoveStation:', err)
        } finally {
            navigate(`/`)
        }
    }

    function onRemoveSong(songId) {
        const updatedSongsArr = station.songs.filter(song => song.songId !== songId)
        const stationToSave = { ...station, songs: updatedSongsArr }
        update(stationToSave)
    }

    async function update(stationToSave) {
        try {
            const updatedStation = await updateStation(stationToSave)
            // console.log(updatedStation)
        } catch (err) {
            console.log('Cannot add a station')
        }
    }

    function onEdit() {
        if (!isOwnedByUser) return
        console.log('onEdit from Station Details')
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    if (isLoading) return <Loader />
    if (!station) return <div className="station-details">No station to display</div>

    const isEmptyStation = station.songs.length === 0
    const isOwnedByUser = station.createdBy.id === loggedinUser._id
    const isLikedByUser = station.likedByUsers.includes(loggedinUser._id)
    const stationMeta = {
        stationActionsBar: {
            'showPlay': station.type === 'playlist' && !isEmptyStation,
            'showAddToLibrary': !isOwnedByUser && !isLikedByUser,
            'showRemoveFromLibrary': !isOwnedByUser && isLikedByUser,
            'showFollowUnfollow': station.type === 'podcast',
            'showMore': !station.isLikedSongs,
            'songsDisplay': loggedinUser.songsDisplay || 'list'
        }
    }

    return (isLoading)
        ? <Loader />
        : <div
            className="station-details"
        // style={{ background: `linear-gradient(to bottom, ${bgColor.current} 0%, #121212 30%, #121212 100%)` }}
        >
            <HeaderFixer
                header={renderHeader(station)}
                className="padded-top-rounded-box"
                bgColor={bgColor.current}
                showFromY={150}
            >
                <StationDetailsHeader
                    key={station}
                    station={station}
                    bgColor={bgColor.current}
                    onEdit={onEdit}
                    onEditStation = {() => setIsModalOpen(true)}

                />

                <div className="secondary-background" style={{ backgroundColor: bgColor.current }}></div>

                <StationDetailsActions
                    key={station}
                    station={station}
                    stationMeta={stationMeta}
                    onRemoveStation={onRemoveStation}
                />

                <SongList
                    station={station}
                    songs={station.songs}
                    onRemoveSong={onRemoveSong}
                />

                {isOwnedByUser &&
                    <AddSongs
                        value={isEmptyStation ? "" : station.songs[0].artist}
                        style={isEmptyStation ? "search" : "recommended"}
                        viewArea={isEmptyStation ? "search" : 'myPlaylist'}
                    />}


                <Footer />
            </HeaderFixer>

            {isModalOpen &&
                <Modal closeModal={onCloseModal} >
                    <EditStation station={station} onCloseEdit ={onCloseModal} />
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
                        type={'stationDetails'}
                        stationId={station._id}
                        stationName={station.name}
                        songId={station.songs[0]?.songId}
                        songName={station.songs[0]?.songName}
                    />
                    <div className="title-medium">{station.name}</div>
                </>
            }
        </div>
    )
}