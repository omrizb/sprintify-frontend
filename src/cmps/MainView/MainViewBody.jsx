import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { StationList } from '../StationList'
import { stationService } from '../../services/station/station.service.local'
import { Footer } from '../Footer'
import { StationSection } from '../StationSection'


export function MainViewBody({ onSetBgColor }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [stationsMain, setStationsMain] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [topMixes, setTopMixes] = useState([])
    const [madeForYou, setMadeForYou] = useState([])

    useEffect(() => {
        if (!stations) return
        loadMainViewCollections()
    }, [stations])

    async function loadMainViewCollections() {
        try {
            const numOfMainStations = stations.length >= 7 ? 6 : stations.length
            setStationsMain(utilService.getRandomItems(
                stations.filter(station => !station.isPinned),
                numOfMainStations
            ))

            const recentlyPlayedList = await stationService.getRecentlyPlayed('bob', 4)
            const topMixesList = await stationService.getTopMixes('bob', 4)
            const madeForYouList = await stationService.getMadeForYou('bob', 6)

            setRecentlyPlayed(recentlyPlayedList)
            setTopMixes(topMixesList)
            setMadeForYou(madeForYouList)
        } catch (err) {
            console.log('MainBody loadMainViewCollections error:', err)
        }
    }

    return (
        <div className="main-view-body">
            <StationList
                stations={stationsMain}
                className="stations-top"
                previewStyle="minimal"
                onSetBgColor={onSetBgColor}
            />

            <StationSection
                titleTxt="Recently Played"
                stations={recentlyPlayed}
                ListClassName="card-stations recently-played"
                previewStyle="card"
            />

            <StationSection
                titleTxt="Your Top Mixes"
                stations={topMixes}
                ListClassName="card-stations top-mixed"
                previewStyle="card"
            />

            <StationSection
                titleTxt="Made For You"
                stations={madeForYou}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />

            <Footer />
        </div>
    )
}