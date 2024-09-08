import { useState } from 'react'

import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { addSongToStation, removeSongFromStation, updateStation } from '../../store/actions/station.actions'
import { DropDownMenu } from './DropDownMenu'
import { AddPlaylistSubMenu } from './AddPlaylistSubMenu'
import { showErrorMsg } from '../../services/event-bus.service'

export function SongPreviewActionsMenu({ myStations, song, station, isOwnedByUser, likedSongsStation }) {

    const { spotifyId } = song
    const isLikedByUser = likedSongsStation.songs.some(song => song.spotifyId === spotifyId)
    const [showMenu, setShowMenu] = useState(false)

    const listItems = getList()

    function getList() {
        const addToQueue = buildListObj({
            name: 'Add to queue',
            icon: 'addToQueue',
            onClick: () => {
                if (!song.ytId) {
                    showErrorMsg('Defective song')
                    return
                }
                setPlayerAction(playerActions.ADD_TO_QUEUE, { songs: [song] })
            }
        })

        const removeFromPlaylist = buildListObj({
            name: 'Remove from this playlist',
            icon: 'trash',
            onClick: () => {
                const updatedSongs = station.songs.filter(song => song.spotifyId !== spotifyId)
                const updatedStation = { ...station, songs: updatedSongs }
                updateStation(updatedStation)
            }
        })

        const saveToLikedSongs = buildListObj({
            name: 'Save to your Liked Songs',
            icon: 'save',
            onClick: () => {
                if (!song.ytId) {
                    showErrorMsg('Defective song')
                    return
                }
                const updatedStation = { ...likedSongsStation, songs: [...likedSongsStation.songs, song] }
                addSongToStation(updatedStation)
            }
        })

        const removeFromLikedSongs = buildListObj({
            name: 'Remove from your Liked Songs',
            icon: 'removeFromLibrary',
            onClick: () => {
                const updatedSongs = likedSongsStation.songs.filter(song => song.spotifyId !== spotifyId)
                const updatedStation = { ...likedSongsStation, songs: updatedSongs }
                removeSongFromStation(updatedStation)
            }
        })

        const addToPlaylist = buildListObj({
            name: 'Add to playlist',
            type: 'list-item',
            icon: 'plus',
            secondIcon: 'more-menu',
            onClick: () => {
                if (!song.ytId) {
                    showErrorMsg('Defective song')
                    return
                }
                setShowMenu(prevShowMenu => !prevShowMenu)
            }
        })

        if (isOwnedByUser) return [addToPlaylist, removeFromPlaylist, removeFromLikedSongs, addToQueue]
        if (!isOwnedByUser && isLikedByUser) return [addToPlaylist, removeFromLikedSongs, addToQueue]
        if (!isOwnedByUser && !isLikedByUser) return [addToPlaylist, saveToLikedSongs, addToQueue]
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

    return (
        <div className="actions-menu">
            <DropDownMenu listItems={listItems} />
            {showMenu &&
                <AddPlaylistSubMenu
                    song={song}
                    myStations={myStations}
                    likedSongsStation={likedSongsStation}
                    setShowMenu={setShowMenu}
                    showMenu={showMenu} />}

        </div>
    )
}