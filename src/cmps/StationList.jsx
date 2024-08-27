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
                    
                    <header>
                        <h2>Recently Played</h2>
                        <p>Show all</p>
                    </header>
                    <ul className="stations-recently-played">
                        {recentlyPlayed.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'}/>
                            </li>)
                        }
                    </ul>

                    <header>
                        <h2>Your Top Mixes</h2> 
                        <p>Show all</p>
                    </header>
                    <ul className="stations-top-mixed">
                        {topMixes.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'}/>
                            </li>)
                        }
                    </ul>

                    <header>
                        <h2>Made For You</h2> 
                        <p>Show all</p>
                    </header>
                    <ul className="stations-for-you">
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

