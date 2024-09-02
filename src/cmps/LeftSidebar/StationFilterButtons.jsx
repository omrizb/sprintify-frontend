import { updateFilterBy } from '../../store/actions/filterBy.actions'


export function StationFilterButtons({ filterBy, userId }) {

    const sprintifyId = 'BBBB'


    const filterBtns = [
        buildBtnObj({
            name: 'X',
            showBtn: false,
            onClick: () => updateFilterBy({ ...filterBy, type: '', createdBy: '' })
        }),
        buildBtnObj({
            name: 'Playlists',
            onClick: () => updateFilterBy({ ...filterBy, type: 'playlist', createdBy: '' })
        }),
        buildBtnObj({
            name: 'Artists',
            showBtn: false,
            onClick: () => console.log('artist')
        }),
        buildBtnObj({
            name: 'Albums',
            showBtn: false,
            onClick: () => updateFilterBy({ ...filterBy, type: 'album' })
        }),
        buildBtnObj({
            name: 'By you',
            showBtn: true,
            onClick: () => updateFilterBy({ ...filterBy, type: 'playlist', createdBy: userId })
        }),
        buildBtnObj({
            name: 'By Sprintify',
            showBtn: true,
            onClick: () => updateFilterBy({ ...filterBy, type: 'playlist', createdBy: sprintifyId })
        }),
    ]


    function buildBtnObj(props) {
        return {
            name: '',
            showBtn: true,
            btnDisp: '',
            onClick: noop,
            ...props
        }
    }

    function noop() { }


    return (

        <ul className="station-filter-btns">
            {filterBtns.map((filterBtn, index) =>
                <li key={index}  >
                    {filterBtn.showBtn &&

                        <button
                            className="btn-tinted clear-filter"
                            onClick={filterBtn.onClick}>
                            {filterBtn.name}
                        </button>}
                </li>)
            }
        </ul>

    )
}