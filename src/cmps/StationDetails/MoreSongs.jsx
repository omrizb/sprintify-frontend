import { useSelector } from 'react-redux'
import { useState } from 'react'

import { addSongToStation } from '../../store/actions/station.actions'

import { MiniSongList } from '../SongDetails/MiniSongList'

import { RecommendedSongs } from './RecommendedSongs'
import { SearchAndAdd } from './SearchAndAdd'


export function MoreSongs() {

    const station = useSelector(storeState => storeState.stationModule.station)
    const [songs, setSongs] = useState([])
    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [showSearchBox, setShowSearchBox] = useState(true)

    function onAddSong(newSong) {
        addSongToStation(station, newSong, true)
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