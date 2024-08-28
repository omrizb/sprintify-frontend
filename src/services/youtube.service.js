const YOUTUBE_DATA_API_KEYS = JSON.parse(import.meta.env.VITE_YOUTUBE_DATA_API_KEYS)
const VITE_YOUTUBE_DARR_API_KEY = import.meta.env.VITE_YOUTUBE_DARR_API_KEY
const VITE_YOUTUBE_EINAT_API_KEY = import.meta.env.VITE_YOUTUBE_EINAT_API_KEY
// console.log(import.meta.env.VITE_TEST_VARIABLE)

import axios from 'axios'
import { utilService } from './util.service.js'

export const youtubeService = {
    getVideos,
    getTopVideo,
    getVideoById,
    parseISODuration
}


// for debugging from console
window.youtubeService = youtubeService

async function getVideos(value, maxResults = 5) {
    try {
        // const apiKey = utilService.getRandomItems(YOUTUBE_DATA_API_KEYS)
        const apiKey = VITE_YOUTUBE_EINAT_API_KEY

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

        return videos.data.items.map(video => ({
            videoId: video.id.videoId,
            title: video.snippet.title,
            url: `https://www.youtube.com/embed/${video.id.videoId}`,
            imgUrl: video.snippet.thumbnails.high.url,
        }))
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

async function getVideoById(videoId) {
    try {
        const apiKey = VITE_YOUTUBE_EINAT_API_KEY
        const video = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails',
                id: videoId,
                key: apiKey,
            }
        })

        // Check if any video is returned
        if (video.data.items.length > 0) {
            return video.data.items[0] // Return the first video information
        } else {
            console.log('No video found with this ID.')
            return null
        }
    } catch (error) {
        console.error('Error fetching video details:', error)
    }
}


function parseISODuration(isoDuration) {
    debugger
    // Use a regular expression to extract hours, minutes, and seconds
    const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
    const matches = isoDuration.match(regex)

    if (!matches) {
        return 'Invalid duration'
    }

    const hours = matches[1] ? parseInt(matches[1]) : 0
    const minutes = matches[2] ? parseInt(matches[2]) : 0
    const seconds = matches[3] ? parseInt(matches[3]) : 0

    console.log(hours, minutes, seconds)
}

