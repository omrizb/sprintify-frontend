import { useState, useEffect } from 'react'
import { SvgIcon } from "./SvgIcon"

export function DropDownMenuItem({ listItem }) {

    const { name, icon, isChosen, topDivision, type } = listItem

    const [listItemToEdit, setListItemToEdit] = useState(listItem)

    function setClass() {
        if (type === 'title') return 'section-title'
        if (isChosen) return 'list-item chosen'
        return 'list-item'
    }

    function handleChecboxChange(ev) {
        setListItemToEdit(prevListItemToEdit => ({ ...prevListItemToEdit, isChecked: ev.target.checked }))
    }

    return (
        <div className={`drop-down-menu-item ${topDivision}`}>

            <div className={setClass()}>
                {icon && <SvgIcon iconName={icon} />}
                {listItem.imgUrl && <img src={listItem.imgUrl} alt="" width="32" height="32" />}
                <div>{name}</div>
            </div>

            {isChosen && <SvgIcon iconName={"check"} svgClass="check-icon" />}

            {(listItemToEdit.input && (listItemToEdit.type !== 'title'))
                &&
                <input
                    type="checkbox"
                    checked={listItemToEdit.isChecked}
                    onChange={handleChecboxChange}
                />}

        </div>
    )
}