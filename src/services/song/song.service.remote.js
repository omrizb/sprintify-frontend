import { httpService } from '../http.service'

export const songService = {
    query,
    getById,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`song`, filterBy)
}

function getById(songId) {
    return httpService.get(`song/${songId}`)
}



