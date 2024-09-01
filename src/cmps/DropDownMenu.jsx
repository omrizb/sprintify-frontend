import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({listItems, handleAction}) {

    function onClick(action){
        if (!action) return
        handleAction(action)
    }


    return (

        <div className="drop-down-menu">

            <ul className="list">
                        {listItems.map((listItem, index) =>
                            <li key={index} onClick = {()=> onClick(listItem.action) } >
                                <DropDownMenuItem listItem = {listItem} />
                            </li>)
                        }
                    </ul>

        </div>
    )
}