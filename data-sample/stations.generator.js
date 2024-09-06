import fs from 'fs'
import { utilService } from '../src/services/util.service.js'
import { songs } from './newSongs.js'
import { stations } from './station.js'


updateStations()

function getRandomTimestamp(fromYear, toYear) {
    const from = new Date(fromYear, 0, 1).getTime()
    const to = new Date(toYear, 0, 1).getTime()
    const randomTimestamp = Math.random() * (to - from) + from
    return Math.floor(randomTimestamp)
}

function formatValue(value) {
    if (typeof value === 'string') {
        return `'${value}'`; // String values get single quotes
    } else if (Array.isArray(value)) {
        // Recursively format arrays
        return `[${value.map(v => formatValue(v)).join(', ')}]`;
    } else if (typeof value === 'object' && value !== null) {
        // Recursively format objects
        const entries = Object.entries(value)
            .map(([key, val]) => `${key}: ${formatValue(val)}`);
        return `{ ${entries.join(', ')} }`;
    }
    return value; // Return the value as-is for numbers, booleans, etc.
}

function updateStations() {
    const newStations = stations.map(station => ({
        ...station,
        songs: utilService.getRandomItems(songs, utilService.getRandomIntInclusive(5, 25))
    }))

    const data = 'export const stations = [\n' +
        newStations.map(station => {
            const entries = Object.entries(station)
                .map(([key, value]) => `  ${key}: ${formatValue(value)}`)
            return `{ ${entries.join(',\n')} }`
        }).join(',\n') +
        '\n];'

    fs.writeFileSync('newStations.js', data, 'utf8')
    console.log('File written successfully!')
}