import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { removeStation, updateStation, loadStation } from '../store/actions/station.actions.js'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationMoreDetails } from '../cmps/StationDetails/StationMoreDetails.jsx'
import { SongList } from '../cmps/SongDetails/SongList.jsx'
import { Footer } from '../cmps/Footer.jsx'
import { utilService } from '../services/util.service.js'

import { AddSongs } from '../cmps/AddSongs.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { stationService } from '../services/station/station.service.local.js'
import { EditStation } from '../cmps/EditStation.jsx'
import { Modal } from '../cmps/Modal.jsx'


export function StationDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const station = useSelector(storeState => storeState.stationModule.station)
    const [isLoading, setIsLoading] = useState(true)
    const [bgColor, setBgColor] = useState(utilService.getRandomColor())
    const [showEditBox, setShowEditBox] = useState(false)

    useEffect(() => {
        setBgColor(utilService.getRandomColor())
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
        console.log('remove')
    }

    async function update(stationToSave) {
        try {
            const updatedStation = await updateStation(stationToSave)
            console.log(updatedStation)
        } catch (err) {
            console.log('Cannot add a station')
        }
    }

    function onEdit() {
        if (!isOwnedByUser) return
        console.log('onEdit from Station Details')
        setShowEditBox(true)
    }

    function handleCloseEdit() {
        setShowEditBox(false)
    }

    if (isLoading) return <Loader />
    if (!station) return <div className="station-details">No station to display</div>

    const isEmptyStation = station.songs.length === 0
    // const isOwnedByUser = station.createdBy.id === loggedinUser._id
    const isOwnedByUser = station.createdBy.id === 'AAAA'
    const stationMeta = {
        isEmptyStation: isEmptyStation,
        isOwnedByUser: isOwnedByUser,
        stationActionsBar: {
            'showPlay': station.type === 'playlist' && !isEmptyStation,
            'showAddRemove': station.type === 'playlist' && !isOwnedByUser,
            'showFollowUnfollow': station.type === 'podcast',
            'showMore': !station.isLikedSongs,
            'showView': station.type === 'playlist'
        }
    }


    return (isLoading)
        ? <Loader />
        : <div className="station-details"
            style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 30%, #121212 100%)` }}
        >
            <StationDetailsHeader
                station={station}
                onEdit={onEdit}
            />

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

            {/* {showEditBox && <EditStation station = {station} onCloseEdit = {handleCloseEdit} />} */}
            {showEditBox && <Modal children={station} closeModal={handleCloseEdit} editStation={update} />}

            <Footer />
        </div>
}