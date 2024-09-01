import { DropDownMenuItem } from "./DropDownMenuItem";

export function DropDownMenu({listItems}) {


    return (

        <div className="drop-down-menu">

            <ul className="list">
                        {listItems.map((listItem, index) =>
                            <li key={index}>
                                <DropDownMenuItem listItem = {listItem} />
                            </li>)
                        }
                    </ul>

        </div>
    )
}