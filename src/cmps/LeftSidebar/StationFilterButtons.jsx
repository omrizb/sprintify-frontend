import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions' 


export function StationFilterButtons() {

    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    

    useEffect(() => {
        updateFilterBy(filterToEdit)
    }, [filterToEdit])

   
    function handleChange(stationType) {
        
        setFilterToEdit({ ...filterToEdit, 'stationType': stationType })
    }
    
    
    return (
            <div className="category">
                <button 
                    className="btn-tinted"
                    onClick={() => handleChange('playlist')}
                    >Playlists
                </button>

                <button 
                    className="btn-tinted"
                    onClick={() => handleChange('artist')}
                    >Artists
                </button>

                <button 
                    className="btn-tinted"
                    onClick={() => handleChange('album')}
                    >Albums
                </button>

            </div>

    )
}