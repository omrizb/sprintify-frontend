import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions'

import { DropDownMenu } from "../Menus/DropDownMenu"
import { SvgIcon } from "../SvgIcon"
import { StationFilterButtons } from './StationFilterButtons'
import { PopUp } from '../PopUp'



export function LeftSideBarFilter({ userId }) {

    const [viewType, setViewType] = useState('list')
    const [sortType, setSortType] = useState('recents')
    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)

    const [showMenu, setShowMenu] = useState(false)
    const sortByBtnRef = useRef(null)
    const [showSearch, setShowSearch] = useState(false)

    const listMenu = [
        buildListObj({
            type: 'title',
            name: 'Sort-by'
        }),

        buildListObj({
            name: 'Recents',
            isChosen: (sortType === 'recents'),
            onClick: () => {
                setSortType('recents')
                updateFilterBy({ ...filterBy, sortField: 'createdAt', sortDir: -1 })
            }
        }),

        buildListObj({
            name: 'Recently Added',
            isChosen: (sortType === 'recently-added'),
            onClick: () => {
                setSortType('recently-added')
                updateFilterBy({ ...filterBy, sortField: 'addedAt', sortDir: -1 })
            }
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
            onClick: () => {
                setSortType('creator')
                updateFilterBy({ ...filterBy, sortField: 'createdBy', sortDir: 1 })
            }
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

                <div className={`search-container ${showSearch && 'active'}`}>
                    <button onClick={() => setShowSearch(prevShowSearch => !prevShowSearch)}
                        className="search icon btn-medium-with-hover">
                        <SvgIcon iconName={"search"} />
                    </button>

                    <input
                        className={showSearch && 'active'}
                        type="text"
                        name="txt"
                        value={filterBy.txt}
                        placeholder="Search in Your Library"
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="sort-by">
                    <div ref={sortByBtnRef} onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)} className="recents" >
                        <span className={`text-content ${showSearch && 'hide'}`}>{sortType}</span>
                        <SvgIcon iconName={viewType} svgClass="svg-small1" />
                    </div>

                    {showMenu &&
                        <PopUp btnRef={sortByBtnRef} onClosePopUp={() => setShowMenu(false)} >
                            <DropDownMenu listItems={listMenu} />
                        </PopUp>}

                </div>

            </section>
        </div>
    )
}