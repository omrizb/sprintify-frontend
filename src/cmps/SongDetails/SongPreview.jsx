import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { addSongToStation } from '../../store/actions/station.actions.js'
import { DropDownMenu } from '../DropDownMenu.jsx'

export function SongPreview(props) {

    const playerSongId = useSelector(store => store.playerModule.player.song.songId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)
    const [showMenu, setShowMenu] = useState(false)

    const { song, stationId, likedSongsStation, myStations, hoveredSongId, selectedSongId, index, type, onRemoveSong } = props

    let articleClassType
    switch (type) {
        case 'table':
            articleClassType = 'table dynamic-grid'
    }

    const { songId, songName, artist, album, url, imgUrl, duration } = song
    const isHovered = song.songId === hoveredSongId
    const isHighlighted = isHovered || song.songId === selectedSongId
    const isLikedByUser = likedSongsStation && likedSongsStation.songs.some(song => song.songId === songId)
    const isCurrentlyPlayedSong = song.songId === playerSongId && isPlaying

    const songPreviewClass = [
        'song-preview',
        articleClassType,
        isHighlighted ? 'highlight' : '',
        isCurrentlyPlayedSong ? 'currently-playing' : ''
    ].join(' ')

    const [listItems, setListItems] = useState([])

    useEffect(() => {
        if (!myStations) return
        const list = buildMyStationsArr()
        setListItems(list)
        console.log(list)

    }, [myStations])

    function buildMyStationsArr() {
        const titleObj = buildListObj({
            type: 'title',
            name: 'New Playlist',
            icon: 'plus'
        })
        const stationsWithoutLiked = myStations.filter(station => station !== likedSongsStation)
        const likedStationObj = buildListObj({
            name: likedSongsStation.name,
            imgUrl: `https://misc.scdn.co/liked-songs/liked-songs-64.png`,
            onClick: onClickStation

        })
        const stationList = stationsWithoutLiked.map(station => {
            return buildListObj({
                name: station.name,
                icon: 'musicSmall',
                onClick: onClickStation
            })
        })

        return [titleObj, likedStationObj, ...stationList]
    }




    function buildListObj(props) {
        return {
            type: 'list-item',
            name: '',
            icon: '',
            imgUrl: '',
            topDivision: '',
            isChosen: false,
            onClick: noop,
            input: true,
            ...props
        }
    }

    function noop() { }

    function onClickStation() {
        console.log(songId)
    }

    function addSong() {

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                console.log('add to liked songs')
                addSongToStation({ ...likedSongsStation, songs: [...likedSongsStation.songs, song] })

                break
            case 'addToStation':
                console.log('add to station')
                setShowMenu(prevShowMenu => !prevShowMenu)

                break

            default:
                break
        }
    }

    return (
        <article className={songPreviewClass}>
            <div className="index flex">
                {isHovered
                    ? <PlayButton
                        type="songPreview"
                        stationId={stationId}
                        song={song}
                    />
                    : isCurrentlyPlayedSong
                        ? <img src={imgService.getImg('equalizerAnimatedGreen')} />
                        : index}
            </div>
            <div className="small-preview flex">
                <img className="thumbnail" src={imgUrl} alt={songName} />
                <span className="song-name"><Link to={`/track/${songId}`}>{songName}</Link></span>
                <span className="artist">{artist}</span>
            </div>
            <div className="album">{album}</div>
            <div className="date-added"></div>
            <div className="song-duration">
                {/* <button className="btn-tinted"
                    onClick={() => onRemoveSong(song.songId)}>X
                </button>
                <button className="btn-tinted"
                    onClick={() => onAddSong(song)}>Add
                </button> */}
                <div className="add-btn-container" onClick={addSong}>
                    {<DynamicButton isHighlighted={isHighlighted} isLikedByUser={isLikedByUser} />}
                    {showMenu && <DropDownMenu listItems={listItems} />}
                </div>
                <span>{utilService.getTimeStr(duration)}</span>
                <div className="dots-container">{isHighlighted && <DotsButton type="songPreview" elementName={songName} />}</div>
            </div>
        </article>
    )
}

function DynamicButton(props) {
    if (props.isLikedByUser) return <VButton type="addToStation" />
    else if (props.isHighlighted) return <AddToButton type="addToLikedSongs" />
}

