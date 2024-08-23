import { SvgIcon } from "../SvgIcon"

export function LeftSideBarFilter() {
    return (
        <div className="sidebar-filter">
            <div className="category">
                <button className="btn-tinted">Playlists</button>
                <button className="btn-tinted">Artists</button>
                <button className="btn-tinted">Albums</button>
            </div>
            <div className="sidebar-search">
                <button className="search icon btn-medium"><SvgIcon iconName={"search"}    /> </button>
                <button className="recents btn-medium">
                    Recents
                    <div className="icon"><SvgIcon iconName={"recents"}    /> </div>
                </button>
            </div>
        </div>
    )
}