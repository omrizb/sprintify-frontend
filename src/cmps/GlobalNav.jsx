import { Link } from 'react-router-dom'

import { SvgButton } from "./SvgButton.jsx"
import { SvgIcon } from './SvgIcon'
import { youtubeService } from '../services/youtube.service.js'
import { utilService } from '../services/util.service.js'


export function GlobalNav() {

    const debouncedLoadSongs = utilService.debounce(loadSongs, 1000) 

    async function loadSongs(value) {
        try {
            const songs = await youtubeService.getVideos(value)
            console.log(songs)

        } catch (err) {
            console.log(`Couldn't load videos`, err)
        }
    }

    function handleChange(ev) {
        var value = ev.target.value
        debouncedLoadSongs(value)
        console.log(value)
    }


    return (
        <div className="global-nav">
            
            <div className="spotify"><SvgIcon iconName={"spotify"} /></div>
            <Link to={`/`}>
                <SvgButton btnClass={'btn-tinted home'} svgIcon={'home'} />  
            </Link>
            
            <Link to={`/search`}>
                <div className="text-container">
                    <div className="search icon"><SvgIcon iconName={"search"}    /> </div>
                    <input 
                            type="text" 
                            name="txt"
                            
                            placeholder="What do you want to play?"
                            onChange={handleChange}
                            required
                        />
                    <div className="browse icon"><SvgIcon iconName={"browse"}    /> </div> 
                </div>
            </Link>
            <div className="bell icon"><SvgIcon iconName={"bell"} /></div>
            <button className="profile-btn">D</button>

        </div>
    )
}