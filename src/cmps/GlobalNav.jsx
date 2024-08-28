import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { SvgButton } from "./SvgButton.jsx"
import { SvgIcon } from './SvgIcon'
import { utilService } from '../services/util.service.js'


export function GlobalNav() {

    const navigate = useNavigate()
    const debouncedNavigate = utilService.debounce(navToResults, 1500) 

    function handleChange(ev) {
        var value = ev.target.value
        debouncedNavigate(value)
    }

    function navToResults(value){
        navigate(`/search/${value}`)
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