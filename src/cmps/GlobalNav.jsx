import { Link } from 'react-router-dom'
import { SvgButton } from "./SvgButton.jsx"
import { SvgIcon } from './SvgIcon'


export function GlobalNav() {
    return (
        <div className="global-nav">
            {/* <img src={imgService.getImg('liked')} alt="" /> */}

            <div className="spotify"><SvgIcon iconName={"spotify"} /></div>
            <Link to={`/`}>
                <SvgButton btnClass={'btn-tinted home'} svgIcon={'home'} />  
            </Link>
            
            <form>
                <div className="text-container">
                    <div className="search icon"><SvgIcon iconName={"search"}    /> </div>
                    <input type="text" placeholder="What do you want to play?" /> 
                    <div className="browse icon"><SvgIcon iconName={"browse"}    /> </div> 
                </div>
            </form>
            <div className="bell icon"><SvgIcon iconName={"bell"} /></div>
            <button className="profile-btn">D</button>




        </div>
    )
}