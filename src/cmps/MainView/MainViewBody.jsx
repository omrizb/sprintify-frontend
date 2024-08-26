import { StationList } from "../StationList";

export function MainViewBody() {
    return (
        <div className="main-view-body">
            Main View Body
            <h1>My Songs</h1>
            <button className="btn-green">Continue</button>
            <ul>
                {createSongs()}
            </ul>
            {/* <StationList/> */}
            
            
        </div>
    )
}