import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MiniSongPreview } from './MiniSongPreview'

export function MiniSongList({ songs }) {

    const currPlayingSong = useSelector(store => store.playerModule.player.song)
    const isPlaying = useSelector(store => store.playerModule.player.isPlaying)

    // const [visibleSongs, setVisibleSongs] = useState(songs)
    // const [animateClasses, setAnimateClasses] = useState({})

    // Sliding in and out animation logic
    // useEffect(() => {
    //     const newAnimateClasses = {};
    //     songs.forEach((song, idx) => {
    //         if (visibleSongs[idx]?.songId !== song.songId) {
    //             newAnimateClasses[song.songId] = 'slide-in'
    //         } else {
    //             newAnimateClasses[song.songId] = 'enter'
    //         }
    //     })

    //     visibleSongs.forEach(song => {
    //         if (!songs.find(s => s.songId === song.songId)) {
    //             newAnimateClasses[song.songId] = 'slide-out'
    //         }
    //     })

    //     setAnimateClasses(newAnimateClasses);
    //     setTimeout(() => {
    //         setVisibleSongs(songs);
    //     }, 500)
    // }, [songs])

    return (currPlayingSong &&
        <ul className="mini-song-list">
            {songs.map(song => {
                const isSongPlaying = song.songId === currPlayingSong.songId && isPlaying
                return <li key={song.songId}>
                    <MiniSongPreview song={song} isSongPlaying={isSongPlaying} />
                </li>
            })}
        </ul >
    )
}