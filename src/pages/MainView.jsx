export function MainView() {

    const count = 50

    function createSongs() {
        const songs = []
        for (let i = 0; i < count; i++) {
            songs.push(<li key={i}>Song {i + 1}</li>)
        }
        return songs
    }

    return (
        <div className="main-view">
            <button className="btn-light">All</button>
            <button className="btn-tinted">Music</button>
            <button className="btn-tinted">Podcasts</button>
            <h1>My Songs</h1>
            <button className="btn-green">Continue</button>
            <ul>
                {createSongs()}
            </ul>
        </div>
    )
}