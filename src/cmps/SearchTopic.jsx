import { imgService } from "../services/imgService";

export function SearchTopic({ topic, imgKey, color, onClick }) {

    return (
        <div className="search-topic">
            <div
                onClick={() => onClick(topic)}
                className="img-box"
                style={{ backgroundColor: color }}
            >
                <h2>{topic}</h2>
                <img src={imgService.getImg(imgKey)} alt="" />
            </div>
        </div>

    )

}



