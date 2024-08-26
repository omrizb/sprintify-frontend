import {  useEffect } from 'react'

import { MainStationPreview } from "./MainView/MainStationPreview.jsx"
import { StationPreview } from "./StationPreview.jsx"
import { useSelector } from 'react-redux'
import { stationService } from "../services/station/station.service.local.js"



export function StationList({stations, viewArea}) {

    

    const player = useSelector(storeState => storeState.playerModule.player)
    // console.log(player)
    const playlists = stations.filter(station => station.type === 'playlist')
    
    useEffect(() => {
        loadMainViewColletions()
    
    }, [])

    async function loadMainViewColletions() {
        try {
            const recommended = await stationService.getRecommended('bob', 4)
            console.log(recommended)
            
        } catch (err) {
            
            console.log('MainBody loading stations:', err)
        } 
    }


    return (
        <section className="station-list">

            { viewArea==='leftSide' &&   
                <ul className="left-side-stations">
                    {stations.map(station =>
                        <li key={station._id} >
                            <StationPreview station={station} style={'leftSide'}/>
                        </li>)
                    }
                </ul>
            }

            { viewArea==='mainView' &&  
                <div className="main-view-stations">

                    <div className="stations-top">
                        {playlists.slice(0,8).map(station =>
                            <article key={station._id} >
                                <StationPreview station={station} style={'minimal'}/>
                            </article>)
                        }
                    </div>

                    <div className="stations-recommended">
                        {stations.filter(station => station.type === 'playlist').slice(0,8).map(station =>
                            <article key={station._id} >
                                <StationPreview station={station} style={'square'}/>
                            </article>)
                        }
                    </div>



                </div>
            }
     
        </section>
    )
}

