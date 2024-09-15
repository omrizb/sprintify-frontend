export function ArtistPreview({ artist, type = 'nowPlaying' }) {

    function breakArrayToCommas(arr) {
        return arr.reduce((acc, currValue, idx) => {
            if (idx === 0) {
                return currValue
            }
            if (idx !== arr.length - 1) {
                return acc + `, ${currValue}`
            } else {
                return acc + `and ${currValue}`
            }
        }, '')
    }

    function setClass() {
        if (type === 'nowPlaying') return 'now-playing'
        if (type === 'search') return 'search'
    }

    return (
        <div className={`artist-preview ${setClass()}`}>
            {(type === 'now-playing') && <div className="about header-text">About the artist</div>}
            <img src={artist.imgUrl.big} />

            {(type === 'nowPlaying') && <div className="artist-info">
                <div className="artist-name header-text">{artist.name}</div>
                <div className="followers">{artist.followers.toLocaleString()} monthly listeners</div>
                <div className="genres">Most popular for {breakArrayToCommas(artist.genres)}.</div>
            </div>}

            {(type === 'search') && <div className="artist-info">
                <div className="artist-name">{artist.name}</div>
                <div className="artist">Artist</div>
            </div>}
        </div>
    )
}