import { imgService } from "../services/imgService.js"
import { SvgIcon } from './SvgIcon'


export function GlobalNav() {
    return (
        <div className="global-nav">
            {/* <img src={imgService.getImg('liked')} alt="" /> */}
            <div className="spotify"><SvgIcon iconName={"spotify"} /></div>
            <div className="home"><SvgIcon iconName={"home"}    /> </div>
            <form>
                <span><SvgIcon iconName={"search"}    /> </span>
                What do you want to play?
                <span><SvgIcon iconName={"browse"}    /> </span> 
            </form>
            <div><SvgIcon iconName={"bell"} /></div>
            <div>Profile icon</div>




        </div>
    )
}