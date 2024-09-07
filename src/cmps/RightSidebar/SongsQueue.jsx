import { useSelector } from 'react-redux'

import { playerActions, setPlayerAction } from '../../store/actions/player.actions'
import { MiniSongList } from '../SongDetails/MiniSongList'

export function SongsQueue() {

    const currPlayingSong = useSelector(store => store.playerModule.player.song)
    const stationName = useSelector(store => store.playerModule.stationName)
    const remainingStationSongs = useSelector(store => store.playerModule.queue.remainingStationSongs)
    const songsAddedManually = useSelector(store => store.playerModule.queue.songsAddedManually)

    return (currPlayingSong && stationName && remainingStationSongs && songsAddedManually &&
        <div className="songs-queue">

            <div className="header-text">Now playing</div>
            <MiniSongList songs={[currPlayingSong]} />

            {songsAddedManually.length > 0 && <>
                <div className="queue-header">
                    <div className="header-text">Next in queue</div>
                    <div className="clear-queue" onClick={() => setPlayerAction(playerActions.CLEAR_QUEUE)}>
                        Clear queue
                    </div>
                </div>
                <MiniSongList songs={songsAddedManually} />
            </>}

            <div className="header-text">Next from: {stationName}</div>
            <MiniSongList songs={remainingStationSongs} />
        </div>
    )
}