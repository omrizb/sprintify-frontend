import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { Footer } from '../Footer'
import { StationSection } from '../StationSection'
import { StationListMainView } from './StationListMainView'
import madeForYouCollections from '../../services/station/station.service.remote'


export function MainViewBody({ onSetBgColor }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [stationsMain, setStationsMain] = useState([])

    const [madeForYou, setMadeForYou] = useState([])

    useEffect(() => {
        if (!stations) return
        loadCollections()

    }, [stations])

    function loadCollections() {
        const numOfStations = (stations.length < 7) ? stations.length : 6
        const myLibrary = stations.filter(station =>
            (station.createdBy.id === loggedinUser._id) ||
            (station.likedByUsers.includes(loggedinUser._id))
        )
        const mainStations = utilService.getRandomItems(myLibrary, numOfStations)

        setStationsMain(mainStations)
        setMadeForYou(madeForYouCollections)
    }



    return (
        <div className="main-view-body">
            <StationListMainView
                stations={stationsMain}
                className="stations-top"
                previewStyle="minimal"
                onSetBgColor={onSetBgColor}
            />

            <StationSection
                titleTxt="Made For You"
                stations={madeForYou}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />
            <StationSection
                titleTxt=""
                stations={madeForYou.slice(3)}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />

            {/* <StationSection
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
            /> */}


            <Footer />
        </div>
    )
}