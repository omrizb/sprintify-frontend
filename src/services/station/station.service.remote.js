import { httpService } from '../http.service'
import { utilService } from '../util.service'

const madeForYouCollections = await getMadeForYou()
export default madeForYouCollections

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    getRecentlyPlayed,
    getTopMixes,
    // getMadeForYou,
    getLikedSongsStation
}

function getEmptyStation() {
    return {
        name: 'My Playlist',
        type: 'playlist',
        isPinned: false,
        tags: [],
        stationImgUrl: '',
        description: '',
        isOwnedByUser: true,
        createdBy: {},
        likedByUsers: [],
        songs: [],
        lastIdx: ''
    }
}

function getLikedSongsStation(user) {
    return {
        ...getEmptyStation(),
        name: 'Liked Songs',
        createdBy: {
            id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        },
        isPinned: true,
        stationImgUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
    }
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`station`, filterBy)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station, isToggleLike = '') {
    var savedStation

    if (station._id) {
        const stationToSave = {
            _id: station._id,
            name: station.name,
            type: station.type,
            isLikedSongs: station.isLikedSongs,
            tags: station.tags,
            stationImgUrl: station.stationImgUrl,
            description: station.description,
            isOwnedByUser: station.isOwnedByUser,
            createdBy: station.createdBy,
            likedByUsers: station.likedByUsers,
            songs: station.songs,
            createdAt: station.createdAt,
            addedAt: station.addedAt,
            isPinned: station.isPinned,
            lastIdx: station.lastIdx || ''
        }
        savedStation = await httpService.put(`station/${station._id}${isToggleLike}`, stationToSave)
    } else {
        const stationToSave = {
            name: station.name,
            type: station.type,
            isLikedSongs: station.isLikedSongs,
            tags: station.tags,
            stationImgUrl: station.stationImgUrl,
            description: station.description,
            isOwnedByUser: station.isOwnedByUser,
            createdBy: station.createdBy,
            likedByUsers: station.likedByUsers,
            songs: station.songs,
            createdAt: Date.now(),
            addedAt: Date.now(),
            isPinned: station.isPinned,
            lastIdx: ''
        }
        savedStation = await httpService.post('station', stationToSave)
    }
    return savedStation
}

async function getRecentlyPlayed(userId, size = 4) {
    //TODO write algorithm for fetching recentlyplayed playlists per user 

    return httpService.get(`station`, { stationType: 'album' })

}
async function getTopMixes(userId, size = 4) {
    //TODO write algorithm for fetching top mixes per user 
    return httpService.get(`station`, { stationType: 'playlist' })
}


async function getMadeForYou() {

    const stations = await query({})

    if (stations.length < 2) return []

    const collections = stations.filter(station => station.type === 'daily-mix')
    if (collections.length > 0) return collections



    const stationCovers = [
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7c774b7b4da216c33782c193/1/en/default',
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebee0bf92f5269431b705722b2/2/en/default',
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7bff9168ecfa90aca537adee/3/en/default',
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb59c9bdf20c6eb811f9aa894/4/en/default',
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebed7d082db2925fe99a9b9487/5/en/default',
        'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb92883b0e094a36d2f43ad284/6/en/default',
    ]
    const stationsForYou = []
    const savedStations = []

    for (let i = 0; i < 5; i++) {
        stationsForYou[i] = getEmptyStation()
        stationsForYou[i].name = `Daily Mix ${i + 1}`
        stationsForYou[i].createdBy = { id: 'BBBB', fullName: 'Sprintify', imgUrl: '' }
        stationsForYou[i].stationImgUrl = stationCovers[i]
        stationsForYou[i].isOwnedByUser = false
        stationsForYou[i].type = 'daily-mix'

        const songsArrs = stations.map(station => {

            const numOfSongs = (station.songs.length < 3) ? station.songs.length : 3
            const songs = utilService.getRandomItems(station.songs, numOfSongs)
            return songs
        })
        stationsForYou[i].songs = songsArrs.flat()

        savedStations[i] = await save(stationsForYou[i])
    }

    return savedStations
}



