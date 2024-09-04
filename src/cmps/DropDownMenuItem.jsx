import { useState } from 'react'
import { SvgIcon } from "./SvgIcon"

export function DropDownMenuItem({ listItem, listItems, onSave }) {

    const { name, icon, isChosen, topDivision, type } = listItem


    const [list, setList] = useState([...listItems])
    const [listItemToEdit, setListItemToEdit] = useState(listItem)

    function setClass() {
        if (type === 'title') return 'section-title'
        if (isChosen) return 'list-item chosen'
        return 'list-item'
    }

    function handleChecboxChange(ev) {
        const updatedItem = { ...listItemToEdit, isChecked: ev.target.checked }
        setListItemToEdit(updatedItem)
        const updatedListItems = list.map(item => {
            if (item.name === listItemToEdit.name) { item.isChecked = ev.target.checked }
        }
        )

        setList([...updatedListItems])
    }

    // function onClickSave() {
    //     onSave(list)
    // }


    return (
        <div className={`drop-down-menu-item ${topDivision}`}>

            {(listItem.type !== 'button') &&
                <div className={setClass()}>
                    {icon && <SvgIcon iconName={icon} />}
                    {listItem.imgUrl && <img src={listItem.imgUrl} alt="" width="32" height="32" />}
                    <div>{name}</div>
                </div>}

            {isChosen && <SvgIcon iconName={"check"} svgClass="check-icon" />}

            {(listItem.type === 'checkBox')
                &&
                <label className="custom-checkbox">
                    <input
                        type="checkbox"
                        checked={listItemToEdit.isChecked}
                        onChange={handleChecboxChange}
                    />
                    <span></span>
                </label>
            }

            {(listItem.type === 'button') &&
                // <button onClick={onClickSave} className='btn-tinted'>{listItem.name} </button>}
                <button onClick={() => onSave([...list])} className='btn-tinted'>{listItem.name} </button>}

        </div>
    )
}