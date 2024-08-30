import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { updateStation, loadStation } from '../store/actions/station.actions'
import { SvgIcon } from '../cmps/SvgIcon'

import { utilService } from '../services/util.service'
import { SongPreview } from '../cmps/SongDetails/SongPreview.jsx'

export function AddSongs({ value, style = "search" }) {
    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const debouncedLoadSongs = utilService.debounce(loadSongs, 1000)

    useEffect(() => {
        loadStation(id)
    }, [station])

    useEffect(() => {
        if (value) {
            loadSongs(value)
        }
    }, [value])

    function handleChange(ev) {
        const value = ev.target.value
        debouncedLoadSongs(value)
    }

    async function loadSongs(value) {
        if (!value) return
        try {
            const loadedSongs = await youtubeService.getVideos(value, 10)
            setSongs(loadedSongs)

        } catch (err) {
            console.error(`Couldn't load songs`, err)
        }
    }

    function onAddSong(song) {
        song.duration = { hours: 0, minutes: 6, seconds: 0 }
        const stationToSave = { ...station, songs: [...station.songs, song] }
        update(stationToSave)
    }

    async function update(stationToSave) {
        try {
            const updatedStation = await updateStation(stationToSave)
            console.log(updatedStation)
        } catch (err) {
            console.error('Cannot add a station')
        }
    }

    return (
        <div className="add-songs">

            {style === 'search' && (
                <>
                    <h1>Let's find something for your playlist</h1>

                    <div className="global-nav text-container">
                        <div className="search icon"><SvgIcon iconName={"search"} /> </div>
                        <input
                            type="text"
                            name="txt"
                            placeholder="Search for songs?"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </>
            )}

            {(style === 'recommended') && (
                <>
                    <h1>Recommended</h1>
                    <h2>Based on what's in this playlist</h2>
                </>
            )}

            {(!songs) && <h2>Youtube is blocking us!!</h2>}
            {(songs) &&
                <ul>
                    {songs.map((song, index) =>
                        <li key={song.songId} >
                            <SongPreview song={song} index={index + 1} style={style} />
                        </li>)
                    }
                </ul>
            }

        </div>
    )
}