import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { utilService } from '../../services/util.service'

import { stationService } from '../../services/station/station.service.remote'
import { Footer } from '../Footer'
import { StationSection } from '../StationSection'
import { StationListMainView } from './StationListMainView'
import { addSprintifyStation, addStation } from '../../store/actions/station.actions'


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

        const stationsForYou = createMadeForYou()
        // setMadeForYou(stationsForYou)
    }



    async function createMadeForYou() {
        const stationCovers = [
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7c774b7b4da216c33782c193/1/en/default',
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebee0bf92f5269431b705722b2/2/en/default',
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7bff9168ecfa90aca537adee/3/en/default',
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb59c9bdf20c6eb811f9aa894/4/en/default',
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebed7d082db2925fe99a9b9487/5/en/default',
            'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb92883b0e094a36d2f43ad284/6/en/default',
        ]
        const stationsForYou = []
        const savedStations = []

        for (let i = 0; i < 5; i++) {
            stationsForYou[i] = stationService.getEmptyStation()
            stationsForYou[i].name = `Daily Mix ${i + 1}`
            stationsForYou[i].createdBy = { id: 'BBBB', fullName: 'Sprintify', imgUrl: '' }
            stationsForYou[i].stationImgUrl = stationCovers[i]
            stationsForYou[i].isOwnedByUser = false

            const songsArrs = stations.map(station => {

                const numOfSongs = (station.songs.length < 3) ? station.songs.length : 3
                const songs = utilService.getRandomItems(station.songs, numOfSongs)
                return songs
            })
            stationsForYou[i].songs = songsArrs.flat()
            savedStations[i] = await stationService.save(stationsForYou[i])
        }

        console.log(savedStations)

        setMadeForYou(savedStations)
        return savedStations
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