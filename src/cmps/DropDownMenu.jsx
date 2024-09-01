import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({listItems, handleAction}) {

    function onClick(listItem){
        
        handleAction(listItem)
    }


    return (

        <div className="drop-down-menu">

            <ul className="list">
                        {listItems.map((listItem, index) =>
                            <li key={index} onClick = {()=> onClick(listItem) } >
                                <DropDownMenuItem listItem = {listItem} />
                            </li>)
                        }
                    </ul>

        </div>
    )
}