import { useSelector } from 'react-redux'
import { useState } from 'react'

import { updateStation } from '../../store/actions/station.actions'

import { MiniSongList } from '../SongDetails/MiniSongList'
import { youtubeService } from '../../services/youtube.service'
import { showSuccessMsg } from '../../services/event-bus.service'
import { RecommendedSongs } from './RecommendedSongs'
import { SearchAndAdd } from './SearchAndAdd'


export function MoreSongs() {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const [showSearchBox, setShowSearchBox] = useState(true)

    async function onAddSong(newSong) {
        const isInStation = station.songs.some(song => song.spotifyId === newSong.spotifyId)
        if (isInStation) {
            showSuccessMsg(`Already included in ${station.name}`)
            return
        }
        const ytSong = await youtubeService.getTopVideo(`song: ${newSong.songName} by ${newSong.artist.name}`)
        newSong.ytId = ytSong.songId
        const updatedStation = { ...station, songs: [...station.songs, newSong] }
        updateStation(updatedStation)
    }


    return (
        <div className="more-songs">

            {showSearchBox &&
                <SearchAndAdd setShowSearchBox={setShowSearchBox} setSongs={setSongs} />
            }


            {(!showSearchBox) && <div>
                <p onClick={() => setShowSearchBox(true)}>Find more</p>
                <RecommendedSongs type={'with-add-btn'} station={station} setSongs={setSongs} />
            </div>

            }


            {songs &&
                <MiniSongList type={'with-add-btn'} songs={songs} onClickAdd={onAddSong} />}
        </div>
    )
}