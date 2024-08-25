
export function StationPreview({ station }) {
    return <article className="preview">
        <img src="station.stationImgUrl" alt="" />
        {station.name}
        
    </article>
}