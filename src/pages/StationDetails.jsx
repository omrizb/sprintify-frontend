import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationMoreDetails } from '../cmps/StationDetails/StationMoreDetails.jsx'
import { SongList } from '../cmps/StationDetails/SongList.jsx'
import { Footer } from '../cmps/Footer.jsx'

import { loadStation } from '../store/actions/station.actions.js'



export function StationDetails() {

    const { id } = useParams()

    const station = useSelector(storeState => storeState.stationModule.station)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    const [viewMode, setViewMode] = useState('list') // Default view mode

    //stationMeta
    const isEmptyStation = station.songs.length === 0
    const isOwnedByUser = station.createdBy.id === loggedinUser._id
    //station-header
    const showSongCountTxt = station.type === 'playlist' && !isEmptyStation
    const showDurationTxt = station.type === 'playlist' && !isEmptyStation && !station.isLikedSongs
    const songCountTxt = formatSongCountTxt()
    const durationTxt = formatDurationTxt()

    useEffect(() => {
        loadStation(id)
    }, [id])


    const stationMeta = {
        isEmptyStation: isEmptyStation,
        isOwnedByUser: isOwnedByUser,
        stationActionsBar: {
            'showPlay': station.type === 'playlist' && !isEmptyStation,
            'showAddRemove': station.type === 'playlist' && !isOwnedByUser,
            'showFollowUnfollow': station.type === 'podcast',
            'showView': station.type === 'playlist'
        }
    }


    //station-header
    function formatSongCountTxt() {
        if (!showSongCountTxt) return ''
        const songCount = station.songs.length
        return songCount > 1 ? ` • ${songCount} songs` : ` • ${songCount} song`
    }

    function formatDurationTxt() {
        if (!showDurationTxt) return ''
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `,${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }


    return (
        <div className="station-details">
            <StationDetailsHeader
                station={station}
                songCountTxt={songCountTxt}
                durationTxt={durationTxt}
            />
            <StationDetailsActions stationMeta={stationMeta} />

            <SongList songs={station.songs} />

            <Footer />
        </div>
    )
}