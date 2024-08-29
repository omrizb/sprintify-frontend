import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { loadStation } from '../store/actions/station.actions'

import { SvgIcon } from '../cmps/SvgIcon'
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { utilService } from '../services/util.service'


export function AddStation(){
    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const debouncedLoadSongs = utilService.debounce(loadSongs, 1000)

    useEffect(() => {
        loadStation(id)
    }, [])

    function handleChange(ev) {
        const value = ev.target.value
        debouncedLoadSongs(value)
    }

    async function loadSongs(value) {
        if(!value) return
        try {
            const loadedSongs = await youtubeService.getVideos(value, 10)
            setSongs(loadedSongs)
            console.log(loadedSongs)

        } catch (err) {
            console.log(`Couldn't load videos`, err)
        }
    }

   
    return (
        <div className="add-station">
            <StationDetailsHeader station={station}  />
            {/* <StationDetailsActions station={station} /> */}
            <h1>Let's find something for your playlist</h1>

            <div className="global-nav text-container">
                    <div className="search icon"><SvgIcon iconName={"search"}    /> </div>
                    <input 
                            type="text" 
                            name="txt"
                            placeholder="Search for songs?"
                            onChange={handleChange}
                            required
                        />
                </div>

                {(!songs) && <h2>Youtube is blocking us!!</h2> }
                {(songs)&&
                    <ul className="song-preview">
                        {songs.map((song) =>
                            <li key={song.songId} >
                                <div className="title-column">
                                    <img src={song.imgUrl} alt=""  />
                                    <div className="text">
                                        <div>{song.songName}</div>
                                        <div>{song.artist}</div>
                                    </div>
                                </div>
                            </li>)
                        }
                    </ul>}
          
        </div> 
    )
}