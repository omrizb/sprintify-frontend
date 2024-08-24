import { useState, useEffect } from 'react'

import { SvgIcon } from './SvgIcon'


export function DropDownMenu({display}) {

    console.log(display)
    const [ isChosen, setIsChosen] = useState(true)

    return (

        <div className="drop-down-menu">

            <ul className="sort-by-menu"> 
                <li className="title">Sort by</li>
                <li className = "chosen">
                    Recents
                    {isChosen && <div className="icon check"><SvgIcon iconName={"check"}    /> </div>} 
                </li>
                <li >Recently Added</li>
                <li >Alphabetical</li>
                <li >Creator</li>
                <li >Custom Order</li>
            </ul>

            <ul className="view-menu"> 
                <li className="title">View as</li>

                <li >
                    <div className="icon"><SvgIcon iconName={"compact"}    /> </div> 
                    Compact
                    
                </li>

                <li className = "chosen">
                    <div className="icon"><SvgIcon iconName={"list"}    /> </div>    
                    List
                    {isChosen && <div className="icon check"><SvgIcon iconName={"check"}    /> </div>} 
                </li>

                <li >
                    <div className="icon"><SvgIcon iconName={"grid"}    /> </div> 
                    Grid
                </li>
            </ul>

        </div>
    )
}