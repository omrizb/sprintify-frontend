import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { youtubeService } from '../../services/youtube.service'
import { SongPreview } from '../SongDetails/SongPreview.jsx'
import { SvgButton } from '../SvgButton.jsx'

export function NowPlayingDetails() {

    const player = useSelector(state => state.playerModule.player)
    const stationName = useSelector(state => state.playerModule.stationName)
    const [isLoading, setIsLoading] = useState(true)
    const [song, setSong] = useState(null)

    useEffect(() => {
        loadSong(player.songId)
    }, [player.songId])

    async function loadSong(songId) {
        setIsLoading(true)
        try {
            const ytSong = await youtubeService.getSongById(songId)
            setSong(ytSong)
        } catch (err) {
            console.error(`Couldn't load song from song details`, err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="now-playing-details">
            {isLoading && <div>Loading...</div>}
            {song && (
                <div className='now-playing-details-header'>
                    <div className='header-container'>
                        <Link to={`/track/${song.songId}`}>
                            <div className='link'>{song.songName}</div>
                        </Link>
                        <div className='action-bar-row'>
                            <div>
                                <SvgButton
                                    btnClass={"btn-action-bar"}
                                    svgIcon={"dots"}
                                    svgClass={"svg-small"}
                                    tooltipTxt={`More options for ${song.songName}`}
                                />
                                <SvgButton
                                    btnClass={"btn-action-bar"}
                                    svgIcon={"close"}
                                    svgClass={"svg-small"}
                                    tooltipTxt={"close"}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(song, false, 4)}</pre> */}
                    <SongPreview song={song} index={0} style={'card'} />
                    <SongPreview song={song} index={0} style={'card'} />
                    <SongPreview song={song} index={0} style={'card'} />
                    <SongPreview song={song} index={0} style={'card'} />

                </div>
            )}
        </div>
    )

}