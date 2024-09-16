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

    const [likedSongsStation, setLikedSongsStation] = useState([])
    const [myStations, setMyStations] = useState([])



    useEffect(() => {
        if (!stations) return

        const likedStation = stations.find(station => station.isPinned)
        setLikedSongsStation(likedStation)

        const myStationsArr = stations.filter(station => station.createdBy.id === loggedinUser._id)
        setMyStations(myStationsArr)

    }, [stations])


    useEffect(() => {
        loadResults(txt)
    }, [])

    async function loadResults(value) {
        setIsLoading(true)
        try {
            const res = await spotifyService.search(value)
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

            {songs.length > 0 && <TopResult song={songs[0]} />}

            {songs.length > 0 && <SongListSearchPage
                songs={songs}
                myStations={myStations}
                likedSongsStation={likedSongsStation}
            />}

            {artists.length > 0 && <ArtistList artists={artists} />}
            {albums.length > 0 && <GeneralList listItems={albums} type="album" />}
            {playlists.length > 0 && <GeneralList listItems={playlists} type="playlist" />}


        </div>

}
