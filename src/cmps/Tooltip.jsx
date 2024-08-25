import { useState } from 'react'

export function Tooltip({ txt, children }) {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="tooltip">{txt}</div>}
        </div>
    )
}