import { songService } from '../../services/song/song.service.local.js'
import { store } from '../store.js'
import {
    SET_SONGS,
    SET_SONG,
} from '../reducers/song.reducer.js'

// export async function loadSongs(filterBy) {
export async function loadSongs() {
    try {
        // const songs = await songService.query(filterBy)
        const songs = await songService.query()
        store.dispatch(getCmdSetSongs(songs))
    } catch (err) {
        console.log('Cannot load songs', err)
        throw err
    }
}

export async function loadSong(spotifyId) {
    try {
        const song = await songService.getById(spotifyId)
        store.dispatch(getCmdSetSong(song))
    } catch (err) {
        console.log('Cannot load song', err)
        throw err
    }
}


// Command Creators:
function getCmdSetSongs(songs) {
    return {
        type: SET_SONGS,
        songs
    }
}
function getCmdSetSong(song) {
    return {
        type: SET_SONG,
        song
    }
}

