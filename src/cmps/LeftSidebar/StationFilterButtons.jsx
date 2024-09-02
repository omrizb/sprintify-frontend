import { useState, useEffect } from 'react'

import { updateFilterBy } from '../../store/actions/filterBy.actions'


export function StationFilterButtons({ filterBy, userId }) {

    const sprintifyId = 'BBBB'
    const [filterBtns, setFilterBtns] = useState([])

    const filterBtnsInit = [
        buildBtnObj({
            name: 'X',
            type: '',
            showBtn: false,
            onClick: onClickBtn
        }),
        buildBtnObj({
            name: 'Playlists',
            onClick: onClickBtn
        }),
        buildBtnObj({
            name: 'Artists',
            type: 'artist',
            showBtn: false,
            onClick: () => console.log('artist')
        }),
        buildBtnObj({
            name: 'Albums',
            type: 'album',
            showBtn: false,
            onClick: () => updateFilterBy({ ...filterBy, type: 'album' })
        }),
        buildBtnObj({
            name: 'By you',
            createdBy: userId,
            showBtn: true,
            onClick: onClickBtn
        }),
        buildBtnObj({
            name: 'By Sprintify',
            createdBy: sprintifyId,
            showBtn: true,
            onClick: onClickBtn
        }),
    ]

    useEffect(() => {
        setFilterBtns(filterBtnsInit)
    }, [])


    function buildBtnObj(props) {
        return {
            name: '',
            type: 'playlist',
            createdBy: '',
            showBtn: true,
            btnClass: '',
            onClick: noop,
            ...props
        }
    }

    function noop() { }

    function onClickBtn(index, filterBtn) {
        console.log(index)
        console.log(filterBtn.type)
        setFilterBtns(prevFilterBtns =>
            prevFilterBtns.map((btn, i) =>
                i === index ? { ...btn, btnClass: 'active' } : { ...btn, btnClass: '' }
            )
        )
        updateFilterBy({ ...filterBy, type: filterBtn.type, createdBy: filterBtn.createdBy })

    }


    return (

        <ul className="station-filter-btns">
            {filterBtns.map((filterBtn, index) =>
                <li key={index}  >
                    {filterBtn.showBtn &&

                        <button
                            className={`btn-tinted clear-filter ${filterBtn.btnClass}`}
                            onClick={() => filterBtn.onClick(index, filterBtn)}>
                            {filterBtn.name}
                        </button>}
                </li>)
            }
        </ul>

    )
}