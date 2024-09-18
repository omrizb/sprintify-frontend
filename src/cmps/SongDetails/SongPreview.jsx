import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { addSongToStation } from '../../store/actions/station.actions.js'
import { setIsSongDragged } from '../../store/actions/system.actions.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { SongPreviewActionsMenu } from '../Menus/SongPreviewActionsMenu.jsx'
import { SongPreviewAddPlaylistMenu } from '../Menus/SongPreviewAddPlaylistMenu.jsx'
import { MiniSongPreview } from './MiniSongPreview.jsx'
import { PopUp } from '../PopUp.jsx'
import { youtubeService } from '../../services/youtube.service.js'


export function SongPreview(props) {

    const playerSpotifyId = useSelector(store => store.playerModule.player.song.spotifyId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)
    const isSongDragged = useSelector(state => state.systemModule.isSongDragged)


    const [showMenu, setShowMenu] = useState(false)
    const addBtnRef = useRef(null)
    const [showMoreMenu, setShowMoreMenu] = useState(false)
    const dotsBtnRef = useRef(null)

    const draggableRef = useRef(null)
    const [songDraggedOver, setSongDraggedOver] = useState({ state: false, closestEdge: '' })
    const [dragPreview, setDragPreview] = useState(null)

    useEffect(() => {
        const element = draggableRef.current

        return combine(
            draggable({
                element,
                getInitialData: () => song,
                onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: pointerOutsideOfPreview({
                            x: '8px',
                        }),
                        render: ({ container }) => {
                            setDragPreview(container)
                        }
                    })
                },
                onDragStart: () => {
                    setIsSongDragged(true)
                },
                onDrop: () => {
                    setIsSongDragged(false)
                },
            }),
            dropTargetForElements({
                element,
                canDrop: ({ source }) => {
                    return ('songName' in source.data)
                },
                getData: ({ input }) => attachClosestEdge(song, {
                    element,
                    input,
                    allowedEdges: ['top', 'bottom']
                }),
                onDragEnter: ({ self }) => {
                    const closestEdge = extractClosestEdge(self.data)
                    setSongDraggedOver({ state: true, closestEdge })
                },
                onDrag: ({ self }) => {
                    const closestEdge = extractClosestEdge(self.data)
                    setSongDraggedOver(prev => {
                        if (prev.state === true && prev.edge === closestEdge) {
                            return prev
                        }
                        return { state: true, closestEdge }
                    })
                },
                onDragLeave: () => setSongDraggedOver({ state: false, closestEdge: '' }),
                onDrop: () => {
                    setSongDraggedOver({ state: false, closestEdge: '' })
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
        songDraggedOver.state ? `dragged-over-${songDraggedOver.closestEdge}` : '',
        isSongDragged ? 'dragged' : ''
    ].join(' ')

    async function addSong() {
        if (!song.ytId) {
            var ytSong = await youtubeService.getTopVideo(`song: ${song.songName} by ${song.artist.name}`)
            song.ytId = ytSong.songId
        }

        var status = isLikedByUser ? 'addToStation' : 'addToLikedSongs'
        switch (status) {
            case 'addToLikedSongs':
                const clonedSong = structuredClone(song)
                addSongToStation(likedSongsStation, clonedSong)

                break
            case 'addToStation':
                setShowMenu(prevShowMenu => !prevShowMenu)

                break

            default:
                break
        }
    }

    return (
        <>
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
                <div className="date-added">{utilService.getTimeDiffFromPresentStr(song.addedAt)}</div>
                <div className="song-duration">

                    <div ref={addBtnRef} className="add-btn-container" onClick={addSong}>
                        {<DynamicButton
                            stationId={stationId}
                            likedSongsStation={likedSongsStation}
                            isHighlighted={isHighlighted}
                            isLikedByUser={isLikedByUser}
                        />}
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
            {dragPreview && createPortal(<div className="drag-preview">{song.artist.name} • {song.songName}</div>, dragPreview)}
        </>
    )
}

function DynamicButton(props) {
    if (!props.stationId || !props.likedSongsStation) return

    if (props.stationId === props.likedSongsStation._id) return
    else if (props.isLikedByUser) return <VButton type="addToStation" />
    else if (props.isHighlighted) return <AddToButton type="addToLikedSongs" />
}

