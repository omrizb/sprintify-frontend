import { useSelector } from 'react-redux'
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
                <div className="header-text">Next in queue</div>
                <MiniSongList songs={songsAddedManually} />
            </>}

            <div className="header-text">Next from: {stationName}</div>
            <MiniSongList songs={remainingStationSongs} />
        </div>
    )
}