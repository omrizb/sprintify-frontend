import { useEffect, useRef, useState } from 'react'

export function Slider({ startValue = 50 }) {

    const nonActiveBarRef = useRef(null)
    const pointerRef = useRef(null)
    const [sliderWidth, setSliderWidth] = useState(null)
    const [sliderValue, setSliderValue] = useState(startValue)
    const [pointerOffset, setPointerOffset] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (nonActiveBarRef.current && pointerRef.current) {
            const nonActiveBarWidth = nonActiveBarRef.current.offsetWidth
            const pointerWidth = pointerRef.current.offsetWidth
            setSliderWidth(nonActiveBarWidth - pointerWidth)
        }
    }, [])

    useEffect(() => {
        onSetPointerOffset(sliderValue)
    }, [sliderWidth])


    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    function onSetPointerOffset(value) {
        const newOffset = sliderWidth * value / 100
        if (newOffset > sliderWidth) {
            setSliderValue(100)
            setPointerOffset(sliderWidth)
        }
        else if (newOffset < 0) {
            setSliderValue(0)
            setPointerOffset(0)
        }
        else {
            setSliderValue(value)
            setPointerOffset(newOffset)
        }
    }

    function calcNewValue(ev) {
        const sliderRect = nonActiveBarRef.current.getBoundingClientRect()
        const pointerXOffset = ev.clientX - sliderRect.left
        return pointerXOffset / sliderWidth * 100
    }

    function handleMouseDown(ev) {
        ev.preventDefault()
        const newValue = calcNewValue(ev)
        onSetPointerOffset(newValue)
        setIsDragging(true)
    }

    function handleMouseMove(ev) {
        ev.preventDefault()
        const newValue = calcNewValue(ev)
        onSetPointerOffset(newValue)
    }

    function handleMouseUp(ev) {
        ev.preventDefault()
        setIsDragging(false)
    }

    console.log(sliderValue)

    return (
        <div className="slider" onMouseDown={handleMouseDown}>
            <div ref={nonActiveBarRef} className="non-active-bar"></div>
            <div className="active-bar" style={{ width: pointerOffset }}></div>
            <div ref={pointerRef} className="pointer" style={{ left: pointerOffset }}></div>
        </div>
    )
}