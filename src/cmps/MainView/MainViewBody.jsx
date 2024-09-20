import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'
import { stationService } from '../../services/station/station.service.remote'

import { Footer } from '../Footer'
import { StationSection } from '../StationSection'
import { StationList } from '../StationList'


export function MainViewBody({ onSetBgColor }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [stationsMain, setStationsMain] = useState([])

    const [topMix, setTopMix] = useState([])
    const [madeForYou, setMadeForYou] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {

        if (!loggedinUser) {
            setTopMix([])
            setStationsMain([])
            return
        }
        if (!stations) return
        loadCollections()

    }, [stations, loggedinUser])

    async function loadCollections() {
        const numOfStations = (stations.length < 9) ? stations.length : 9
        const myLibrary = stations.filter(station =>
            (station.createdBy.id === loggedinUser._id) ||
            (station.likedByUsers.includes(loggedinUser._id))
        )
        const mainStations = utilService.getRandomItems(myLibrary, numOfStations)
        setStationsMain(mainStations)

        const topMixStations = await stationService.getTopMixes()
        setTopMix(topMixStations)
        const madeForYouStations = await stationService.getMadeForYou()
        setMadeForYou(madeForYouStations)
        const recentlyPlayedStations = await stationService.getRecentlyPlayed()
        setRecentlyPlayed(recentlyPlayedStations)
    }

    return (
        <div className="main-view-body">
            <StationList
                stations={stationsMain}
                className="stations-top"
                previewStyle="minimal"
                onSetBgColor={onSetBgColor}
            />

            {(topMix.length > 0) && <StationSection
                titleTxt="Top Mix Collections"
                stations={topMix}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />}
            {(madeForYou.length > 0) && <StationSection
                titleTxt="Made For You"
                stations={madeForYou}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />}
            {(recentlyPlayed.length > 0) && <StationSection
                titleTxt="Recently Played"
                stations={recentlyPlayed}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />}

            <Footer />
        </div>
    )
}