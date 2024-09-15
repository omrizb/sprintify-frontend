import { ArtistPreview } from "./ArtistPreview"

export function ArtistList({ artists }) {
    return (
        <div className="artist-list">
            <h2>Artists</h2>
            <ul className="">

                {artists.map(artist => {

                    return <li key={artist.spotifyId}>
                        <ArtistPreview
                            artist={artist}
                            type="search"

                        />
                    </li>
                })}


            </ul>
        </div>

    )
}