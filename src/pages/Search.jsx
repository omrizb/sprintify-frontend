import { Link, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../cmps/Footer";
import { SearchBox } from "../cmps/SearchBox";
import { SearchTopic } from "../cmps/SearchTopic";
import { utilService } from "../services/util.service";
import { DropDownMenu } from "../cmps/Menus/DropDownMenu";
import { PopUp } from "../cmps/PopUp";
import { logout } from "../store/actions/user.actions";
import { ProfileButton } from "../cmps/ProfileButton";


export function Search() {


    const navigate = useNavigate()
    const debouncedNavigate = utilService.debounce(navToResults, 500)
    const location = useLocation()
    const isBrowse = location.pathname === '/search'


    function handleChange(ev) {
        var value = ev.target.value
        debouncedNavigate(value)
    }

    function navToResults(value) {
        navigate(`/search/${value}`)
    }



    const topics = ['Music', 'Podcasts', 'Live Events', 'Made For You', 'New Releases',
        'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Podcast Charts', 'Educational',
        'Documentary', 'Comedy', 'Charts', 'Dance/Electronic', 'Mood',
        'Indie', 'Workout', 'Discover', 'Country', 'R&B', 'K-Pop', 'Chill',
        'Sleep', 'Party', 'At Home', 'Decades', 'Love', 'Metal', 'Jazz',
        'Trending', 'Wellness', 'Anime', 'Gaming', 'Folk & Acoustic', 'Focus',
        'Soul', 'Kids & Family', 'Classical', 'Tv & Movies', 'Instrumental', 'Punk',
        'Ambient', 'Netflix', 'Blues', 'Cooking & Dining', 'Alternative', 'Travel',
        'Caribbean', 'Afro', 'Glow', 'Songwriters', 'Nature & Noise', 'Funk & Disco',
        'Spotify Singles', 'Summer', 'Equal', 'Radar', 'Fresh Finds', 'Tastemakers']

    const mainColors = ['rgb(220, 20, 140)', 'rgb(0, 100, 80)', 'rgb(132, 0, 231)', 'rgb(30, 50, 100)',
        'rgb(96, 129, 8)', 'rgb(71, 125, 149)']

    const first6Colors = mainColors.slice(0, 6)

    const colors = [
        ...first6Colors,
        ...Array.from({ length: 54 }, () => first6Colors[Math.floor(Math.random() * first6Colors.length)])
    ]
    // console.log(colors)

    const allImgKeys = [
        'music', 'podcasts', 'liveEvents', 'madeForYou', 'newReleases', 'pop', 'hipHop', 'rock',
        'latin', 'podcastCharts', 'educational', 'documentary', 'comedy', 'charts', 'danceElectronic',
        'mood', 'indie', 'workout', 'discover', 'country', 'rAndB', 'kPop', 'chill', 'sleep', 'party',
        'atHome', 'decades', 'love', 'metal', 'jazz', 'trending', 'wellness', 'anime', 'gaming',
        'folkAcoustic', 'focus', 'soul', 'kidsFamily', 'classical', 'tvMovies', 'instrumental', 'punk',
        'ambient', 'netflix', 'blues', 'cookingDining', 'alternative', 'travel', 'caribbean', 'afro',
        'glow', 'songwriters', 'natureNoise', 'funkDisco', 'spotifySingles', 'summer', 'equal',
        'radar', 'freshFinds', 'tastemakers']

    const first10Items = allImgKeys.slice(0, 10)

    const imgKeys = [
        ...first10Items,
        ...Array.from({ length: 50 }, () => first10Items[Math.floor(Math.random() * first10Items.length)])
    ]

    function onClick(topic) {
        console.log(topic)

    }


    return (
        <div className="search-page">

            <div className='mobile-header'>
                <ProfileButton />
                <h1>Search</h1>
            </div>

            <Link to={`/search`}>
                <SearchBox handleChange={handleChange} isBrowse={isBrowse} className="mobile" />
            </Link>

            <h1 className="desktop-title">Browse all</h1>

            <ul className="browse-topics">
                {topics.map((topic, index) => {

                    return <li key={index}>
                        <SearchTopic
                            topic={topic}
                            imgKey={imgKeys[index]}
                            color={colors[index]}
                            onClick={onClick} />

                    </li>
                })}
            </ul >

            <Footer />
        </div>
    )
}

