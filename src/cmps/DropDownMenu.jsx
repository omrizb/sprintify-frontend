import { useState, useEffect } from 'react'

import { SvgIcon } from './SvgIcon'


export function DropDownMenu({display}) {

    console.log(display)
    const {sortBy, viewAs} = display
    const {showRecents, showRecentlyAdded, showAlpha, showCreator, showCustom} = sortBy
    const {showCompact, showList, showGrid} = viewAs

    const [ isChosen, setIsChosen] = useState(true)

    return (

        <div className="drop-down-menu">

            <ul className="sort-by-menu"> 
                <li className="title">Sort by</li>
                {showRecents &&
                    <li className = "chosen">
                    Recents
                    {isChosen && <div className="icon check"><SvgIcon iconName={"check"}    /> </div>} 
                </li>}

                {showRecentlyAdded &&
                <li >Recently Added</li>}

                {showAlpha &&
                <li >Alphabetical</li>}
                
                {showCreator &&
                <li >Creator</li>}

                {showCustom &&
                <li >Custom Order</li>}
                
            </ul>

            <ul className="view-menu"> 
                <li className="title">View as</li>

               {showCompact &&
               <li >
                    <div className="icon"><SvgIcon iconName={"compact"}    /> </div> 
                    Compact 
                </li>}

                {showList &&
                <li className = "chosen">
                    <div className="icon"><SvgIcon iconName={"list"}    /> </div>    
                    List
                    {isChosen && <div className="icon check"><SvgIcon iconName={"check"}    /> </div>} 
                </li>}

                {showGrid &&
                <li >
                    <div className="icon"><SvgIcon iconName={"grid"}    /> </div> 
                    Grid
                </li>}
                
            </ul>
            
        </div>
    )
}