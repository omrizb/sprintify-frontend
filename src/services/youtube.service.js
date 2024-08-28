const YOUTUBE_DATA_API_KEYS = JSON.parse(import.meta.env.VITE_YOUTUBE_DATA_API_KEYS)
const VITE_YOUTUBE_DARR_API_KEY = import.meta.env.VITE_YOUTUBE_DARR_API_KEY
// console.log(import.meta.env.VITE_TEST_VARIABLE)

import axios from 'axios'
import { utilService } from './util.service.js'

export const youtubeService = {
    getVideos,
    getTopVideo,
    getVideoById
}


// for debugging from console
window.youtubeService = youtubeService

async function getVideos(value, maxResults = 5) {
    try {
        // const apiKey = utilService.getRandomItems(YOUTUBE_DATA_API_KEYS)
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
        const apiKey = VITE_YOUTUBE_DARR_API_KEY
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
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    const hours = (match[1] ? parseInt(match[1]) : 0)
    const minutes = (match[2] ? parseInt(match[2]) : 0)
    const seconds = (match[3] ? parseInt(match[3]) : 0)
    return { hours, minutes, seconds }
}
