import { AddNewStationBtn } from "./LeftSidebar/AddNewStationBtn";
import { ProfileButton } from "./ProfileButton";

export function YourLibraryHeader({ loggedinUser }) {

    return (
        <div className="your-library-header">
            <ProfileButton />
            <h1>Your Library</h1>
            <AddNewStationBtn loggedinUser={loggedinUser} />

        </div>
    )
}