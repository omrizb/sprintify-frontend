import { useEffect, useRef, useState } from 'react'
import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { updateStation } from '../../store/actions/station.actions.js'

import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgIcon } from '../SvgIcon.jsx'

export function SongList({ station, isOwnedByUser, onRemoveSong, likedSongsStation, type, myStations }) {

    const [hoveredSpotifyId, setHoveredSpotifyId] = useState(null)
    const [selectedSpotifyId, setSelectedSpotifyId] = useState(null)
    const droppableRef = useRef(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    useEffect(() => {
        const el = droppableRef.current

        return dropTargetForElements({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false)
        })
    }, [])

    useEffect(() => {
        return monitorForElements({
            onDrop: ({ location, source }) => {
                const target = location.current.dropTargets[0]
                if (!target || Object.keys(target.data).length === 0) return

                const sourceSongIdx = station.songs.findIndex(song => song.spotifyId === source.data.spotifyId)
                const targetSongIdx = station.songs.findIndex(song => song.spotifyId === target.data.spotifyId)

                console.log(sourceSongIdx)
                console.log(targetSongIdx)

                const newStation = structuredClone(station)
                const sourceSong = newStation.songs.splice(sourceSongIdx, 1)[0]
                newStation.songs.splice(targetSongIdx, 0, sourceSong)
                updateStation(newStation)
            }
        })
    }, [station.songs])

    function onSetSelectedSpotifyId(spotifyId) {
        setSelectedSpotifyId(spotifyId)
    }

    return (
        <div ref={droppableRef} className="song-list inline-container">

            {type === 'table' &&
                <div className={`list-header ${type === 'table' && 'dynamic-grid'}`}>
                    <div className="index">#</div>
                    <div className="title">Title</div>
                    <div className="album">Album</div>
                    <div className="date-added">Date Added</div>
                    <div className="duration"><SvgIcon className="icon" iconName="duration" /></div>
                </div>
            }

            <ul className="list-body">
                {station.songs.map((song, index) => {

                    const draggableRef = useRef(null)
                    const [isDragging, setIsDragging] = useState(false)
                    const [isSongDraggedOver, setIsSongDraggedOver] = useState(false)

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
                                onDragEnter: () => setIsSongDraggedOver(true),
                                onDragLeave: () => setIsSongDraggedOver(false),
                                onDrop: () => {
                                    setIsSongDraggedOver(false)
                                }
                            })
                        )
                    }, [])

                    const selectedSongClass = (song.spotifyId === selectedSpotifyId) ? 'selected' : ''
                    const draggedOverClass = (isSongDraggedOver) ? 'dragged-over' : ''

                    return <li
                        ref={draggableRef}
                        key={song.spotifyId}
                        index={index}
                        className={`song-list-item ${selectedSongClass} ${draggedOverClass}`}
                        onMouseEnter={() => setHoveredSpotifyId(song.spotifyId)}
                        onMouseLeave={() => setHoveredSpotifyId('')}
                        onClick={() => onSetSelectedSpotifyId(song.spotifyId)}
                    >
                        <SongPreview
                            type={type}
                            song={song}
                            station={station}
                            isOwnedByUser={isOwnedByUser}
                            myStations={myStations}
                            stationId={station._id}
                            likedSongsStation={likedSongsStation}
                            onRemoveSong={onRemoveSong}
                            hoveredSpotifyId={hoveredSpotifyId}
                            selectedSpotifyId={selectedSpotifyId}
                            index={index + 1} />
                    </li>
                })}
            </ul>
        </div>
    )
}

