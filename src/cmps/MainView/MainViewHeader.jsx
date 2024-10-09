import { ProfileButton } from "../ProfileButton";

export function MainViewHeader() {
    return (
        <div className="main-view-header">

            <div className="profile-btn"><ProfileButton /></div>

            <button className="btn-light">All</button>
            <button className="btn-tinted">Music</button>
            <button className="btn-tinted">Podcasts</button>

        </div>
    )
}