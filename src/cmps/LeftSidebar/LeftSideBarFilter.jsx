import { useState } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions'

import { DropDownMenu } from "../DropDownMenu"
import { SvgIcon } from "../SvgIcon"
import { StationFilterButtons } from './StationFilterButtons'



export function LeftSideBarFilter({ userId }) {

    const [viewType, setViewType] = useState('list')
    const [sortType, setSortType] = useState('recents')
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    const [showMenu, setShowMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const listMenu = [
        buildListObj({
            type: 'title',
            name: 'Sort-by'
        }),

        buildListObj({
            name: 'Recents',
            isChosen: (sortType === 'recents'),
            onClick: () => setSortType('recents')
        }),

        buildListObj({
            name: 'Recently Added',
            isChosen: (sortType === 'recently-added'),
            onClick: () => setSortType('recently-added')
        }),

        buildListObj({
            name: 'Alphabetical',
            isChosen: (sortType === 'alphabetical'),
            onClick: () => {
                setSortType('alphabetical')
                updateFilterBy({ ...filterBy, sortField: 'name', sortDir: 1 })
            }
        }),

        buildListObj({
            name: 'Creator',
            isChosen: (sortType === 'creator'),
            onClick: () => setSortType('creator')
        }),

        buildListObj({
            type: 'title',
            name: 'View-as'
        }),

        buildListObj({
            name: 'List',
            icon: 'list',
            isChosen: (viewType === 'list'),
            onClick: () => setViewType('list')
        }),

        buildListObj({
            name: 'Compact',
            icon: 'compact',
            isChosen: (viewType === 'compact'),
            onClick: () => setViewType('compact')
        }),

        buildListObj({
            name: 'Grid',
            icon: 'grid',
            isChosen: (viewType === 'grid'),
            onClick: () => setViewType('grid')
        })

    ]

    function buildListObj(props) {
        return {
            type: 'list-item',
            name: '',
            icon: '',
            topDivision: '',
            isChosen: false,
            onClick: noop,
            ...props
        }
    }

    function noop() { }

    function handleChange(ev) {
        const type = ev.target.type
        var field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterBy.sortDir) filterBy.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break

        }
        updateFilterBy({ ...filterBy, [field]: value })
    }


    return (
        <div className="sidebar-filter">
            <StationFilterButtons filterBy={filterBy} userId={userId} />

            <section className="sidebar-search">

                <div className="search-container">
                    <button onClick={() => setShowSearch(prevShowSearch => !prevShowSearch)}
                        className="search icon btn-medium">
                        <SvgIcon iconName={"search"} />
                    </button>

                    {showSearch &&
                        <input
                            type="text"
                            name="txt"
                            value={filterBy.txt}
                            placeholder="Search in Playlists"
                            onChange={handleChange}
                            required
                        />}
                </div>


                <div className="sort-by">
                    <div onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)} className="recents" >
                        <span>{sortType}</span>
                        <SvgIcon iconName={viewType} svgClass="svg=small" />
                    </div>
                    {showMenu && <DropDownMenu listItems={listMenu} />}
                </div>

            </section>
        </div>
    )
}