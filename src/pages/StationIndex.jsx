import { Outlet } from 'react-router-dom'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { utilService } from '../services/util.service.js'

import { LeftSidebar } from '../cmps/LeftSidebar.jsx'
import { NowPlayingDetails } from '../cmps/NowPlayingDetails.jsx'
import { Player } from '../cmps/Player.jsx'
import { MainViewHeader } from '../cmps/MainViewHeader.jsx'

import { youtubeService } from '../services/youtube.service.js'

export function StationIndex() {

    const songs2 = [
        'Lady Gaga Poker Face',
        'AC/DC Highway to Hell',
        'The Turtles Happy Together',
        'Queen Somebody to Love',
        'Drake Hotline Bling',
        'Roberta Flack Killing Me Softly With His Song',
        'Ed Sheeran Castle on the Hill',
        'Van Halen Jump',
        'Drake ft. Wizkid & Kyla One Dance',
        'Passenger Let Her Go',
        'Bruce Springsteen Born to Run',
        'OneRepublic Counting Stars',
        'Guns N\' Roses November Rain',
        'Miley Cyrus Wrecking Ball',
        'Daft Punk ft. Pharrell Williams Lose Yourself to Dance',
        'No Doubt Don\'t Speak',
        'David Guetta ft. Sia Titanium',
        'Earth, Wind & Fire Boogie Wonderland',
        'Lorde Royals',
        'Madonna Like a Prayer',
        'Kings of Leon Use Somebody',
        'Akon ft. Eminem Smack That',
        'Keane Somewhere Only We Know',
        'Eminem The Real Slim Shady',
        'The Killers Human',
        'Aerosmith I Don\'t Want to Miss a Thing',
        'Demi Lovato Sorry Not Sorry',
        'Green Day Boulevard of Broken Dreams',
        'Celine Dion My Heart Will Go On',
        'The Cranberries Zombie',
        'Adele Rolling in the Deep'
    ]

    useEffectOnUpdate(() => {
        // printVideos(songs2)
    }, [])

    async function printVideos(songs) {
        const res = []
        for (let idx = 0; idx < songs.length; idx++) {
            const song = songs[idx]
            res.push(await youtubeService.getTopVideo(song))
            console.log(idx + 1)
            await utilService.sleep(500)
        }
        console.log(res)
    }



    return (
        <div className="station-index main-layout">
            <div className="left-sidebar-container">
                <LeftSidebar />
            </div>
            <div className="main-view-container">
                <MainViewHeader />
                <Outlet />
            </div>
            <div className="right-sidebar-container">
                <NowPlayingDetails />
            </div>
            <div className="now-playing-bar-container">
                <Player />
            </div>
        </div>
    )
}