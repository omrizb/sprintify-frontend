import {  useState, useEffect } from 'react'

import { MainStationPreview } from "./MainView/MainStationPreview.jsx"
import { StationPreview } from "./StationPreview.jsx"
import { useSelector } from 'react-redux'
import { stationService } from "../services/station/station.service.local.js"



export function StationList({stations, viewArea}) {

    

    const player = useSelector(storeState => storeState.playerModule.player)
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [topMixes, setTopMixes] = useState([])
    const [madeForYou, setMadeForYou] = useState([])
    // console.log(player)
    
    
    useEffect(() => {
        loadMainViewColletions()
    
    }, [])

    async function loadMainViewColletions() {
        try {
            const recentlyPlayedList = await stationService.getRecentlyPlayed('bob', 4)
            const topMixesList = await stationService.getTopMixes('bob', 4)
            const madeForYouList = await stationService.getMadeForYou('bob', 4)
            
            setRecentlyPlayed(recentlyPlayedList)
            setTopMixes(topMixesList)
            setMadeForYou(madeForYouList)
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
                    <ul className="stations-top">
                        {stations.slice(0,8).map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'minimal'}/>
                            </li>)
                        }
                    </ul>

                    <ul className="stations-recently-played">
                        Recently Played
                        {recentlyPlayed.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'}/>
                            </li>)
                        }
                    </ul>
                    <ul className="stations-top-mixed">
                        Your Top Mixes
                        {topMixes.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'}/>
                            </li>)
                        }
                    </ul>
                    <ul className="stations-recently-played">
                        Made For You
                        {madeForYou.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'}/>
                            </li>)
                        }
                    </ul>



                </div>
            }
     
        </section>
    )
}

