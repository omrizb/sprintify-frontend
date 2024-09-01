import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions'

import { DropDownMenu } from "../DropDownMenu"
import { SvgIcon } from "../SvgIcon"
import { StationFilterButtons } from './StationFilterButtons'



export function LeftSideBarFilter() {

    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    const [ showMenu, setShowMenu] = useState(false)
    const [ showSearch, setShowSearch] = useState(false)


    const sortTitle ={
        type: 'title',
        name: 'Sort by',
        icon: '',
        action: '',
        topDivision: '',
        isChosen: false,
        closeMenu: false
    }
    const viewTitle ={...sortTitle, name: 'View as', topDivision: 'include-top-division'}

    const recents =  {
        type: 'list-item',
        name: 'Recents',
        icon: '',
        action: 'update-filter',
        topDivision: '',
        isChosen: true,
        closeMenu: false, 
    }

    const recentlyAdded = {...recents, name:'Recently Added', isChosen: false}
    const alpha = {...recents, name:'Alphabetical', isChosen: false}
    const creator = {...recents, name:'Creator', isChosen: false}

    const compact =  {...recents, name:'Compact', icon: 'compact', isChosen: false}
    const list = {...compact, name:'List', icon: 'list', isChosen: true}
    const grid = {...compact, name:'Grid', icon: 'grid'}
    
    const listItems = [sortTitle, recents, recentlyAdded, alpha, creator, viewTitle, compact, list, grid]

    function handleChange(ev) {
        const type = ev.target.type
        var field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterBy.sortDir) filterBy.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
             
        }
        updateFilterBy({...filterBy, [field]: value})
    }
    
    
    return (
        <div className="sidebar-filter">
            <StationFilterButtons />

            <section className="sidebar-search">

                <div className="search-container">
                    <button onClick={() => setShowSearch(prevShowSearch => !prevShowSearch)} 
                        className="search icon btn-medium">
                        <SvgIcon iconName={"search"}    /> 
                    </button>

                    {showSearch && 
                        <input 
                            type="text" 
                            name="txt"
                            value={filterBy.txt}
                            placeholder="Search in Playlists"
                            onChange={handleChange}
                            required
                        /> }
                </div>
                

                <div className="sort-by">
                    <div onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)} className="recents" >
                        Recents
                        <div className="icon"><SvgIcon iconName={"list"}    /> </div>
                    </div>
                    {showMenu && <DropDownMenu listItems = {listItems} />}
                </div>
                
            </section>
        </div>
    )
}