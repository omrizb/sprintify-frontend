import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { StationPreview } from './StationPreview.jsx'
import { stationService } from '../services/station/station.service.local.js'



export function StationList({ stations, viewArea }) {

    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [topMixes, setTopMixes] = useState([])
    const [madeForYou, setMadeForYou] = useState([])

    useEffect(() => {
        loadMainViewCollections()
    }, [])

    async function loadMainViewCollections() {
        try {
            const recentlyPlayedList = await stationService.getRecentlyPlayed('bob', 4)
            const topMixesList = await stationService.getTopMixes('bob', 4)
            const madeForYouList = await stationService.getMadeForYou('bob', 4)

            setRecentlyPlayed(recentlyPlayedList)
            setTopMixes(topMixesList)
            setMadeForYou(madeForYouList)
        } catch (err) {
            console.log('MainBody loadMainViewCollections error:', err)
        }
    }


    return (
        <section className="station-list">

            {viewArea === 'leftSide' &&
                <ul className="left-side-stations">
                    {stations.map(station =>
                        <li key={station._id} >
                            <Link to={`/station/${station._id}`}>
                                <StationPreview station={station} style={'leftSide'} />
                            </Link>
                        </li>)
                    }
                </ul>
            }

            {viewArea === 'mainView' &&
                <div className="main-view-stations">
                    <ul className="stations-top">
                        {stations.slice(0, 8).map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'minimal'} />
                            </li>)
                        }
                    </ul>

                    <header>
                        <h2>Recently Played</h2>
                        <p>Show all</p>
                    </header>
                    <ul className="card-stations recently-played">
                        {recentlyPlayed.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'} />
                            </li>)
                        }
                    </ul>

                    <header>
                        <h2>Your Top Mixes</h2>
                        <p>Show all</p>
                    </header>
                    <ul className="card-stations top-mixed">
                        {topMixes.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'} />
                            </li>)
                        }
                    </ul>

                    <header>
                        <h2>Made For You</h2>
                        <p>Show all</p>
                    </header>
                    <ul className="card-stations made-for-you">
                        {madeForYou.map(station =>
                            <li key={station._id} >
                                <StationPreview station={station} style={'card'} />
                            </li>)
                        }
                    </ul>



                </div>
            }

        </section>
    )
}

