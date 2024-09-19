import { GeneralPreview } from "./GeneralPreview"

export function GeneralList({ listItems, type }) {

    function setTitle() {
        if (type === 'album') return 'Albums'
        if (type === 'playlist') return 'Playlists'
    }
    return (

        <div className="general-list">
            <h2>{setTitle()}</h2>
            <ul className="">

                {listItems.map(item => {

                    return <li key={item.spotifyId}>
                        <GeneralPreview item={item} type={type} />
                    </li>
                })}

            </ul>
        </div>

    )
}

