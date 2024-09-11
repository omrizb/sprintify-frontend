import { useSelector } from 'react-redux'
import { MiniSongPreview } from './MiniSongPreview'

export function MiniSongList({ songs, onClickAdd, type = 'simple' }) {

    const currPlayingSong = useSelector(store => store.playerModule.player.song)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    return (currPlayingSong &&
        <ul className="mini-song-list">
            {songs.map(song => {
                const isSongPlaying = song.spotifyId === currPlayingSong.spotifyId && isPlaying
                return <li key={song.spotifyId}>
                    <MiniSongPreview
                        type={type}
                        song={song}
                        isSongPlaying={isSongPlaying}
                        onClickAdd={onClickAdd}
                        showPlayBtn={type === 'with-add-btn'}
                    />
                </li>
            })}
        </ul>
    )
}