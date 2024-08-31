export const reactUtilService = {
    measureTextBox
}

function measureTextBox(text, element) {
    const measureElement = document.createElement('div')
    measureElement.style.position = 'absolute'
    measureElement.style.visibility = 'hidden'
    measureElement.style.whiteSpace = 'nowrap'
    measureElement.style.fontFamily = getComputedStyle(element).fontFamily
    measureElement.style.fontWeight = getComputedStyle(element).fontWeight
    measureElement.style.fontSize = getComputedStyle(element).fontSize
    measureElement.style.letterSpacing = getComputedStyle(element).letterSpacing
    measureElement.style.padding = getComputedStyle(element).padding
    measureElement.style.border = getComputedStyle(element).border
    measureElement.style.margin = getComputedStyle(element).margin
    measureElement.style.lineHeight = getComputedStyle(element).lineHeight
    measureElement.style.textTransform = getComputedStyle(element).textTransform
    measureElement.textContent = text

    document.body.appendChild(measureElement)

    const dimensions = {
        width: measureElement.offsetWidth,
        height: measureElement.offsetHeight
    }

    document.body.removeChild(measureElement)

    return dimensions
}