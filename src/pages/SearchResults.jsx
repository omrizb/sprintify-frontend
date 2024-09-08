import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


import { SongPreview } from '../cmps/SongDetails/SongPreview.jsx'
import { spotifyService } from '../services/spotify.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { MiniSongPreview } from '../cmps/SongDetails/MiniSongPreview.jsx'
import { SongList } from '../cmps/SongDetails/SongList.jsx'

export function SearchResults() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const playerSpotifyId = useSelector(store => store.playerModule.player.song.spotifyId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    const [isLoading, setIsLoading] = useState(true)
    const { txt } = useParams()

    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])

    const [likedSongsStation, setLikedSongsStation] = useState([])
    const [myStations, setMyStations] = useState([])

    const [hoveredSpotifyId, setHoveredSpotifyId] = useState(null)
    const [selectedSpotifyId, setSelectedSpotifyId] = useState(null)

    const isSearchOrigin = true

    function onSetSelectedSpotifyId(spotifyId) {
        setSelectedSpotifyId(spotifyId)
    }

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
            // const loadedSongs = await youtubeService.getVideos(value)
            const res = await spotifyService.search(value)
            setSongs(res.songs)
            setArtists(res.artists)
            setAlbums(res.albums)
            setPlaylists(res.stations)

        } catch (err) {
            console.error(`Couldn't load videos`, err)
        } finally {
            setIsLoading(false)

        }
    }


    return (isLoading)
        ? <Loader />
        :
        <div className="search-results">
            <h2>Songs</h2>
            <ul className="list-body">
                {songs.map(song => {
                    const selectedSongClass = (song.spotifyId === selectedSpotifyId) ? 'selected' : ''
                    return <li
                        key={song.spotifyId}
                        className={`song-list-item ${selectedSongClass}`}
                        onMouseEnter={() => setHoveredSpotifyId(song.spotifyId)}
                        onMouseLeave={() => setHoveredSpotifyId('')}
                        onClick={() => onSetSelectedSpotifyId(song.spotifyId)}
                    >
                        <SongPreview
                            isSearchOrigin={isSearchOrigin}
                            type={'table'}
                            song={song}
                            isOwnedByUser={false}
                            myStations={myStations}
                            likedSongsStation={likedSongsStation}
                            hoveredSpotifyId={hoveredSpotifyId}
                            selectedSpotifyId={selectedSpotifyId}
                        />
                    </li>
                })}
            </ul>

        </div>


}
