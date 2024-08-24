
export function DropDownMenu() {

    return (

        <div className="drop-down-menu">

            <ul className="sort-by-menu">
                <li >Recents</li>
                <li >Recently Added</li>
                <li >Alphabetical</li>
                <li >Creator</li>
                <li >Custom Order</li>
            </ul>

            <ul className="view-menu">
                <li >Compact</li>
                <li >List</li>
                <li >Grid</li>
            </ul>
            
        </div>
    )
}