import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropDownMenu } from './DropDownMenu'
import { addStation, updateStationAndStay, updateStation } from '../../store/actions/station.actions'


export function AddPlaylistSubMenu({ showMenu, setShowMenu, song, myStations, likedSongsStation }) {

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
            console.log('song already there')
            setShowMenu(false)
            return
        }

        const updatedStation = { ...station, songs: [...station.songs, song] }
        // updateStation(updatedStation)
        updateStationAndStay(updatedStation)
        setShowMenu(false)



    }

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

    return (
        <div className="sub-menu">
            {showMenu && <DropDownMenu listItems={listItems} />}
        </div>

    )
}