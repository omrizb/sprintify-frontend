import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export function PopUp({ children, onClosePopUp, btnRef }) {

    const popUpContainer = useRef(null)

    useEffect(() => {
        setPopUpPosition()

        const scrollableContainer = btnRef.current.closest('.scrollable-container') || window

        document.addEventListener('click', handleClickOutside)
        scrollableContainer.addEventListener('scroll', setPopUpPosition)

        let resizeObserver
        if (scrollableContainer !== window) {
            resizeObserver = new ResizeObserver(setPopUpPosition)
            resizeObserver.observe(scrollableContainer)
        } else {
            window.addEventListener('resize', setPopUpPosition)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
            scrollableContainer.removeEventListener('scroll', setPopUpPosition, { passive: true })

            if (scrollableContainer !== window) {
                resizeObserver.disconnect()
            } else {
                window.removeEventListener('resize', setPopUpPosition)
            }
        }
    }, [])

    function handleClickOutside(ev) {
        if (popUpContainer.current
            && !popUpContainer.current.contains(ev.target)
            && !btnRef.current.contains(ev.target)) {
            onClosePopUp()
        }
    }

    function setPopUpPosition() {
        const btnRect = btnRef.current.getBoundingClientRect()
        const popUpEl = popUpContainer.current

        btnRect.left + window.scrollX + popUpEl.getBoundingClientRect().width < window.innerWidth
            ? popUpEl.style.left = `${btnRect.left + window.scrollX}px`
            : popUpEl.style.right = `${window.innerWidth - btnRect.right - window.scrollX}px`

        btnRect.bottom + window.scrollY + popUpEl.getBoundingClientRect().height < window.innerHeight
            ? popUpEl.style.top = `${btnRect.bottom + window.scrollY}px`
            : popUpEl.style.bottom = `${window.innerHeight - btnRect.top - window.scrollY}px`
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClosePopUp })
        }
    })

    return ReactDOM.createPortal(
        <div ref={popUpContainer} className="pop-up-container" onClick={ev => ev.stopPropagation()}>
            {childrenWithProps}
        </div>,
        document.body
    )
}