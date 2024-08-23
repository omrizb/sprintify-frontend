import { SvgIcon } from "../SvgIcon"


export function LeftSideBarHeader() {
    return (
        <div className="sidebar-header">
            <div className="library">
                <div className="icon"> <SvgIcon iconName={"library"}    /> </div>
                Your Library
            </div>
            
            {/* <div className="plus icon"><SvgIcon iconName={"plus"}    /> </div> */}
            <button className="plus icon btn-medium"><SvgIcon iconName={"plus"}    /> </button>
        </div>
    )
}