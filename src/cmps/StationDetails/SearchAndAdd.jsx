import { useState } from 'react'
import { updateStation } from '../../store/actions/station.actions'
import { SvgIcon } from '../SvgIcon'

import { utilService } from '../../services/util.service'
import { spotifyService } from '../../services/spotify.service'



export function SearchAndAdd({ setShowSearchBox, setSongs }) {

    const [searchText, setSearchText] = useState('')

    const debouncedLoadSongs = utilService.debounce(loadSongs, 500)

    function handleChange(ev) {
        setSearchText(ev.target.value)
        debouncedLoadSongs(ev.target.value)
    }

    async function loadSongs(value) {
        if (!value) return
        try {
            const results = await spotifyService.search(value, 10)
            const loadedSongs = results.songs

            setSongs(loadedSongs)

        } catch (err) {
            console.log(`Couldn't load songs`, err)
        }
    }

    return (
        <div className="search-and-add">
            <h1>Let's find something for your playlist
                <span
                    className="btn-medium"
                    onClick={() => setShowSearchBox(false)}
                >X</span>
            </h1>

            <div className="search-box">
                <div className="search icon"><SvgIcon iconName={"search"} /> </div>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search for songs?"
                    value={searchText}
                    onChange={handleChange}
                    required
                />
                <div className="clear-search"
                    onClick={() => {
                        setSearchText('')
                        setSongs([])
                    }}>X</div>
            </div>



        </div>
    )
}