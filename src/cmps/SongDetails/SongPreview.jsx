import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { updateSongsInStation } from '../../store/actions/station.actions.js'
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
        setListItems(buildMyStationsArr())

    }, [myStations])

    function buildMyStationsArr() {
        const titleObj = buildListObj({
            type: 'title',
            name: 'New Playlist',
            icon: 'plus'
        })
        const stationsWithoutLiked = myStations.filter(station => station !== likedSongsStation)

        const isSongLiked = likedSongsStation.songs.some(song => song.songId === songId)
        const likedStationObj = buildListObj({
            name: likedSongsStation.name,
            station: likedSongsStation,
            imgUrl: `https://misc.scdn.co/liked-songs/liked-songs-64.png`,
            isChecked: isSongLiked

        })
        const stationList = stationsWithoutLiked.map(station => {
            const isInStation = station.songs.some(song => song.songId === songId)
            return buildListObj({
                name: station.name,
                station: station,
                icon: 'musicSmall',
                isChecked: isInStation
            })
        })

        const saveBtn = buildListObj({
            name: 'Save',
            type: 'button',
            onClick: (list) => handleSave(list)
        })

        return [titleObj, likedStationObj, ...stationList, saveBtn]
    }

    function buildListObj(props) {
        return {
            type: 'checkBox',
            name: '',
            id: '',
            icon: '',
            imgUrl: '',

            onClick: noop,
            input: true,
            isChecked: false,
            inputFunction: (ev, listItem) => handleChecboxChange(ev, listItem),
            ...props
        }
    }

    function noop() { }

    function handleSave(list) {
        setShowMenu(false)
        const checkedItems = list.filter(item => item.isChecked)
        const unCheckedItems = list.filter(item => (!item.isChecked && (item.type === 'checkBox')))

        const checkedStations = checkedItems.map(item => item = item.station)
        const unCheckedStations = unCheckedItems.map(item => item = item.station)
        console.log(unCheckedStations)

        const stationsToAddSong = checkedStations.filter(station =>
            station.songs.every(song => song.songId !== songId)
        )


        stationsToAddSong.forEach(station => {
            const updatedStation = { ...station, songs: [...station.songs, song] }
            updateSongsInStation(updatedStation)
        })

        unCheckedStations.forEach(station => {
            const updatedSongsArr = station.songs.filter(song => song.songId !== songId)
            const updatedStation = { ...station, songs: updatedSongsArr }
            updateSongsInStation(updatedStation)
        })
    }






    function onClickStation() {
        // console.log(songId)
    }

    function addSong() {

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                updateSongsInStation({ ...likedSongsStation, songs: [...likedSongsStation.songs, song] })

                break
            case 'addToStation':
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

