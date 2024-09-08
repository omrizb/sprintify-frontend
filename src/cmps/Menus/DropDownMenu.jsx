import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({ listItems, setShowMenu = null }) {



    function onClick(ev, listItem) {
        ev.stopPropagation()

        const types = ['button', 'checkBox']
        if (types.includes(listItem.type)) return

        listItem.onClick()
    }

    function handleSave(list) {
        const saveBtn = listItems.find(item => item.type === 'button')
        saveBtn.onClick(list)
    }


    return (

        <div className="drop-down-menu">

            <ul className="list">
                {listItems.map((listItem, index) =>
                    <li
                        key={index}
                        className={listItem.type}
                        onClick={(ev) => onClick(ev, listItem)}
                        onMouseEnter={() => {
                            if (setShowMenu && listItem.name === 'Add to playlist')
                                setShowMenu(true)
                            if (setShowMenu && listItem.name !== 'Add to playlist') setShowMenu(false)
                        }}
                    >
                        <DropDownMenuItem
                            listItem={listItem}
                            listItems={listItems}
                            onSave={handleSave}

                        />
                    </li>)
                }
            </ul>

        </div>
    )
}