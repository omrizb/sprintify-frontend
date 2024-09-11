import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { Footer } from '../Footer'
import { StationSection } from '../StationSection'
import { StationListMainView } from './StationListMainView'
import madeForYouCollections from '../../services/station/station.service.remote'
import { StationList } from '../StationList'


export function MainViewBody({ onSetBgColor }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [stationsMain, setStationsMain] = useState([])

    const [madeForYou, setMadeForYou] = useState([])

    useEffect(() => {

        if (!loggedinUser) {
            setMadeForYou([])
            setStationsMain([])
            return
        }
        if (!stations) return
        loadCollections()

    }, [stations, loggedinUser])

    function loadCollections() {
        const numOfStations = (stations.length < 9) ? stations.length : 8
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
            <StationList
                stations={stationsMain}
                className="stations-top"
                previewStyle="minimal"
                onSetBgColor={onSetBgColor}
            />

            {(madeForYou.length > 0) && <StationSection
                titleTxt="Made For You"
                stations={madeForYou}
                ListClassName="card-stations made-for-you"
                previewStyle="card"
            />}


            <Footer />
        </div>
    )
}