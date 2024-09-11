import { useRef, useState } from 'react'

import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { addSongToStation, removeSongFromStation, updateStation } from '../../store/actions/station.actions'
import { DropDownMenu } from './DropDownMenu'
import { AddPlaylistSubMenu } from './AddPlaylistSubMenu'
import { showErrorMsg } from '../../services/event-bus.service'
import { PopUp } from '../PopUp'

export function SongPreviewActionsMenu({ myStations, song, station, isOwnedByUser, likedSongsStation }) {

    const { spotifyId } = song
    const isLikedByUser = likedSongsStation.songs.some(song => song.spotifyId === spotifyId)
    const [showMenu, setShowMenu] = useState(false)
    const addMoreBtnRef = useRef()

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
                const saveToLike = true
                if (!song.ytId) {
                    setSongYtId(saveToLike)
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
            ref: addMoreBtnRef,
            onClick: () => {
                if (!song.ytId) {
                    setSongYtId()
                }
                setShowMenu(prevShowMenu => !prevShowMenu)
            }
        })

        async function setSongYtId(saveToLike = false) {
            try {
                const ytSong = await youtubeService.getTopVideo(`song: ${song.songName} by ${song.artist.name}`)
                song.ytId = ytSong.songId
                if (saveToLike) {
                    const updatedStation = { ...likedSongsStation, songs: [...likedSongsStation.songs, song] }
                    addSongToStation(updatedStation)
                }

            } catch (error) {
                console.log(error)
                showErrorMsg('Defective song')
            }
        }

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
            <DropDownMenu listItems={listItems} setShowMenu={setShowMenu} />
            {showMenu && <PopUp btnRef={addMoreBtnRef} onClosePopUp={() => setShowMenu(false)} isSideMenu={true}>
                <AddPlaylistSubMenu
                    song={song}
                    myStations={myStations}
                    likedSongsStation={likedSongsStation}
                    setShowMenu={setShowMenu}
                    showMenu={showMenu} />
            </PopUp>}

        </div>
    )
}