import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { updateStation, loadStation } from '../store/actions/station.actions.js'
import { colorUtilService } from '../services/color.util.service.js'

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
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bgColor, setBgColor] = useState()

    const [likedSongsStation, setLikedSongsStation] = useState([])
    const [myStations, setMyStations] = useState([])

    useEffect(() => {
        if (!stations) return
        const likedStation = stations.find(station => station.isPinned)
        setLikedSongsStation(likedStation)
        const myStationsArr = stations.filter(station => station.createdBy.id === loggedinUser._id)
        setMyStations(myStationsArr)
    }, [stations])

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

    function onRemoveSong(spotifyId) {
        const updatedSongsArr = station.songs.filter(song => song.spotifyId !== spotifyId)
        const stationToSave = { ...station, songs: updatedSongsArr }
        updateStation(stationToSave)
    }

    function onEdit() {
        if (!isOwnedByUser) return
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
                bgColor={bgColor && colorUtilService.adjustBrightness(bgColor, 0.4)}
                showFromY={150}
            >
                <StationDetailsHeader
                    station={station}
                    onSetBgColor={setBgColor}
                    onEdit={onEdit}
                    onEditStation={() => setIsModalOpen(true)}

                />

                <div className="secondary-background" style={{ backgroundColor: bgColor }}></div>

                <StationDetailsActions
                    station={station}
                    stationMeta={stationMeta}
                />

                {(station.songs.length > 0) && <SongList
                    station={station}
                    isOwnedByUser={isOwnedByUser}
                    likedSongsStation={likedSongsStation}
                    myStations={myStations}
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