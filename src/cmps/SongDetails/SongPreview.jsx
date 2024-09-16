import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { addSongToStation } from '../../store/actions/station.actions.js'
import { SongPreviewActionsMenu } from '../Menus/SongPreviewActionsMenu.jsx'
import { SongPreviewAddPlaylistMenu } from '../Menus/SongPreviewAddPlaylistMenu.jsx'
import { MiniSongPreview } from './MiniSongPreview.jsx'
import { PopUp } from '../PopUp.jsx'
import { youtubeService } from '../../services/youtube.service.js'


export function SongPreview(props) {

    const playerSpotifyId = useSelector(store => store.playerModule.player.song.spotifyId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)
    const [showMenu, setShowMenu] = useState(false)
    const addBtnRef = useRef(null)
    const [showMoreMenu, setShowMoreMenu] = useState(false)
    const dotsBtnRef = useRef(null)

    const draggableRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [songDraggedOver, setSongDraggedOver] = useState({ state: false, edge: '' })

    useEffect(() => {
        const element = draggableRef.current

        return combine(
            draggable({
                element,
                getInitialData: () => song,
                onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    const emptyImage = new Image()
                    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
                    emptyImage.style.display = 'none'
                    nativeSetDragImage(emptyImage, 0, 0)
                },
                onDragStart: () => setIsDragging(true),
                onDrop: () => setIsDragging(false),
            }),
            dropTargetForElements({
                element,
                canDrop: ({ source }) => {
                    if (source.element === element) return false
                    return ('songName' in source.data)
                },
                getData: ({ input }) => attachClosestEdge(song, {
                    element,
                    input,
                    allowedEdges: ['top', 'bottom']
                }),
                onDragEnter: () => setSongDraggedOver(true),
                onDragLeave: () => setSongDraggedOver(false),
                onDrop: () => {
                    setSongDraggedOver(false)
                }
            })
        )
    }, [])

    const { song, stationId, likedSongsStation, myStations, hoveredSpotifyId,
        selectedSpotifyId, index, type, isOwnedByUser, station } = props

    let articleClassType
    switch (type) {
        case 'table':
            articleClassType = 'table dynamic-grid'
            break
        case 'mini-table':
            articleClassType = 'mini-table dynamic-grid'
    }

    const { spotifyId, songName, album, duration } = song
    const isHovered = song.spotifyId === hoveredSpotifyId
    const isHighlighted = isHovered || song.spotifyId === selectedSpotifyId
    const isLikedByUser = likedSongsStation && likedSongsStation.songs.some(song => song.spotifyId === spotifyId)
    const isCurrentlyPlaying = song.spotifyId === playerSpotifyId && isPlaying

    const songPreviewClass = [
        'song-preview',
        articleClassType,
        isHighlighted ? 'highlight' : '',
        isCurrentlyPlaying ? 'currently-playing' : '',
        songDraggedOver.state ? `dragged-over-${songDraggedOver.edge}` : ''
    ].join(' ')

    async function addSong() {
        if (!song.ytId) {
            var ytSong = await youtubeService.getTopVideo(`song: ${song.songName} by ${song.artist.name}`)
            song.ytId = ytSong.songId
        }

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                if (!song.ytId) {
                    showErrorMsg('Defective song')
                    return
                }
                addSongToStation({
                    ...likedSongsStation,
                    songs: [
                        ...likedSongsStation.songs,
                        { ...song, addedAt: Date.now() }
                    ]
                })

                break
            case 'addToStation':
                setShowMenu(prevShowMenu => !prevShowMenu)

                break

            default:
                break
        }
    }

    return (
        <article ref={draggableRef} className={songPreviewClass}>
            <div className="index flex">
                {isHovered
                    ? <PlayButton
                        type="songPreview"
                        stationId={stationId}
                        song={song}
                    />
                    : isCurrentlyPlaying
                        ? <img src={imgService.getImg('equalizerAnimatedGreen')} />
                        : index}
            </div>
            <MiniSongPreview
                song={song}
                isCurrentlyPlaying={isCurrentlyPlaying}
                showPlayBtn={type === 'mini-table'}
            />
            {(!props.isSearchOrigin) && <div className="album">{album.name}</div>}
            <div className="date-added">{song.addedAt}</div>
            <div className="song-duration">

                <div ref={addBtnRef} className="add-btn-container" onClick={addSong}>
                    {<DynamicButton isHighlighted={isHighlighted} isLikedByUser={isLikedByUser} />}
                    {showMenu && <PopUp btnRef={addBtnRef} onClosePopUp={() => setShowMenu(false)} >
                        <SongPreviewAddPlaylistMenu
                            song={song}
                            myStations={myStations}
                            likedSongsStation={likedSongsStation}
                            setShowMenu={setShowMenu} />
                    </PopUp>}
                </div>
                <span>{utilService.getTimeStr(duration)}</span>
                <div ref={dotsBtnRef} onClick={() => setShowMoreMenu(prevShowMoreMenu => !prevShowMoreMenu)}
                    className="dots-container">
                    {isHighlighted && <DotsButton type="songPreview" elementName={songName} />}
                </div>

                {showMoreMenu && <PopUp btnRef={dotsBtnRef} onClosePopUp={() => setShowMoreMenu(false)} >
                    <SongPreviewActionsMenu
                        song={song}
                        station={station}
                        isOwnedByUser={isOwnedByUser}
                        likedSongsStation={likedSongsStation}
                        myStations={myStations}

                    />
                </PopUp>}
            </div>
        </article>
    )
}

function DynamicButton(props) {
    if (props.isLikedByUser) return <VButton type="addToStation" />
    else if (props.isHighlighted) return <AddToButton type="addToLikedSongs" />
}

