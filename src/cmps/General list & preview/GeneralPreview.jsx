export function GeneralPreview({ item, type }) {


    return (
        <div className="general-preview">

            <img src={item.imgUrl.big} />

            <div className="general-info">
                <div className="item-name">{item.name}</div>
                <div className="item-type">{type}</div>
            </div>
        </div>
    )
}