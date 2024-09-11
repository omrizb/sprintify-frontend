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
        }),

        buildBtnObj({
            name: 'Playlists',
            createdBy: ''
        }),

        buildBtnObj({
            name: 'Artists',
            type: 'artist',
        }),

        buildBtnObj({
            name: 'Albums',
            type: 'album',
        }),

        buildBtnObj({
            name: 'By you',
            createdBy: userId,
            showBtn: false,
        }),

        buildBtnObj({
            name: 'By Sprintify',
            createdBy: sprintifyId,
            showBtn: false,
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
            onClick: onClickBtn,
            ...props
        }
    }


    function onClickBtn(index, filterBtn) {
        let { type, btnClass, createdBy, } = filterBtn

        setFilterBtns(prevFilterBtns =>
            prevFilterBtns.map((btn, i) =>
                i === index ? { ...btn, btnClass: 'active' } : { ...btn, btnClass: '' }

            )
        )

        switch (type) {
            case '':
                reset()
                return

            case 'playlist':
                if (btnClass) {
                    reset()
                    return
                }
                if (!btnClass) {
                    setFilterBtns(prevFilterBtns =>
                        prevFilterBtns.map(btn => ({
                            ...btn,
                            showBtn: (btn.type === 'playlist' || (!btn.type)),
                        }))
                    )
                }
                break

            case 'artist':
            case 'album':
                if (btnClass) {
                    reset()
                    return
                }
                if (!btnClass) {
                    setFilterBtns(prevFilterBtns =>
                        prevFilterBtns.map(btn =>
                            ((!btn.createdBy) || (!btn.type)) ? { ...btn, showBtn: true } : { ...btn, showBtn: false }
                        ))
                }
                break
        }

        updateFilterBy({
            ...filterBy,
            stationType: type,
            createdBy: createdBy,
            userId: userId
        })
    }

    function reset() {
        setFilterBtns(prevFilterBtns =>
            prevFilterBtns.map(btn => ({
                ...btn,
                showBtn: (!btn.createdBy && btn.type),
                btnClass: ''
            }))
        )

        updateFilterBy({
            ...filterBy,
            stationType: '',
            createdBy: '',
            userId
        })
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