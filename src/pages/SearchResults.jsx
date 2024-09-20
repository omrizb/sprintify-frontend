import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { spotifyService } from '../services/spotify.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { SongListSearchPage } from '../cmps/SearchResultsPageCmps/SongListSearchPage.jsx'
import { TopResult } from '../cmps/SearchResultsPageCmps/TopResult.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { GeneralList } from '../cmps/General list & preview/GeneralList.jsx'
import { stationService } from '../services/station/station.service.remote.js'
import { HeaderFixer } from '../cmps/HeaderFixer.jsx'
import { MainViewHeader } from '../cmps/MainView/MainViewHeader.jsx'
import { Footer } from '../cmps/Footer.jsx'

export function SearchResults() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    const [isLoading, setIsLoading] = useState(true)
    const { txt } = useParams()

    const [results, setResults] = useState([])
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])

    const [searchWord, setSearchWord] = useState('')
    const [plantedPlaylist, setPlantedPlaylist] = useState({})

    const [likedSongsStation, setLikedSongsStation] = useState([])
    const [myStations, setMyStations] = useState([])

    useEffect(() => {
        if (!stations) return

        const likedStation = stations.find(station => station.isPinned)
        setLikedSongsStation(likedStation)

        const myStationsArr = stations.filter(station => station.createdBy.id === loggedinUser._id)
        setMyStations(myStationsArr)

        getPlantedStation()

    }, [stations])

    async function getPlantedStation() {
        const plantedStation = await stationService.getById('66e6425a91bf0b67a1c08139')
        setPlantedPlaylist(plantedStation)
    }

    useEffect(() => {
        loadResults(txt)
    }, [txt])

    async function loadResults(value) {
        setIsLoading(true)
        try {
            const res = await spotifyService.search(value)
            setSearchWord(value)
            setSongs(res.songs)
            setArtists(res.artists)
            setAlbums(res.albums)
            setPlaylists(res.stations)

        } catch (err) {
            console.error(`Couldn't load videos`, err)
            showErrorMsg('YouTube is blocking us')
        } finally {
            setIsLoading(false)

        }
    }

    return (isLoading)
        ? <Loader />
        :
        <div className="search-results">

            <HeaderFixer
                header={<MainViewHeader />}
                className="top-rounded-box"
                bgColor="#626262"
            >
                <div className="empty-header" style={{ height: '64px' }} />
                <div className="song-section">
                    {(searchWord !== 'chill') && songs.length > 0 && <TopResult item={songs[0]} type="song" />}
                    {(searchWord === 'chill') && <TopResult item={plantedPlaylist} type="station" />}

                    {songs.length > 0 && <SongListSearchPage
                        songs={songs}
                        myStations={myStations}
                        likedSongsStation={likedSongsStation}
                    />}
                </div>

                <GeneralList title="Artists" listItems={artists} type="artist" />
                <GeneralList title="Albums" listItems={albums} type="album" />
                <GeneralList title="Playlists" listItems={playlists.slice(0, 6)} type="playlist" />
                <GeneralList title="Most popular" listItems={playlists.slice(6, 12)} type="playlist" />
                <GeneralList title="Made for you" listItems={playlists.slice(12, 18)} type="playlist" />
                <GeneralList title="Discover new" listItems={playlists.slice(18, 24)} type="playlist" />

                <Footer />

            </HeaderFixer>
        </div>

}
