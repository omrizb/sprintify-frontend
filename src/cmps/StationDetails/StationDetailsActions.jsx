import { useSelector } from 'react-redux'

export function StationDetailsActions({ stationMeta }) {
    const { type, isLikedSongs, isEmptyStation, isOwnedByUser } = stationMeta

    const showPlay = type === 'playlist' && !isEmptyStation
    const showAddRemove = type === 'playlist' && !isOwnedByUser
    const showFollowUnfollow = type === 'podcast'
    const showMore = type === 'playlist' && !isLikedSongs
    const showView = type === 'playlist'

    return (
        <div className="station-action-bar">
            {showPlay && <><button className="play-button" onClick={console.log('play')}>play</button></>}

            {showAddRemove && <><button className="add-or-remove-button" onClick={console.log('add-or-remove')}>add-or-remove</button></>}
            {showFollowUnfollow && <><button className="following-button" onClick={console.log('following')}>following</button></>}

            {showMore && <><button className="more-actions-button" onClick={console.log('more')}>• • •</button></>}
            {showView && <><button className="view-button" onClick={console.log('view')}>3</button></>}


        </div>

    )
}