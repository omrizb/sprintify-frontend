import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { addSongsToLiked, addStation, updateStation, updateStations } from '../../store/actions/station.actions.js'
import { DropDownMenu } from '../DropDownMenu.jsx'
import { stationService } from '../../services/station/station.service.local.js'

export function SongPreview(props) {


    const navigate = useNavigate()

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
            name: 'Add to playlist',
            icon: ''
        })
        const newStationObj = buildListObj({
            type: 'list-item',
            name: 'New Playlist',
            icon: 'plus',
            onClick: handleAddStation
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
                // icon: 'musicSmall',
                imgUrl: station.stationImgUrl,
                isChecked: isInStation
            })
        })

        const saveBtn = buildListObj({
            name: 'Save',
            type: 'button',
            onClick: (list) => handleSave(list)
        })

        return [titleObj, newStationObj, likedStationObj, ...stationList, saveBtn]
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


    async function handleAddStation() {
        setShowMenu(false)
        try {
            const station = await addStation()
            const updatedStation = { ...station, songs: [song] }
            const savedStation = await updateStation(updatedStation)
            navigate(`/station/${savedStation._id}`)
        } catch (err) {
            console.log('Cannot add a station')
        }
    }

    async function handleSave(list) {
        setShowMenu(false)
        const checkedItems = list?.filter(item => item.isChecked)
        const unCheckedItems = list?.filter(item => (!item.isChecked && (item.type === 'checkBox')))

        const checkedStations = checkedItems.map(item => item = item.station)
        const unCheckedStations = unCheckedItems.map(item => item = item.station)

        console.log(song.songName)
        checkedStations.forEach(item => console.log('checked:', item.name, item._id))
        unCheckedStations.forEach(item => console.log('unChecked:', item.name, item._id))


        //First I will find all the checked station that do not contain the song and need to be updated

        const stationsToAdd = checkedStations.filter(station =>

            !station.songs.some(song => song.songId === songId)
        )

        const updatedAdd = stationsToAdd.map(station => {
            const updatedSongs = [...station.songs, song]
            return { ...station, songs: updatedSongs }
        })


        const stationsToRemove = unCheckedStations.filter(station => {

            return station.songs.some(song => song.songId === songId);
        })

        const updatedRemoved = stationsToRemove.map(station => {
            const updatedSongs = station.songs.filter(song => song.songId != songId)
            return { ...station, songs: updatedSongs }
        })

        const updatedStations = [...updatedAdd, ...updatedRemoved]

        updatedStations.forEach(station => updateStation(station))

    }


    function addSong() {

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                addSongsToLiked({ ...likedSongsStation, songs: [...likedSongsStation.songs, song] })

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

