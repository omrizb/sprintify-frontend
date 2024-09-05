import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownMenu } from './DropDownMenu'
import { addStation, addSongToStation, updateStation } from '../../store/actions/station.actions'
import { showSuccessMsg } from '../../services/event-bus.service'


export function AddPlaylistSubMenu({ showMenu, setShowMenu, song, station: currStation, myStations, likedSongsStation }) {

    const navigate = useNavigate()
    const songId = song.songId
    const [listItems, setListItems] = useState([])


    useEffect(() => {
        if (!myStations) return
        setListItems(buildMyStationsArr())

    }, [myStations])

    function buildMyStationsArr() {

        const newStationObj = buildListObj({
            type: 'list-item',
            name: 'New Playlist',
            icon: 'plus',
            onClick: handleAddStation
        })
        const stationsWithoutLiked = myStations.filter(station => station !== likedSongsStation)
        const stationList = stationsWithoutLiked.map(station => {
            return buildListObj({
                name: station.name,
                station: station,
                onClick: () => addSong(station)
            })
        })

        return [newStationObj, ...stationList]
    }

    function buildListObj(props) {
        return {
            type: 'list-item',
            name: '',
            icon: '',
            onClick: noop,
            ...props
        }
    }

    function noop() { }

    function addSong(station) {
        const songExists = station.songs.some(song => song.songId === songId)
        if (songExists) {
            showSuccessMsg(`Already in ${station.name}`)
            console.log('song already there')
            setShowMenu(false)
            return
        }

        const updatedStation = { ...station, songs: [...station.songs, song] }
        addSongToStation(updatedStation)
        setShowMenu(false)
    }

    async function handleAddStation() {
        setShowMenu(false)
        try {
            const station = await addStation()
            const updatedStation = { ...station, name: song.songName, stationImgUrl: song.imgUrl, songs: [song] }
            const savedStation = await updateStation(updatedStation)
            // await updateStation(currStation)

        } catch (err) {
            console.log('Cannot add a station')
        } finally {
            console.log(currStation.name)
            navigate(`/station/${currStation._id}`)
        }
    }

    return (
        <div className="sub-menu">
            {showMenu && <DropDownMenu listItems={listItems} />}
        </div>

    )
}