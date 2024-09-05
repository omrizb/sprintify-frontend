import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownMenu } from './DropDownMenu'
import { addStation, updateStation } from '../../store/actions/station.actions'

export function SongPreviewAddPlaylistMenu({ setShowMenu, song, myStations, likedSongsStation }) {


    const navigate = useNavigate()
    const songId = song.songId
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
                icon: 'musicSmall',
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

    return (

        <DropDownMenu listItems={listItems} />


    )


}