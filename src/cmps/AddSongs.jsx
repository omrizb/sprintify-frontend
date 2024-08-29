import { useSelector } from 'react-redux'
import {  useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { updateStation, loadStation } from '../store/actions/station.actions'
import { SvgIcon } from '../cmps/SvgIcon'

import { utilService } from '../services/util.service'


export function AddSongs(){
    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const debouncedLoadSongs = utilService.debounce(loadSongs, 1000)

    useEffect(() => {
        loadStation(id)
    }, [station])

    
    function handleChange(ev) {
        const value = ev.target.value
        debouncedLoadSongs(value)
    }

    async function loadSongs(value) {
        if(!value) return
        try {
            const loadedSongs = await youtubeService.getVideos(value, 10)
            setSongs(loadedSongs)
        
        } catch (err) {
            console.log(`Couldn't load songs`, err)
        }
    }

    function onAddSong(song){
        song.duration =  { hours: 0, minutes: 6, seconds: 0 }
        const stationToSave = {...station, songs: [...station.songs, song]}
        update(stationToSave) 
    }

    // function onRemoveSong(songId){
    
    //     const updatedSongsArr = station.songs.filter(song => song.songId !== songId)
    //     const stationToSave = {...station, songs: updatedSongsArr }
    //     update(stationToSave)
    //     console.log('remove')

    // }

    async function update(stationToSave){
        try {
            const updatedStation = await updateStation(stationToSave)
            console.log(updatedStation)
        } catch (err) {
            console.log('Cannot add a station')
        } 
    }

    
    return (
        <div className="add-songs">

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
                    <ul className="" >
                        {songs.map((song) =>
                            <li key={song.songId}  >
                                <div className="list">
                                    <img src={song.imgUrl} alt=""  />
                                    <div className="text">
                                        <div>{song.songName}</div>
                                        <div>{song.artist}</div>
                                    </div>
                                <button onClick={() => onAddSong(song)} className="btn-tinted">Add</button>
                                </div>
                            </li>)
                        }
                    </ul>}
          
        </div> 
    )
}