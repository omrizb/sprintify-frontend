const YOUTUBE_DATA_API_KEYS = JSON.parse(import.meta.env.VITE_YOUTUBE_DATA_API_KEYS)
const VITE_YOUTUBE_DARR_API_KEY = import.meta.env.VITE_YOUTUBE_DARR_API_KEY
const VITE_YOUTUBE_EINAT_API_KEY = import.meta.env.VITE_YOUTUBE_EINAT_API_KEY
// console.log(import.meta.env.VITE_TEST_VARIABLE)

import axios from 'axios'
import { utilService } from './util.service.js'
import getArtistTitle from 'get-artist-title'

export const youtubeService = {
    getVideos,
    getTopVideo,
    getSongById,
    parseISODuration
}


// for debugging from console
window.youtubeService = youtubeService

async function getVideos(value, maxResults = 5) {
    try {
        // const apiKey = utilService.getRandomItems(YOUTUBE_DATA_API_KEYS)
        // const apiKey = VITE_YOUTUBE_EINAT_API_KEY
        const apiKey = VITE_YOUTUBE_DARR_API_KEY

        const videos = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                videoEmbeddable: 'true',
                type: 'video',
                maxResults,
                key: apiKey,
                q: value
            }
        })

        return videos.data.items.map(video => extractSongData(video, true))
    } catch (err) {
        console.log('Error:', err)
    }
}

async function getTopVideo(value) {
    try {
        const apiKey = utilService.getRandomItems(YOUTUBE_DATA_API_KEYS)
        const search = await getVideos(value, 1)
        const video = search[0]

        const videoDetails = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'contentDetails',
                id: video.videoId,
                key: apiKey,
            }
        })

        return {
            ...video,
            duration: parseISODuration(videoDetails.data.items[0].contentDetails.duration)
        }
    } catch (err) {
        console.log('Error:', err)
    }
}

async function getSongById(id) {
    try {
        const apiKey = VITE_YOUTUBE_EINAT_API_KEY
        const search = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails',
                id,
                key: apiKey,
            }
        })

        if (search.data.items.length > 0) {
            const song = search.data.items[0]
            return {
                ...extractSongData(song),
                duration: parseISODuration(song.contentDetails.duration),
            }
        } else {
            console.log('No song found with this ID:', id)
            return null
        }
    } catch (error) {
        console.log('Error fetching song details:', error)
    }
}

function extractSongData(song, isSearchApi = false) {
    const defaultArtist = (isSearchApi) ? song.snippet.channelTitle : song.snippet.tags[0]
    const songId = (isSearchApi) ? song.id.videoId : song.id

    let [artist, songName] = getArtistTitle(song.snippet.title, {
        defaultArtist
    })

    return {
        songId,
        songName,
        artist,
        description: song.snippet.description,
        url: `https://www.youtube.com/embed/${song.id}`,
        imgUrl: song.snippet.thumbnails.high.url,
        publishedAt: song.snippet.publishedAt
    }
}

function parseISODuration(isoDuration) {

    const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
    const matches = isoDuration.match(regex)

    if (!matches) {
        console.error('Invalid duration:', isoDuration)
        return 0
    }

    const hours = matches[1] ? parseInt(matches[1]) : 0
    const minutes = matches[2] ? parseInt(matches[2]) : 0
    const seconds = matches[3] ? parseInt(matches[3]) : 0

    return hours * 3600 + minutes * 60 + seconds
}


