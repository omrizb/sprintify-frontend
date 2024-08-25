import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationMoreDetails } from '../cmps/StationDetails/StationMoreDetails.jsx'
import { SongList } from '../cmps/StationDetails/SongList.jsx'
import { SongFilter } from '../cmps/StationDetails/SongFilter.jsx'
import { RecommendationsList } from '../cmps/RecommendationsList.jsx'
import { Footer } from '../cmps/Footer.jsx'

import { loadStation, addSongToStation, removeSongFromStation } from '../store/actions/station.actions.js'
// import { loadSongs } from '../store/actions/song.actions'

// import { songService } from '../services/song/'
// import { userService } from '../services/user/index.js' not in use

import { eventBus, VIEW_MODE_CHANGE, VIEW_MODE_GET } from '../services/event-bus.service'


export function StationDetails() {

    const { stationId } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)

    // const [filterBy, setFilterBy] = useState(songService.getDefaultFilter())
    // const songs = useSelector(storeState => storeState.songModule.songs)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    //   const loggedinUser = userService.getLoggedinUser() what is better?

    const dispatch = useDispatch()

    //stationMeta
    const isEmptyStation = station.songs.length === 0
    const isOwnedByUser = station.createdBy.id === loggedinUser._id
    //station-header
    const showSongCountTxt = station.type === 'playlist' && !isEmptyStation
    const showDurationTxt = station.type === 'playlist' && !station.isLikedSongs
    const songCountTxt = formatSongCountTxt()
    const durationTxt = formatDurationTxt()

    useEffect(() => {
        loadStation(stationId)
    }, [stationId])

    useEffect(() => {
        const unsubscribe = eventBus.on(VIEW_MODE_CHANGE, (newViewMode) => {
            setViewMode(newViewMode);
        })

        // Request the current view mode when the component mounts
        eventBus.emit(VIEW_MODE_GET, (mode) => setViewMode(mode))

        return () => unsubscribe();
    }, [])
    const [viewMode, setViewMode] = useState('list') // Default view mode


    const stationMeta = {
        isEmptyStation: isEmptyStation,
        isOwnedByUser: isOwnedByUser,

        //station-action-bar
        showPlay: station.type === 'playlist' && !isEmptyStation,
        showAddRemove: station.type === 'playlist' && !isOwnedByUser,
        // showAdd: station.type === 'playlist' && !isOwnedByUser,//need to fix
        // showRemove: station.type === 'playlist' && !isOwnedByUser,//need to fix
        showFollowUnfollow: station.type === 'podcast',
        // showFollow: station.type === 'podcast',//need to fix
        // showUnfollow: station.type === 'podcast',//need to fix
        showMore: station.type === 'playlist' && !station.isLikedSongs,
        showViewList: station.type === 'playlist' && viewMode === 'List',
        showViewCompact: station.type === 'playlist' && viewMode === 'Compact',
    }


    //station-header
    function formatSongCountTxt() {
        if (!showSongCountTxt) return ''
        const songCount = station.songs.length
        return songCount > 1 ? `${songCount} songs` : `${songCount} song`
    }

    function formatDurationTxt() {
        if (!showDurationTxt) return ''
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }







    // useEffect(() => {
    //     loadSongs(filterBy)
    // }, [filterBy])


    // async function onAddSongToStation(stationId) {
    //     try {
    //         await addSongToStation(stationId, songId)
    //         showSuccessMsg(`Add to ${station.name}`)
    //     } catch (err) {
    //         showErrorMsg(`Cannot add to ${station.name}`)
    //     }
    // }

    // async function onRemoveSongFromStation(songId) {
    //     try {
    //         await removeSongFromStation(songId)
    //         showSuccessMsg(`Removed from ${station.name}`)
    //     } catch (err) {
    //         showErrorMsg(`Cannot remove from ${station.name}`)
    //     }
    // }

    return (
        <div className="station-details">
            <StationDetailsHeader
                station={station}
                showSongCountTxt={showSongCountTxt}
                songCountTxt={songCountTxt}
                showDurationTxt={showDurationTxt}
                durationTxt={durationTxt}
            />
            <StationDetailsActions stationMeta={stationMeta} />
            {stationMeta.type === 'podcast' && <StationMoreDetails station={station} />}
            <section className="song-index">
                {isEmptyStation && <>(
                    {/* <SongFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
                    )</>}
                {!isEmptyStation && <>(
                    <SongList
                        songs={station.songs}
                        viewMode={viewMode}
                    // onRemoveSongFromStation={onRemoveSongFromStation}
                    // onAddSongToStation={onAddSongToStation} 
                    />
                    )</>}
            </section>
            <RecommendationsList stationMeta={stationMeta} /*onAddSongToStation={onAddSongToStation}*/ />
            <Footer />
        </div>
    )
}