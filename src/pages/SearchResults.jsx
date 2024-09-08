import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


import { spotifyService } from '../services/spotify.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { SongListSearchPage } from '../cmps/SearchResultsPageCmps/SongListSearchPage.jsx'
import { TopResult } from '../cmps/SearchResultsPageCmps/TopResult.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

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
            const ytSongs = []

            for (let i = 0; i < res.songs.length; i++) {
                ytSongs[i] = await youtubeService.getTopVideo(`song: ${res.songs[i].songName} by ${res.songs[i].artist.name}`)
                res.songs[i].ytId = ytSongs[i].songId
            }

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

            {(!songs[0].ytId) && <div>
                <h2>YouTube is blocking us ☹️😟😭</h2>
                <h2>Cannot play songs</h2>
            </div>}


            {songs.length > 0 && <TopResult song={songs[0]} />}

            {songs.length > 0 && <SongListSearchPage
                songs={songs}
                myStations={myStations}
                likedSongsStation={likedSongsStation}
            />}


        </div>

}
