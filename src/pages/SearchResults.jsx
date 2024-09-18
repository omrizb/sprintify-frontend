import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


import { spotifyService } from '../services/spotify.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { SongListSearchPage } from '../cmps/SearchResultsPageCmps/SongListSearchPage.jsx'
import { TopResult } from '../cmps/SearchResultsPageCmps/TopResult.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ArtistList } from '../cmps/Artists/ArtistList.jsx'
import { GeneralList } from '../cmps/General list & preview/GeneralList.jsx'
import { loadStation } from '../store/actions/station.actions.js'
import { stationService } from '../services/station/station.service.remote.js'

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
    }, [])

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

            <div className="song-section">
                {(searchWord !== 'chill') && songs.length > 0 && <TopResult item={songs[0]} type="song" />}
                {(searchWord === 'chill') && <TopResult item={plantedPlaylist} type="station" />}

                {songs.length > 0 && <SongListSearchPage
                    songs={songs}
                    myStations={myStations}
                    likedSongsStation={likedSongsStation}
                />}
            </div>

            {artists.length > 0 && <ArtistList artists={artists} />}
            {albums.length > 0 && <GeneralList listItems={albums} type="album" />}
            {playlists.length > 0 && <GeneralList listItems={playlists} type="playlist" />}


        </div>

}
