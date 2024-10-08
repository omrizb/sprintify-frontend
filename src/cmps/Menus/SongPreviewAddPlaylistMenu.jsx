import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownMenu } from './DropDownMenu'
import { addStation, updateStationAndStay } from '../../store/actions/station.actions'
// import { stationService } from '../../services/station/station.service.local'
import { stationService } from '../../services/station/station.service.remote'

export function SongPreviewAddPlaylistMenu({ setShowMenu, song, myStations, likedSongsStation }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const spotifyId = song.spotifyId
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

        const isSongLiked = likedSongsStation.songs.some(song => song.spotifyId === spotifyId)
        const likedStationObj = buildListObj({
            name: likedSongsStation.name,
            station: likedSongsStation,
            imgUrl: `https://misc.scdn.co/liked-songs/liked-songs-64.png`,
            isChecked: isSongLiked

        })
        const stationList = stationsWithoutLiked.map(station => {
            const isInStation = station.songs.some(song => song.spotifyId === spotifyId)
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
            const newStation = stationService.getEmptyStation()

            const { _id, fullName, imgUrl } = loggedinUser

            const station = {
                ...newStation,
                name: song.songName,
                stationImgUrl: song.imgUrl.big,
                createdBy: { id: _id, fullName, imgUrl },
                songs: [song]
            }
            const savedStation = await addStation(station)
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
            !station.songs.some(song => song.spotifyId === spotifyId)
        )

        const updatedAdd = stationsToAdd.map(station => {
            const updatedSongs = [...station.songs, song]
            return { ...station, songs: updatedSongs }
        })

        const stationsToRemove = unCheckedStations.filter(station => {
            return station.songs.some(song => song.spotifyId === spotifyId)
        })

        const updatedRemoved = stationsToRemove.map(station => {
            const updatedSongs = station.songs.filter(song => song.spotifyId != spotifyId)
            return { ...station, songs: updatedSongs }
        })


        updatedAdd.forEach(station => updateStationAndStay(station))
        updatedRemoved.forEach(station => updateStationAndStay(station))
    }

    return (
        <DropDownMenu listItems={listItems} />
    )
}