import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({listItems, handleAction}) {

    function onClick(ev,listItem){
        ev.stopPropagation()
        handleAction(listItem)
    }


    return (

        <div className="drop-down-menu">

            <ul className="list">
                        {listItems.map((listItem, index) =>
                            <li key={index} onClick = {(ev)=> onClick(ev,listItem) } >
                                <DropDownMenuItem listItem = {listItem} />
                            </li>)
                        }
                    </ul>

        </div>
    )
}