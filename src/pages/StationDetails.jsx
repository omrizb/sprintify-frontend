import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { removeStation, updateStation } from '../store/actions/station.actions.js'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationMoreDetails } from '../cmps/StationDetails/StationMoreDetails.jsx'
import { SongList } from '../cmps/StationDetails/SongList.jsx'
import { Footer } from '../cmps/Footer.jsx'
import { utilService } from '../services/util.service.js'

import { loadStation } from '../store/actions/station.actions.js'
import { AddSongs } from '../cmps/AddSongs.jsx'


export function StationDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const station = useSelector(storeState => storeState.stationModule.station)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    const [viewMode, setViewMode] = useState('list') // Default view mode

    const isEmptyStation = station.songs.length === 0
    // const isOwnedByUser = station.createdBy.id === loggedinUser._id
    const isOwnedByUser = station.createdBy.id === 'AAAA'
    
    const [bgColor, setBgColor] = useState(utilService.getRandomColor())

    useEffect(() => {
        setBgColor(utilService.getRandomColor())
        loadStation(id)
    }, [id])


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

    async function onRemoveStation(){
        try {
            await removeStation(station._id)            
        } catch (err) {
            console.log('err from station details page', err)
        } finally {
            navigate(`/`)
        }
    }

  

    function onRemoveSong(songId){
        const updatedSongsArr = station.songs.filter(song => song.songId !== songId)
        const stationToSave = {...station, songs: updatedSongsArr }
        update(stationToSave)
        console.log('remove')
    }

    async function update(stationToSave){
        try {
            const updatedStation = await updateStation(stationToSave)
            console.log(updatedStation)
        } catch (err) {
            console.log('Cannot add a station')
        } 
    }


    return (
        <div className="station-details"
            style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, #121212 30%, #121212 100%)` }}
        >
            <StationDetailsHeader station={station}/>

            <StationDetailsActions
                station={station}
                stationMeta={stationMeta}
                onRemoveStation={onRemoveStation}
            />

            <SongList station={station} songs={station.songs} onRemoveSong={onRemoveSong} />

            {isOwnedByUser && <AddSongs station={station} /> }

            <Footer />
        </div>
    )
}