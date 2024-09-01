import { SvgIcon } from "./SvgIcon"

export function DropDownMenuItem({listItem}){

    const { name, icon, isChosen, topDivision, type} = listItem

    
    function setClass(){
        if (type === 'title') return 'section-title'
        if (isChosen) return 'list-item chosen'
        return 'list-item'
    }

    return (
        <div className={`drop-down-menu-item ${topDivision}`}>

                <div className={setClass()}>
                    {icon && <SvgIcon iconName = {icon} />}
                    <div>{name}</div>
                </div>
        
                {isChosen && <SvgIcon iconName={"check"} svgClass="check-icon" /> }
            
        </div>
    )
}