import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({ listItems }) {


    function onClick(ev, listItem) {
        ev.stopPropagation()
        if (listItem.type !== 'button') listItem.onClick()
    }

    function handleSave(list) {
        const saveBtn = listItems.find(item => item.type === 'button')
        saveBtn.onClick(list)
    }


    return (

        <div className="drop-down-menu">

            <ul className="list">
                {listItems.map((listItem, index) =>
                    <li key={index} onClick={(ev) => onClick(ev, listItem)} >
                        <DropDownMenuItem l
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