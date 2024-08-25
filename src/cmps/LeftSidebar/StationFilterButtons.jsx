import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateFilterBy } from '../../store/actions/filterBy.actions' 


export function StationFilterButtons() {

    const filterBy = useSelector(storeState => storeState.filterByModule.filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    const initBtnsDispObj = {
        clearFilter: {showBtn: false, isActive: ''},
        playlists:   {showBtn: true,  isActive: ''},
        artists:     {showBtn: true,  isActive: ''},
        albums:      {showBtn: true,  isActive: ''},
        byYou:      {showBtn: false, isActive: ''},
        bySprintify: {showBtn: false, isActive: ''},
    }

    const [ btnsDispObj, setBtnsDispObj ] = useState({...initBtnsDispObj})

    useEffect(() => {
        updateFilterBy(filterToEdit)
    }, [filterToEdit])

   
    function handleChange(stationType) {
        
        if(stationType && btnsDispObj.clearFilter.showBtn) {
            resetAllBtns()
            setFilterToEdit({ ...filterToEdit, 'stationType': '' })
            return
        }

        switch (stationType) {
            case '':
                resetAllBtns()
                break;

            case 'playlist':
                setBtnsDispObj({...btnsDispObj, 'artists': {...artists, 'showBtn': false},
                                                 'albums': {...albums, 'showBtn': false},
                                                'playlists': {...playlists, 'isActive': 'active'},
                                                'clearFilter': {...clearFilter, 'showBtn': true},
                                                'byYou': {...byYou, 'showBtn': true},
                                                'bySprintify': {...bySprintify, 'showBtn': true}
                            })
                break
            case 'artist':
                setBtnsDispObj({...btnsDispObj, 'playlists': {...playlists, 'showBtn': false},
                                                'albums': {...albums, 'showBtn': false},
                                                'artists': {...artists, 'isActive': 'active'},
                                                'clearFilter': {...clearFilter, 'showBtn': true},
                                                'byYou': {...byYou, 'showBtn': false},
                                                'bySprintify': {...bySprintify, 'showBtn': false}
                                })
                
                break
            case 'album':
                setBtnsDispObj({...btnsDispObj, 'playlists': {...playlists, 'showBtn': false},
                                                'artists': {...artists, 'showBtn': false},
                                                'albums': {...albums, 'isActive': 'active'},
                                                'clearFilter': {...clearFilter, 'showBtn': true},
                                                'byYou': {...byYou, 'showBtn': false},
                                                'bySprintify': {...bySprintify, 'showBtn': false}
                                })
                break
        }

        setFilterToEdit({ ...filterToEdit, 'stationType': stationType })
    }

    function resetAllBtns(){
        setBtnsDispObj(structuredClone(initBtnsDispObj))
    }
    
    const { clearFilter, playlists, artists, albums, byYou, bySprintify } = btnsDispObj
    return (
            <div className="station-filter-btns">

                {clearFilter.showBtn &&
                    <button 
                        className="btn-tinted clear-filter"
                        onClick={() => handleChange('')}
                        >X
                    </button>
                }


                {playlists.showBtn &&
                    <button 
                        className={`btn-tinted ${playlists.isActive}`}
                        onClick={() => handleChange('playlist')}
                        >Playlists
                    </button>
                }

                
                {artists.showBtn &&
                    <button 
                        className={`btn-tinted ${artists.isActive}`}
                        onClick={() => handleChange('artist')}
                        >Artists
                    </button>
                }

                {albums.showBtn &&
                    <button 
                    className={`btn-tinted ${albums.isActive}`}
                        onClick={() => handleChange('album')}
                        >Albums
                    </button>
                }


                <div className="sub-filter">
                    {bySprintify.showBtn &&
                            <button 
                                className="btn-tinted">
                                By Sprintify
                            </button>} 
                    {byYou.showBtn &&
                            <button 
                                className="btn-tinted">
                                By You
                            </button>} 
                </div> 

            </div>

    )
}