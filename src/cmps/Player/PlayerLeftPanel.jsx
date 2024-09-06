import { useSelector } from 'react-redux'
import { MiniSongPreview } from '../SongDetails/MiniSongPreview'

export function PlayerLeftPanel() {

    const song = useSelector(store => store.playerModule.player.song)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    return (
        <div className="player-left-panel">
            {song && <MiniSongPreview song={song} isCurrentlyPlaying={isPlaying} type="bigger" />}
        </div>
    )
}