export function ArtistPreview({ artist }) {

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

    return (
        <div className="artist-preview">
            <div className="about header-text">About the artist</div>
            <img src={artist.imgUrl.big} />
            <div className="artist-info">
                <div className="artist-name header-text">{artist.name}</div>
                <div className="followers">{artist.followers.toLocaleString()} monthly listeners</div>
                <div className="genres">Most popular for {breakArrayToCommas(artist.genres)}.</div>
            </div>
        </div>
    )
}