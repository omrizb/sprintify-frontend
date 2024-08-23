import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader.jsx'
import { StationDetailsActions } from '../cmps/StationDetails/StationDetailsActions.jsx'
import { StationDetailsPreview } from '../cmps/StationDetails/StationDetailsPreview.jsx'
import { SongList } from '../cmps/StationDetails/SongList'
import { RecommendationsList } from '../cmps/RecommendationsList'
import { Footer } from '../cmps/Footer.jsx'

export function StationDetails() {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const station = useSelector(storeState => storeState.stationModule.station)

    const stationMeta = {
        type: station.type,
        isLikedSongs: station.isLikedSongs,
        isEmptyStation: station.songs.length === 0,
        isOwnedByUser: station.createdBy.id === loggedinUser._id
    }

    const { stationId } = useParams()

    return (
        <div className="station-details">
            <StationDetailsHeader stationMeta={stationMeta} />
            <StationDetailsActions stationMeta={stationMeta} />
            <StationDetailsPreview stationMeta={stationMeta} />
            <SongList stationMeta={stationMeta} songs={station.songs} />
            <RecommendationsList stationMeta={stationMeta} />
            <Footer />
        </div>
    )
}