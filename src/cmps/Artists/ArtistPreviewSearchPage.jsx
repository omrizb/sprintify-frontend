export function ArtistPreviewSearchPage({ artist }) {
    return (
        <div className="artist-preview">
            <img src={artist.imgUrl.big} alt="" />
            <span className="artist-name">{artist.name}</span>
            <span className="type-artist">Artist</span>
        </div>
    )
}