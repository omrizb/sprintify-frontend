import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DropDownMenu } from './DropDownMenu'
import { addStation, addSongToStation } from '../../store/actions/station.actions'
// import { stationService } from '../../services/station/station.service.local'
import { stationService } from '../../services/station/station.service.remote'


export function AddPlaylistSubMenu({ showMenu, setShowMenu, song, myStations, likedSongsStation }) {

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

    async function addSong(station) {
        const clonedSong = structuredClone(song)
        addSongToStation(station, clonedSong)
        setShowMenu(false)
    }

    async function handleAddStation() {
        setShowMenu(false)
        try {
            const newStation = stationService.getEmptyStation()
            const { _id, fullName, imgUrl } = loggedinUser

            const updatedSong = (!song.ytId) ? await stationService.setSongYtId(song) : song

            const station = {
                ...newStation,
                name: updatedSong.songName,
                stationImgUrl: updatedSong.imgUrl.big,
                createdBy: {
                    id: _id,
                    fullName,
                    imgUrl
                },
                songs: [{ ...updatedSong, addedAt: Date.now() }]
            }
            await addStation(station)

        } catch (err) {
            console.log(`Cannot add a station, ${err}`)
        }
    }


    return (
        <div className="sub-menu">
            {showMenu && <DropDownMenu listItems={listItems} />}
        </div>

    )
}