import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationDetailsPreview } from '../cmps/StationDetails/StationDetailsPreview.jsx'
import { SongList } from '../cmps/StationDetails/SongList'
import { RecommendationsList } from '../cmps/RecommendationsList'
import { Footer } from '../cmps/Footer.jsx'

export function StationDetails() {
    const { stationId } = useParams()
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const station = useSelector(storeState => storeState.stationModule.station)

    useEffect(() => {
        loadStation(stationId)
    }, [stationId])


    const stationMeta = {
        type: station.type,
        isLikedSongs: station.isLikedSongs,
        isEmptyStation: station.songs.length === 0,
        isOwnedByUser: station.createdBy.id === loggedinUser._id
    }

    function songCountTxt() {
        if (!showSongCountTxt) return ''
        const songCount = station.songs.length
        return songCount > 1 ? `${songCount} songs` : `${songCount} song`
    }


    function durationTxt() {
        if (!showDurationTxt) return ''
        const totalDuration = station.songs.reduce((acc, song) => {
            return acc + song.duration.hours * 3600 + song.duration.minutes * 60 + song.duration.seconds
        }, 0)

        const hours = Math.floor(totalDuration / 3600)
        const minutes = Math.floor((totalDuration % 3600) / 60)
        const seconds = totalDuration % 60

        return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}`
    }



    return (
        <div className="station-details">
            <StationDetailsHeader stationMeta={stationMeta} songCountTxt={songCountTxt} durationTxt={durationTxt} />
            <StationDetailsActions stationMeta={stationMeta} />
            <StationDetailsPreview stationMeta={stationMeta} />
            <SongList stationMeta={stationMeta} songs={station.songs} />
            <RecommendationsList stationMeta={stationMeta} />
            <Footer />
        </div>
    )
}
