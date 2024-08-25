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
    const [ playBtnActive, setPlayBtnActive ] = useState('')
    const [ artistBtnActive, setArtistBtnActive ] = useState('')
    const [ albumBtnActive, setAlbumBtnActive ] = useState('')
    

    useEffect(() => {
        updateFilterBy(filterToEdit)
    }, [filterToEdit])

   
    function handleChange(stationType) {
        
        if(stationType && showClearFilter) {
            setShowPlaylists(true)
            setShowArtists(true)
            setShowAlbums(true)
            setShowClearFilter(false)
            setPlayBtnActive('')
            setArtistBtnActive('')
            setAlbumBtnActive('')
            setFilterToEdit({ ...filterToEdit, 'stationType': '' })
            return
        }

        
        switch (stationType) {
            case '':
                setShowPlaylists(true)
                setShowArtists(true)
                setShowAlbums(true)
                setPlayBtnActive('')
                setArtistBtnActive('')
                setAlbumBtnActive('')
                break;

            case 'playlist':
                setShowArtists(false)
                setShowAlbums(false)
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