import { useSelector } from 'react-redux'
import { useState } from 'react'

import { updateStation } from '../store/actions/station.actions'
import { SvgIcon } from '../cmps/SvgIcon'

import { utilService } from '../services/util.service'
import { spotifyService } from '../services/spotify.service'
import { MiniSongList } from './SongDetails/MiniSongList'
import { youtubeService } from '../services/youtube.service'
import { showSuccessMsg } from '../services/event-bus.service'


export function AddSongs() {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const [searchText, setSearchText] = useState('')

    const debouncedLoadSongs = utilService.debounce(loadSongs, 1000)

    function handleChange(ev) {
        setSearchText(ev.target.value)
        debouncedLoadSongs(ev.target.value)
    }

    async function loadSongs(value) {
        if (!value) return
        try {
            const results = await spotifyService.search(value, 10)
            const loadedSongs = results.songs
            console.log(loadedSongs)

            setSongs(loadedSongs)

        } catch (err) {
            console.log(`Couldn't load songs`, err)
        }
    }

    async function onAddSong(newSong) {
        const isInStation = station.songs.some(song => song.spotifyId === newSong.spotifyId)
        if (isInStation) {
            showSuccessMsg(`Already included in ${station.name}`)
            return
        }
        const ytSong = await youtubeService.getTopVideo(`song: ${newSong.songName} by ${newSong.artist.name}`)
        newSong.ytId = ytSong.songId
        const updatedStation = { ...station, songs: [...station.songs, newSong] }
        updateStation(updatedStation)
    }




    return (
        <div className="add-songs">

            <h1>Let's find something for your playlist</h1>

            <div className="search-box">
                <div className="search icon"><SvgIcon iconName={"search"} /> </div>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search for songs?"
                    value={searchText}
                    onChange={handleChange}
                    required
                />
                <div className="clear-search"
                    onClick={() => {
                        setSearchText('')
                        setSongs([])
                    }}>X</div>
            </div>


            {songs &&
                <MiniSongList songs={songs} onClickAdd={onAddSong} />}


        </div>
    )
}