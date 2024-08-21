import axios from 'axios'
import { utilService } from './util.service.js'

export const youtubeService = {
    getVideos,
    getTopVideo
}

const YOUTUBE_DATA_API_KEYS = [
    'AIzaSyBbON95W3T1XxVHmol0z6f49h-CCMoLDRU',
    'AIzaSyBGb9TvPCbfIzpdf4SJMMlTR0xoxuvuSGY',
    'AIzaSyAyMgW0F74Qul3b0HytgVZOy4Dvq7zE_Os',
    'AIzaSyCewoUt9zepeRA5dW05a7mf-uyWBFKePfA',
    'AIzaSyDtVGyJvy1rS2lk1hs1Xid1ofviFhm7S_A'
]

async function getVideos(value, maxResults = 5) {
    try {
        const apiKey = utilService.getRandomItems(YOUTUBE_DATA_API_KEYS)
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

function parseISODuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    const hours = (match[1] ? parseInt(match[1]) : 0)
    const minutes = (match[2] ? parseInt(match[2]) : 0)
    const seconds = (match[3] ? parseInt(match[3]) : 0)
    return { hours, minutes, seconds }
}
