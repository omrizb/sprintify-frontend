import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions' 


export function StationFilterButtons() {

    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))
    const [ showClearFilter, setShowClearFilter ] = useState(false)
    const [ showPlaylists, setShowPlaylists ] = useState(true)
    const [ showArtists, setShowArtists ] = useState(true)
    const [ showAlbums, setShowAlbums ] = useState(true)
    const [ showSubFilter, setShowSubFilter ] = useState(false)
    const [ playBtnActive, setPlayBtnActive ] = useState('')
    const [ artistBtnActive, setArtistBtnActive ] = useState('')
    const [ albumBtnActive, setAlbumBtnActive ] = useState('')
    

    useEffect(() => {
        updateFilterBy(filterToEdit)
    }, [filterToEdit])

   
    function handleChange(stationType) {
        
        if(stationType && showClearFilter) {
            resetAllBtns()
            setShowClearFilter(false)
            setFilterToEdit({ ...filterToEdit, 'stationType': '' })
            return
        }

        switch (stationType) {
            case '':
                resetAllBtns()
                break;

            case 'playlist':
                setShowArtists(false)
                setShowAlbums(false)
                setShowSubFilter(true)
                setPlayBtnActive('active')
                break
            case 'artist':
                setShowPlaylists(false)
                setShowAlbums(false)
                setArtistBtnActive('active')
                break
            case 'album':
                setShowPlaylists(false)
                setShowArtists(false)
                setAlbumBtnActive('active')
                break
             
        }

        setFilterToEdit({ ...filterToEdit, 'stationType': stationType })
        setShowClearFilter(prevShowClearFilter => !prevShowClearFilter)
        
    }

    function resetAllBtns(){
        setShowPlaylists(true)
        setShowArtists(true)
        setShowAlbums(true)
        setShowSubFilter(false)
        setPlayBtnActive('')
        setArtistBtnActive('')
        setAlbumBtnActive('')
    }
    
    
    return (
            <div className="station-filter-btns">

                {showClearFilter &&
                    <button 
                        className="btn-tinted clear-filter"
                        onClick={() => handleChange('')}
                        >X
                    </button>
                }


                {showPlaylists &&
                    <button 
                        className={`btn-tinted ${playBtnActive}`}
                        onClick={() => handleChange('playlist')}
                        >Playlists
                    </button>
                }

                {showSubFilter && 
                    <div className="sub-filter">
                        <button className="btn-tinted">By Sprintify</button>
                        <button className="btn-tinted">By you</button>

                    </div> }

                {showArtists &&
                    <button 
                        className={`btn-tinted ${artistBtnActive}`}
                        onClick={() => handleChange('artist')}
                        >Artists
                    </button>
                }

                {showAlbums &&
                    <button 
                    className={`btn-tinted ${albumBtnActive}`}
                        onClick={() => handleChange('album')}
                        >Albums
                    </button>
                }

            </div>

    )
}