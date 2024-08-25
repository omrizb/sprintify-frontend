import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'
import { userService } from '../user/index.js'
import { songs } from '../../../data-sample/song.js'

const STORAGE_KEY = 'songDB'

export const songService = {
    query,
    getById,
}

// DEBUG:
// window.cs = songService

_createSongs()

// async function query(filterBy = {txt: '', sortField: '', sortDir: ''}) {
async function query() {
    var songs = await storageService.query(STORAGE_KEY)
    console.log('songs:', songs)
    // const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     songs = songs.filter(song => regex.test(song.vendor) || regex.test(song.description))
    // }
    // if (minSpeed) {
    //     songs = songs.filter(song => song.speed <= minSpeed)
    // }
    // if (maxPrice) {
    //     songs = songs.filter(song => song.price <= maxPrice)
    // }
    // if (sortField === 'vendor' || sortField === 'owner') {
    //     songs.sort((song1, song2) =>
    //         song1[sortField].localeCompare(song2[sortField]) * +sortDir)
    // }
    // if (sortField === 'price' || sortField === 'speed') {
    //     songs.sort((song1, song2) =>
    //         (song1[sortField] - song2[sortField]) * +sortDir)
    // }

    // songs = songs.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return songs
}

function getById(songId) {
    return storageService.get(STORAGE_KEY, songId)
}


function _createSongs() {
    let currSongs = utilService.loadFromStorage(STORAGE_KEY)
    if (!currSongs || !currSongs.length) {
        utilService.saveToStorage(STORAGE_KEY, songs)
    }
}