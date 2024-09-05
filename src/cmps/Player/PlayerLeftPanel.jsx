import { useSelector } from 'react-redux'
import { MiniSongPreview } from '../SongDetails/MiniSongPreview'

export function PlayerLeftPanel() {

    const song = useSelector(store => store.playerModule.player.song)

    return (
        <div className="player-left-panel">
            {song && <MiniSongPreview song={song} type="bigger" />}
        </div>
    )
}