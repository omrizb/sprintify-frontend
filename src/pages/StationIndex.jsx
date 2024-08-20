import { Outlet } from 'react-router-dom'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { utilService } from '../services/util.service.js'

import { LeftSidebar } from '../cmps/LeftSidebar.jsx'
import { NowPlayingDetails } from '../cmps/NowPlayingDetails.jsx'
import { Player } from '../cmps/Player.jsx'
import { MainViewHeader } from '../cmps/MainViewHeader.jsx'

import { youtubeService } from '../services/youtube.service.js'

export function StationIndex() {

    const songs = [
        'Queen Bohemian Rhapsody',
        'Ed Sheeran Shape of You',
        'Michael Jackson Billie Jean',
        'The Weeknd Blinding Lights',
        'Eagles Hotel California',
        'Adele Rolling in the Deep',
        'Mark Ronson ft. Bruno Mars Uptown Funk',
        'Nirvana Smells Like Teen Spirit',
        'Led Zeppelin Stairway to Heaven',
        'Ed Sheeran Thinking Out Loud',
        'The Beatles Hey Jude',
        'Lady Gaga & Bradley Cooper Shallow',
        'Luis Fonsi ft. Daddy Yankee Despacito',
        'Guns N\' Roses Sweet Child O\' Mine',
        'Billie Eilish Bad Guy',
        'Bee Gees Stayin\' Alive',
        'Whitney Houston I Will Always Love You',
        'John Legend All of Me',
        'Journey Don\'t Stop Believin\'',
        'Pharrell Williams Happy',
        'a-ha Take on Me',
        'The Chainsmokers ft. Halsey Closer',
        'Toto Africa',
        'Adele Someone Like You',
        'Oasis Wonderwall',
        'Lil Nas X ft. Billy Ray Cyrus Old Town Road',
        'Michael Jackson Beat It',
        'Camila Cabello ft. Young Thug Havana',
        'John Lennon Imagine',
        'Justin Bieber Sorry',
        'Bon Jovi Livin\' on a Prayer',
        'Shawn Mendes & Camila Cabello Señorita',
        'The Killers Mr. Brightside',
        'Justin Timberlake Can\'t Stop the Feeling!',
        'Bob Dylan Like a Rolling Stone',
        'Post Malone ft. 21 Savage Rockstar',
        'Eminem Lose Yourself',
        'Taylor Swift Shake It Off',
        'ABBA Dancing Queen',
        'Dua Lipa Levitating',
        'Michael Jackson Thriller',
        'Imagine Dragons Radioactive',
        'Survivor Eye of the Tiger',
        'Shawn Mendes & Camila Cabello Señorita',
        'Marvin Gaye What’s Going On',
        'Maroon 5 ft. Cardi B Girls Like You',
        'The Dandy Warhols Bohemian Like You',
        'Ed Sheeran Perfect',
        'The Beatles I Want to Hold Your Hand',
        'Lady Gaga Bad Romance',
        'Gotye ft. Kimbra Somebody That I Used to Know',
        'Pink Floyd Another Brick in the Wall',
        'The Police Roxanne',
        'The Black Eyed Peas I Gotta Feeling',
        'Bob Dylan Blowin\' in the Wind',
        'Alan Walker Faded',
        'Beyoncé Single Ladies (Put a Ring on It)',
        'Avicii Wake Me Up',
        'Bob Marley & The Wailers No Woman, No Cry',
        'Queen We Will Rock You',
        'Linkin Park In the End',
        'Stevie Wonder Superstition',
        'Adele Hello',
        'Rihanna ft. Jay-Z Umbrella',
        'The Rolling Stones Paint It Black',
        'Beyoncé Halo',
        'The Beatles Let It Be',
        'Rihanna ft. Calvin Harris We Found Love',
        'David Bowie Heroes',
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
        // printVideos(songs)
    }, [])

    async function printVideos(songs) {
        const res = []
        for (let idx = 0; idx < 1; idx++) {
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