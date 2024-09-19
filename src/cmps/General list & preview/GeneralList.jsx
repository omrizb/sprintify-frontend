import { useEffect, useRef } from "react"
import { GeneralPreview } from "./GeneralPreview"

export function GeneralList({ title, listItems, type }) {

    const listContainer = useRef(null)

    useEffect(() => {
        if (!listContainer.current) return

        hideOverflowCards()
        const resizeObserver = new ResizeObserver(hideOverflowCards)
        resizeObserver.observe(listContainer.current)

        return () => resizeObserver.disconnect()
    }, [listItems])

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

        <div className="general-list">
            <div className="list-header">
                <div className="list-title">
                    {title}
                </div>
            </div>

            <ul ref={listContainer} className="">

                {listItems.map(item => {
                    return <li key={item.spotifyId}>
                        <GeneralPreview item={item} type={type} />
                    </li>
                })}

            </ul>
        </div>

    )
}

