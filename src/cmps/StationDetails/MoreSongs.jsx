import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { updateStation } from '../../store/actions/station.actions'

import { MiniSongList } from '../SongDetails/MiniSongList'
import { youtubeService } from '../../services/youtube.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { RecommendedSongs } from './RecommendedSongs'
import { SearchAndAdd } from './SearchAndAdd'


export function MoreSongs() {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [showSearchBox, setShowSearchBox] = useState(true)


    useEffect(() => {

    }, [station.songs])

    async function onAddSong(newSong) {

        if (station.songs.length > 0) {
            const isInStation = station.songs.some(song => song.spotifyId === newSong.spotifyId)
            if (isInStation) {
                showSuccessMsg(`Already included in ${station.name}`)
                return
            }
        }

        try {
            const ytSong = await youtubeService.getTopVideo(`song: ${newSong.songName} by ${newSong.artist.name}`)
            newSong.ytId = ytSong.songId
            newSong.addedAt = Date.now()

            if (station.songs.length === 0) {
                var updatedStation = {
                    ...station,
                    stationImgUrl: newSong.imgUrl.big,
                    songs: [...station.songs, newSong]
                }

            }
            else updatedStation = { ...station, songs: [...station.songs, newSong] }
            updateStation(updatedStation)
            showSuccessMsg(`Added to ${updatedStation.name}`)


        } catch (error) {
            showErrorMsg('Cannot add song - youTube is blocking')

        }

    }


    return (
        <div className="more-songs">

            {showSearchBox && <div>
                <SearchAndAdd
                    setShowSearchBox={setShowSearchBox}
                    setSongs={setSongs} />
                {songs &&
                    <MiniSongList
                        type={'with-add-btn'}
                        songs={songs}
                        onClickAdd={onAddSong} />}
            </div>
            }

            {(!showSearchBox) &&
                <p onClick={() => setShowSearchBox(true)}>Find more</p>}

            {(station.songs.length > 0) &&
                <RecommendedSongs
                    type={'with-add-btn'}
                    station={station}
                    setSongs={setRecommendedSongs} />}

            {recommendedSongs &&
                <MiniSongList
                    type={'with-add-btn'}
                    songs={recommendedSongs}
                    onClickAdd={onAddSong} />}

        </div>
    )
}