import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions'

import { DropDownMenu } from "../DropDownMenu"
import { SvgIcon } from "../SvgIcon"


export function LeftSideBarFilter() {

    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    const [ showMenu, setShowMenu] = useState(false)
    const [ showSearch, setShowSearch] = useState(false)

    const display = {
        sortBy: 'recents',
        viewAs: 'list'
    }

    useEffect(() => {
        updateFilterBy(filterToEdit)
    }, [filterToEdit])

   
    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }
    
    
    return (
        <div className="sidebar-filter">
            <div className="category">
                <button className="btn-tinted">Playlists</button>
                <button className="btn-tinted">Artists</button>
                <button className="btn-tinted">Albums</button>
            </div>
            <div className="sidebar-search">


                <button onClick={() => setShowSearch(prevShowSearch => !prevShowSearch)} 
                        className="search icon btn-medium">
                        <SvgIcon iconName={"search"}    /> 
                </button>

                {showSearch && 
                    <input 
                        type="text" 
                        name="txt"
                        value={filterToEdit.txt}
                        placeholder="Search in Playlists"
                        onChange={handleChange}
                        required
                    /> }

                <div className="sort-by">
                    <div onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)} className="recents" >
                        Recents
                        <div className="icon"><SvgIcon iconName={"list"}    /> </div>
                    </div>
                    {showMenu && <DropDownMenu display={display} />}
                </div>
                
            </div>
        </div>
    )
}