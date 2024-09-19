export function GeneralPreview({ item, type }) {

    return (
        <div className="general-preview">
            <div className={`image-container ${type === 'artist' ? 'rounded' : ''}`}>
                <img src={item.imgUrl.big} />
            </div>

            <div className="general-info">
                <div className="item-name">{item.name}</div>
                <div className="item-type">{type}</div>
            </div>
        </div>
    )
}