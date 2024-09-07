import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { StationPreview } from './StationPreview.jsx'

export function StationList({ stations, className, previewStyle }) {

    const listContainer = useRef(null)

    useEffect(() => {
        if (previewStyle !== 'card' || !listContainer.current) return

        hideOverflowCards()
        const resizeObserver = new ResizeObserver(hideOverflowCards)
        resizeObserver.observe(listContainer.current)

        return () => resizeObserver.disconnect()
    }, [stations])

    function hideOverflowCards() {
        const listContainerWidth = listContainer.current.getBoundingClientRect().width
        const listCards = Array.from(listContainer.current.querySelectorAll('li'))
        console.log("asdf")

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
        <ul ref={listContainer} className={`station-list ${className}`}>
            {stations.map(station =>
                <li key={station._id} >
                    <Link to={`/station/${station._id}`}>
                        <StationPreview station={station} style={previewStyle} />
                    </Link>
                </li>)
            }
        </ul>
    )
}

