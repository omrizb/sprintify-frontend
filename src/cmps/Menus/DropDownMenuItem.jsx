import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"

export function DropDownMenuItem({ listItem, listItems, onSave }) {

    const { name, ref, icon, iconClass, isChosen, topDivision, type } = listItem

    const [list, setList] = useState([...listItems])
    const [listItemToEdit, setListItemToEdit] = useState(listItem)

    function setClass() {
        if (type === 'title') return 'section-title'
        if (isChosen) return 'item chosen'
        return 'item'
    }

    function handleCheckboxChange(ev) {
        const updatedItem = { ...listItemToEdit, isChecked: ev.target.checked }
        setListItemToEdit(updatedItem)
        const updatedListItems = list.map(item => {
            if (item.name === listItemToEdit.name) { item.isChecked = ev.target.checked }
            return item
        }
        )

        setList([...updatedListItems])
    }


    return (
        <div ref={ref} className={`drop-down-menu-item ${topDivision}`}>

            <div className="content">
                {(listItem.type !== 'button') &&
                    <div className={setClass()}>
                        {(icon && !listItem.imgUrl) && <div className='icon'><SvgIcon iconName={icon} svgClass={iconClass} /></div>}
                        {listItem.imgUrl && <img src={listItem.imgUrl} alt="" width="32" height="32" />}
                        <div>{name}</div>
                    </div>}

                <div className="right-align">
                    {isChosen && <SvgIcon iconName={"check"} svgClass="check-icon" />}
                    {listItem.secondIcon && <SvgIcon iconName={"moreMenu"} svgClass="check-icon" />}

                    {(listItem.type === 'checkBox') &&
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                checked={listItemToEdit.isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span></span>
                        </label>}
                </div>
            </div>

            {(listItem.type === 'button') &&
                <button onClick={() => onSave([...list])} className='btn-tinted save-btn'>{listItem.name}</button>}

        </div>
    )
}