import { imgService } from "../services/imgService.js"
import { SvgIcon } from './SvgIcon'


export function GlobalNav() {
    return (
        <div className="global-nav">
            {/* <img src={imgService.getImg('liked')} alt="" /> */}
            <div className="spotify"><SvgIcon iconName={"spotify"} /></div>
            <div className="home"><SvgIcon iconName={"home"}    /> </div>
            <form>
                <div className="text-container">
                    <div className="search"><SvgIcon iconName={"search"}    /> </div>
                    <input type="text" placeholder="What do you want to play?" /> 
                    <div className="browse"><SvgIcon iconName={"browse"}    /> </div> 
                </div>
            </form>
            <div className="bell"><SvgIcon iconName={"bell"} /></div>
            <button className="profile-btn">D</button>




        </div>
    )
}