import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'
import { imgService } from '../../services/imgService.js'
import { AddToButton } from '../Buttons/AddToButton.jsx'
import { VButton } from '../Buttons/VButton.jsx'
import { DotsButton } from '../Buttons/DotsButton.jsx'
import { PlayButton } from '../Buttons/PlayButton.jsx'
import { addSongToStation } from '../../store/actions/station.actions.js'

export function SongPreview(props) {

    const playerSongId = useSelector(store => store.playerModule.player.song.songId)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    const { song, stationId, likedSongsStation, hoveredSongId, selectedSongId, index, type, onRemoveSong } = props

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
                console.log('add to liked songs')
                addSongToStation({ ...likedSongsStation, songs: [...likedSongsStation.songs, song] })

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
                {/* <button className="btn-tinted"
                    onClick={() => onRemoveSong(song.songId)}>X
                </button>
                <button className="btn-tinted"
                    onClick={() => onAddSong(song)}>Add
                </button> */}
                <div className="add-btn-container" onClick={addSong}>
                    {<DynamicButton isHighlighted={isHighlighted} isLikedByUser={isLikedByUser} />}
                </div>
                <span>{utilService.getTimeStr(duration)}</span>
                <div className="dots-container">{isHighlighted && <DotsButton type="songPreview" elementName={songName} />}</div>
            </div>
        </article>
    )
}

function DynamicButton(props) {
    if (props.isLikedByUser) return <VButton type="addToStation" />
    else if (props.isHighlighted) return <AddToButton type="addToLikedSongs" />
}

