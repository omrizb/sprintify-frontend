import { useEffect, useRef } from "react"
import { ArtistPreview } from "./ArtistPreview"

export function ArtistList({ artists }) {

    const listContainer = useRef(null)

    useEffect(() => {
        if (!listContainer.current) return

        hideOverflowCards()
        const resizeObserver = new ResizeObserver(hideOverflowCards)
        resizeObserver.observe(listContainer.current)

        return () => resizeObserver.disconnect()
    }, [artists])


    function hideOverflowCards() {
        const listContainerWidth = listContainer.current.getBoundingClientRect().width
        const listCards = Array.from(listContainer.current.querySelectorAll('li'))

        let totalCardsWidth = 0

        listCards.forEach(card => {
            totalCardsWidth += card.getBoundingClientRect().width

            if (totalCardsWidth > listContainerWidth) {
                card.style.visibility = 'hidden'
            } else {
                card.style.visibility = 'visible'
            }
        })
    }

    return (
        <div className="artist-list">
            <h2>Artists</h2>
            <ul ref={listContainer} className="">

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