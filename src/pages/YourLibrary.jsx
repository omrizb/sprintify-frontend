import { useSelector } from "react-redux";
import { LeftSidebar } from "../cmps/LeftSidebar";
import { YourLibraryHeader } from "../cmps/YourLibraryHeader";

export function YourLibrary() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <div className="my-library">
            <YourLibraryHeader loggedinUser={user} />
            <LeftSidebar display="open" />

        </div>
    )
}