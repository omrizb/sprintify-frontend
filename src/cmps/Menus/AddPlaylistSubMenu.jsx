import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DropDownMenu } from './DropDownMenu'
import { addStation, addSongToStation } from '../../store/actions/station.actions'
import { showSuccessMsg } from '../../services/event-bus.service'
import { stationService } from '../../services/station/station.service.local'


export function AddPlaylistSubMenu({ showMenu, setShowMenu, song, myStations, likedSongsStation }) {

    const spotifyId = song.spotifyId
    const [listItems, setListItems] = useState([])
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

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
        const songExists = station.songs.some(song => song.spotifyId === spotifyId)
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
            const newStation = stationService.getEmptyStation()
            const { _id, fullName, imgUrl } = loggedinUser
            const station = {
                ...newStation,
                name: song.songName,
                stationImgUrl: song.imgUrl.big,
                createdBy: {
                    id: _id,
                    fullName,
                    imgUrl
                },
                songs: [song]
            }
            await addStation(station)
            showSuccessMsg(`Added to ${station.name}`)

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