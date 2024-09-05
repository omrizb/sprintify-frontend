import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { updateLikedSongsStation } from '../../store/actions/station.actions.js'
import { SongPreviewActionsMenu } from '../Menus/SongPreviewActionsMenu.jsx'
import { SongPreviewAddPlaylistMenu } from '../Menus/SongPreviewAddPlaylistMenu.jsx'

export function SongPreview(props) {

    const playerSongId = useSelector(store => store.playerModule.player.song.songId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)
    const [showMenu, setShowMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)

    const { song, stationId, likedSongsStation, myStations, hoveredSongId,
        selectedSongId, index, type, isOwnedByUser, station } = props

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


    function addSong() {

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                updateLikedSongsStation({ ...likedSongsStation, songs: [...likedSongsStation.songs, song] })

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
                    {/* {showMenu && <DropDownMenu listItems={listItems} />} */}
                    {showMenu && <SongPreviewAddPlaylistMenu
                        song={song}
                        myStations={myStations}
                        likedSongsStation={likedSongsStation}
                        setShowMenu={setShowMenu} />}
                </div>
                <span>{utilService.getTimeStr(duration)}</span>
                <div onClick={() => setShowMoreMenu(prevShowMoreMenu => !prevShowMoreMenu)}
                    className="dots-container">
                    {isHighlighted && <DotsButton type="songPreview" elementName={songName} />}
                </div>
                {showMoreMenu && <SongPreviewActionsMenu
                    song={song}
                    station={station}
                    isOwnedByUser={isOwnedByUser}
                    likedSongsStation={likedSongsStation}

                />}
            </div>
        </article>
    )
}

function DynamicButton(props) {
    if (props.isLikedByUser) return <VButton type="addToStation" />
    else if (props.isHighlighted) return <AddToButton type="addToLikedSongs" />
}

