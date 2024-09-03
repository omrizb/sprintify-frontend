function getRandomTimestamp(fromYear, toYear) {
    const from = new Date(fromYear, 0, 1).getTime()
    const to = new Date(toYear, 0, 1).getTime()
    const randomTimestamp = Math.random() * (to - from) + from
    return Math.floor(randomTimestamp)
}

export const stations = [
    {
        _id: 'LLLLLLL',
        name: 'Liked Songs',
        type: 'playlist',
        stationImgUrl: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
        tags: [],
        createdBy: {
            id: 'AAAA',
            fullName: 'Darr',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: [],
        createdAt: 1725327612081,
        addedAt: 1725327612081,
        songs: [
            {
                songId: 'fJ9rUzIMcZQ',
                songName: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
                imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
                duration: 60
            },
            {
                songId: 'JGwWNGJdvx8',
                songName: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                url: 'https://www.youtube.com/embed/JGwWNGJdvx8',
                imgUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
                duration: 266
            },
            {
                songId: 'Zi_XLOBDo_Y',
                songName: 'Billie Jean',
                artist: 'Michael Jackson',
                album: 'Thriller',
                url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
                imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
                duration: 296
            }
        ]
    },
    {
        _id: 'A1b2C3d4E5',
        name: 'Summer Vibes',
        type: 'playlist',
        stationImgUrl: 'https://i.scdn.co/image/ab67616d0000b27346e4e8079743a66a5467d091', // image of one of the songs
        tags: ['Happy', 'Chill', 'Upbeat'],
        createdBy: {
            id: 'AAAA',
            fullName: 'Darr',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'F6g7H8i9J0', 'K1L2M3N4O5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'fJ9rUzIMcZQ',
                songName: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
                imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
                duration: 60
            },
            {
                songId: 'JGwWNGJdvx8',
                songName: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                url: 'https://www.youtube.com/embed/JGwWNGJdvx8',
                imgUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
                duration: 266
            },
            {
                songId: 'Zi_XLOBDo_Y',
                songName: 'Billie Jean',
                artist: 'Michael Jackson',
                album: 'Thriller',
                url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
                imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
                duration: 296
            }
        ]
    },
    {
        _id: 'F6g7H8i9J0',
        name: 'Chill Out',
        type: 'playlist',
        stationImgUrl: 'https://i2o.scdn.co/image/ab67706c0000cfa3a75e9e508f98d4947ddcd5c7', // image of one of the songs
        tags: ['Chill', 'Relaxing'],
        createdBy: {
            id: 'BBBB',
            fullName: 'sprintify',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'A1b2C3d4E5', 'K1L2M3N4O5', 'P6Q7R8S9T0'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: '4NRXx6U8ABQ',
                songName: 'Blinding Lights',
                artist: 'The Weeknd',
                album: 'After Hours',
                url: 'https://www.youtube.com/embed/4NRXx6U8ABQ',
                imgUrl: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg',
                duration: 263
            },
            {
                songId: 'hTWKbfoikeg',
                songName: 'Smells Like Teen Spirit',
                artist: 'Nirvana',
                album: 'Nevermind',
                url: 'https://www.youtube.com/embed/hTWKbfoikeg',
                imgUrl: 'https://i.ytimg.com/vi/hTWKbfoikeg/hqdefault.jpg',
                duration: 279
            },
            {
                songId: 'QkF3oxziUI4',
                songName: 'Stairway to Heaven',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin IV',
                url: 'https://www.youtube.com/embed/QkF3oxziUI4',
                imgUrl: 'https://i.ytimg.com/vi/QkF3oxziUI4/hqdefault.jpg',
                duration: 483
            }
        ]
    },
    {
        _id: 'K1L2M3N4O5',
        name: 'Party Anthems',
        type: 'playlist',
        stationImgUrl: 'https://i.scdn.co/image/ab67616d0000b273a9b67dfd76675906302a597f', // image of one of the songs
        tags: ['Dance', 'Energetic', 'Upbeat'],
        createdBy: {
            id: 'K1L2M3N4O5',
            fullName: 'Sophia Brown',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'A1b2C3d4E5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'lp-EO5I60KA',
                songName: 'Thinking Out Loud',
                artist: 'Ed Sheeran',
                album: 'x (Multiply)',
                url: 'https://www.youtube.com/embed/lp-EO5I60KA',
                imgUrl: 'https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg',
                duration: 297
            },
            {
                songId: 'A_MjCqQoLLA',
                songName: 'Hey Jude',
                artist: 'The Beatles',
                album: 'The Beatles (The White Album)',
                url: 'https://www.youtube.com/embed/A_MjCqQoLLA',
                imgUrl: 'https://i.ytimg.com/vi/A_MjCqQoLLA/hqdefault.jpg',
                duration: 490
            }
        ]
    },
    {
        _id: 'P6Q7R8S9T0',
        name: 'Morning Motivation',
        type: 'playlist',
        stationImgUrl: 'https://i.scdn.co/image/ab67616d00001e02eb59c2fbb24ebef6d2db6975', // image of one of the songs
        tags: ['Upbeat', 'Rock', 'Pop'],
        createdBy: {
            id: 'AAAA',
            fullName: 'Darr',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['A1b2C3d4E5', 'F6g7H8i9J0', 'K1L2M3N4O5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'kJQP7kiw5Fk',
                songName: 'Despacito',
                artist: 'Luis Fonsi ft. Daddy Yankee',
                album: 'Vida',
                url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
                imgUrl: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
                duration: 282
            },
            {
                songId: '1w7OgIMMRc4',
                songName: "Sweet Child O' Mine",
                artist: "Guns N' Roses",
                album: 'Appetite for Destruction',
                url: 'https://www.youtube.com/embed/1w7OgIMMRc4',
                imgUrl: 'https://i.ytimg.com/vi/1w7OgIMMRc4/hqdefault.jpg',
                duration: 303
            }
        ]
    },
    {
        _id: 'U1V2W3X4Y5',
        name: 'Late Night Grooves',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs885ERZ0pPqPnCD0BkdwsTIglK9TNNaP6uOC3Vg2uGzLqjrIFHmGtWmwdw0g-y567Tg4&usqp=CAU', // image of one of the songs
        tags: ['Jazz', 'Soul', 'Funky'],
        createdBy: {
            id: 'U1V2W3X4Y5',
            fullName: 'Ava Wilson',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'A1b2C3d4E5', 'K1L2M3N4O5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'DyDfgMOUjCI',
                songName: 'bad guy',
                artist: 'Billie Eilish',
                album: 'When We All Fall Asleep, Where Do We Go?',
                url: 'https://www.youtube.com/embed/DyDfgMOUjCI',
                imgUrl: 'https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg',
                duration: 206
            },
            {
                songId: 'fNFzfwLM72c',
                songName: "Stayin' Alive",
                artist: 'Bee Gees',
                album: 'Saturday Night Fever Soundtrack',
                url: 'https://www.youtube.com/embed/fNFzfwLM72c',
                imgUrl: 'https://i.ytimg.com/vi/fNFzfwLM72c/hqdefault.jpg',
                duration: 250
            }
        ]
    },
    {
        _id: 'X1Y2Z3A4B5',
        name: 'Chill Vibes',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCc7WKSzQsR8ZThqj1viZ7BzON8nEfDmUKw&s', // image of one of the songs
        tags: ['Chill', 'Relaxing', 'Acoustic'],
        createdBy: {
            id: 'AAAA',
            fullName: 'Darr',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe8Qwq1QZXynKsPdWVPx2RI6VTsh2LyavhQg&s'
        },
        likedByUsers: ['A1b2C3d4E5', 'K1L2M3N4O5', 'P6Q7R8S9T0'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'Zi_XLOBDo_Y',
                songName: 'Billie Jean',
                artist: 'Michael Jackson',
                album: 'Thriller',
                url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
                imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
                duration: 296
            },
            {
                songId: '4NRXx6U8ABQ',
                songName: 'Blinding Lights',
                artist: 'The Weeknd',
                album: 'After Hours',
                url: 'https://www.youtube.com/embed/4NRXx6U8ABQ',
                imgUrl: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg',
                duration: 263
            },
            {
                songId: 'JGwWNGJdvx8',
                songName: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                url: 'https://www.youtube.com/embed/JGwWNGJdvx8',
                imgUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
                duration: 266
            },
            {
                songId: 'hTWKbfoikeg',
                songName: 'Smells Like Teen Spirit',
                artist: 'Nirvana',
                album: 'Nevermind',
                url: 'https://www.youtube.com/embed/hTWKbfoikeg',
                imgUrl: 'https://i.ytimg.com/vi/hTWKbfoikeg/hqdefault.jpg',
                duration: 279
            },
            {
                songId: 'QkF3oxziUI4',
                songName: 'Stairway to Heaven',
                artist: 'Led Zeppelin',
                album: 'Led Zeppelin IV',
                url: 'https://www.youtube.com/embed/QkF3oxziUI4',
                imgUrl: 'https://i.ytimg.com/vi/QkF3oxziUI4/hqdefault.jpg',
                duration: 483
            },
            {
                songId: 'hLQl3WQQoQ0',
                songName: 'Someone Like You',
                artist: 'Adele',
                album: '21',
                url: 'https://www.youtube.com/embed/hLQl3WQQoQ0',
                imgUrl: 'https://i.ytimg.com/vi/hLQl3WQQoQ0/hqdefault.jpg',
                duration: 285
            },
            {
                songId: 'bx1Bh8ZvH84',
                songName: 'Wonderwall',
                artist: 'Oasis',
                album: "(What's the Story) Morning Glory?",
                url: 'https://www.youtube.com/embed/bx1Bh8ZvH84',
                imgUrl: 'https://i.ytimg.com/vi/bx1Bh8ZvH84/hqdefault.jpg',
                duration: 278
            },
            {
                songId: 'lp-EO5I60KA',
                songName: 'Thinking Out Loud',
                artist: 'Ed Sheeran',
                album: 'x (Multiply)',
                url: 'https://www.youtube.com/embed/lp-EO5I60KA',
                imgUrl: 'https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg',
                duration: 297
            }
        ]
    },
    {
        _id: 'C6D7E8F9G0',
        name: 'Party Hits',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVdg9uVAVQ2h1iPEQjaVlEFzBjWYLlvA2jw&s', // image of one of the songs
        tags: ['Dance', 'Upbeat', 'Funky'],
        createdBy: {
            id: 'BBBB',
            fullName: 'sprintify',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'F6g7H8i9J0', 'P6Q7R8S9T0'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'OPf0YbXqDm0',
                songName: 'Uptown Funk',
                artist: 'Mark Ronson ft. Bruno Mars',
                album: 'Uptown Special',
                url: 'https://www.youtube.com/embed/OPf0YbXqDm0',
                imgUrl: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
                duration: 271
            },
            {
                songId: 'kJQP7kiw5Fk',
                songName: 'Despacito',
                artist: 'Luis Fonsi ft. Daddy Yankee',
                album: 'Vida',
                url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
                imgUrl: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
                duration: 282
            },
            {
                songId: '1w7OgIMMRc4',
                songName: "Sweet Child O' Mine",
                artist: "Guns N' Roses",
                album: 'Appetite for Destruction',
                url: 'https://www.youtube.com/embed/1w7OgIMMRc4',
                imgUrl: 'https://i.ytimg.com/vi/1w7OgIMMRc4/hqdefault.jpg',
                duration: 303
            },
            {
                songId: 'Zi_XLOBDo_Y',
                songName: 'Billie Jean',
                artist: 'Michael Jackson',
                album: 'Thriller',
                url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
                imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg',
                duration: 296
            },
            {
                songId: 'JGwWNGJdvx8',
                songName: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                url: 'https://www.youtube.com/embed/JGwWNGJdvx8',
                imgUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
                duration: 266
            },
            {
                songId: 'DyDfgMOUjCI',
                songName: 'bad guy',
                artist: 'Billie Eilish',
                album: 'When We All Fall Asleep, Where Do We Go?',
                url: 'https://www.youtube.com/embed/DyDfgMOUjCI',
                imgUrl: 'https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg',
                duration: 206
            },
            {
                songId: 'FTQbiNvZqaY',
                songName: 'Africa',
                artist: 'Toto',
                album: 'Toto IV',
                url: 'https://www.youtube.com/embed/FTQbiNvZqaY',
                imgUrl: 'https://i.ytimg.com/vi/FTQbiNvZqaY/hqdefault.jpg',
                duration: 272
            },
            {
                songId: '3JWTaaS7LdU',
                songName: 'I Will Always Love You',
                artist: 'Whitney Houston',
                album: 'The Bodyguard Soundtrack',
                url: 'https://www.youtube.com/embed/3JWTaaS7LdU',
                imgUrl: 'https://i.ytimg.com/vi/3JWTaaS7LdU/hqdefault.jpg',
                duration: 274
            },
            {
                songId: '450p7goxZqg',
                songName: 'All of Me',
                artist: 'John Legend',
                album: 'Love in the Future',
                url: 'https://www.youtube.com/embed/450p7goxZqg',
                imgUrl: 'https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg',
                duration: 308
            },
            {
                songId: 'fNFzfwLM72c',
                songName: "Stayin' Alive",
                artist: 'Bee Gees',
                album: 'Saturday Night Fever Soundtrack',
                url: 'https://www.youtube.com/embed/fNFzfwLM72c',
                imgUrl: 'https://i.ytimg.com/vi/fNFzfwLM72c/hqdefault.jpg',
                duration: 250
            }
        ]
    },
    {
        _id: 'H1I2J3K4L5',
        name: 'Melancholic Moods',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBfL3bfXwAPlCwJN6_HcZ-iuME2JD1-QSPA&s', // image of one of the songs
        tags: ['Melancholic', 'Chill'],
        createdBy: {
            id: 'BBBB',
            fullName: 'sprintify',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'A1b2C3d4E5', 'F6g7H8i9J0'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: '6Ejga4kJUts',
                songName: 'Zombie',
                artist: 'The Cranberries',
                album: 'No Need to Argue',
                url: 'https://www.youtube.com/embed/6Ejga4kJUts',
                imgUrl: 'https://i.ytimg.com/vi/6Ejga4kJUts/hqdefault.jpg',
                duration: 308
            },
            {
                songId: '5IpYOF4Hi6Q',
                songName: 'Another Brick in the Wall',
                artist: 'Pink Floyd',
                album: 'The Wall',
                url: 'https://www.youtube.com/embed/5IpYOF4Hi6Q',
                imgUrl: 'https://i.ytimg.com/vi/5IpYOF4Hi6Q/hqdefault.jpg',
                duration: 230
            }
        ]
    },
    {
        _id: 'M6N7O8P9Q0',
        name: 'Acoustic Chill',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkA9wvQn1j53RmqmVUL5NhKPQ0IjouotzvlQ&s', // image of one of the songs
        tags: ['Acoustic', 'Chill', 'Relaxing'],
        createdBy: {
            id: 'U1V2W3X4Y5',
            fullName: 'Ava Wilson',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'P6Q7R8S9T0', 'K1L2M3N4O5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'lp-EO5I60KA',
                songName: 'Thinking Out Loud',
                artist: 'Ed Sheeran',
                album: 'x (Multiply)',
                url: 'https://www.youtube.com/embed/lp-EO5I60KA',
                imgUrl: 'https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg',
                duration: 297
            },
            {
                songId: 'IxuThNgl3YA',
                songName: 'Born to Run',
                artist: 'Bruce Springsteen',
                album: 'Born to Run',
                url: 'https://www.youtube.com/embed/IxuThNgl3YA',
                imgUrl: 'https://i.ytimg.com/vi/IxuThNgl3YA/hqdefault.jpg',
                duration: 333
            },
            {
                songId: '2Vv-BfVoq4g',
                songName: 'Perfect',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                url: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
                imgUrl: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
                duration: 280
            }
        ]
    },
    {
        _id: 'R1S2T3U4V5',
        name: 'Retro Beats',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZM4YYTFZFUWmN4oxU3nZqub2fWKaqpQdWQ&s',  // no songs in this playlist
        tags: ['Retro', 'Funky', 'Pop'],
        createdBy: {
            id: 'P6Q7R8S9T0',
            fullName: 'Noah Davis',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['F6g7H8i9J0'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: []
    },
    {
        _id: 'W6X7Y8Z9A0',
        name: 'Jazz & Blues',
        type: 'playlist',
        stationImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIEK3cIQSbW9eiZM_p0byZAi-D5YwgFSMmBQ&s', // image of one of the songs
        tags: ['Jazz', 'Blues', 'Soul'],
        createdBy: {
            id: 'F6g7H8i9J0',
            fullName: 'Liam Johnson',
            imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        },
        likedByUsers: ['AAAA', 'U1V2W3X4Y5'],
        createdAt: getRandomTimestamp(2018, 2023),
        addedAt: getRandomTimestamp(2022, 2023),
        songs: [
            {
                songId: 'sOnqjkJTMaA',
                songName: 'Thriller',
                artist: 'Michael Jackson',
                album: 'Thriller',
                url: 'https://www.youtube.com/embed/sOnqjkJTMaA',
                imgUrl: 'https://i.ytimg.com/vi/sOnqjkJTMaA/hqdefault.jpg',
                duration: 942
            },
            {
                songId: '4m1EFMoRFvY',
                songName: 'Single Ladies (Put a Ring on It)',
                artist: 'Beyoncé',
                album: 'I Am... Sasha Fierce',
                url: 'https://www.youtube.com/embed/4m1EFMoRFvY',
                imgUrl: 'https://i.ytimg.com/vi/4m1EFMoRFvY/hqdefault.jpg',
                duration: 201
            }
        ]
    },
    // {
    //     _id: 'A1B2C3D4E5',
    //     name: 'The Dark Side of the Moon',
    //     type: 'album',
    //     stationImgUrl: 'https://i.ytimg.com/vi/t6Z57QZ2fsA/hqdefault.jpg', // album cover
    //     tags: ['Classic', 'Rock', 'Concept Album'],
    //     createdBy: {
    //         id: 'A1B2C3D4E5',
    //         fullName: 'Pink Floyd',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 't6Z57QZ2fsA',
    //             songName: 'Speak to Me',
    //             artist: 'Pink Floyd',
    //             album: 'The Dark Side of the Moon',
    //             url: 'https://www.youtube.com/embed/t6Z57QZ2fsA',
    //             imgUrl: 'https://i.ytimg.com/vi/t6Z57QZ2fsA/hqdefault.jpg',
    //             duration: 90
    //         },
    //         {
    //             songId: 'm8T7xQ7c9FQ',
    //             songName: 'Time',
    //             artist: 'Pink Floyd',
    //             album: 'The Dark Side of the Moon',
    //             url: 'https://www.youtube.com/embed/m8T7xQ7c9FQ',
    //             imgUrl: 'https://i.ytimg.com/vi/m8T7xQ7c9FQ/hqdefault.jpg',
    //             duration: 413
    //         },
    //         {
    //             songId: 'j2YT2d0GRM0',
    //             songName: 'The Great Gig in the Sky',
    //             artist: 'Pink Floyd',
    //             album: 'The Dark Side of the Moon',
    //             url: 'https://www.youtube.com/embed/j2YT2d0GRM0',
    //             imgUrl: 'https://i.ytimg.com/vi/j2YT2d0GRM0/hqdefault.jpg',
    //             duration: 156
    //         },
    //         {
    //             songId: '5_tXXcUeAY4',
    //             songName: 'Money',
    //             artist: 'Pink Floyd',
    //             album: 'The Dark Side of the Moon',
    //             url: 'https://www.youtube.com/embed/5_tXXcUeAY4',
    //             imgUrl: 'https://i.ytimg.com/vi/5_tXXcUeAY4/hqdefault.jpg',
    //             duration: 382
    //         },
    //         {
    //             songId: '3JQ9KPoTeGU',
    //             songName: 'Us and Them',
    //             artist: 'Pink Floyd',
    //             album: 'The Dark Side of the Moon',
    //             url: 'https://www.youtube.com/embed/3JQ9KPoTeGU',
    //             imgUrl: 'https://i.ytimg.com/vi/3JQ9KPoTeGU/hqdefault.jpg',
    //             duration: 469
    //         }
    //     ]
    // },
    // {
    //     _id: 'F6A7B8C9D0',
    //     name: 'Abbey Road',
    //     type: 'album',
    //     stationImgUrl: 'https://i.ytimg.com/vi/sXhTjLsuc60/hqdefault.jpg', // album cover
    //     tags: ['Classic', 'Rock'],
    //     createdBy: {
    //         id: 'F6A7B8C9D0',
    //         fullName: 'The Beatles',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'sXhTjLsuc60',
    //             songName: 'Come Together',
    //             artist: 'The Beatles',
    //             album: 'Abbey Road',
    //             url: 'https://www.youtube.com/embed/sXhTjLsuc60',
    //             imgUrl: 'https://i.ytimg.com/vi/sXhTjLsuc60/hqdefault.jpg',
    //             duration: 260
    //         },
    //         {
    //             songId: 'xVau9EChJJc',
    //             songName: 'Something',
    //             artist: 'The Beatles',
    //             album: 'Abbey Road',
    //             url: 'https://www.youtube.com/embed/xVau9EChJJc',
    //             imgUrl: 'https://i.ytimg.com/vi/xVau9EChJJc/hqdefault.jpg',
    //             duration: 183
    //         },
    //         {
    //             songId: 'cRJB7b23i1c',
    //             songName: `Octopus's Garden`,
    //             artist: 'The Beatles',
    //             album: 'Abbey Road',
    //             url: 'https://www.youtube.com/embed/cRJB7b23i1c',
    //             imgUrl: 'https://i.ytimg.com/vi/cRJB7b23i1c/hqdefault.jpg',
    //             duration: 170
    //         },
    //         {
    //             songId: 'k75cECaAaiw',
    //             songName: 'Here Comes the Sun',
    //             artist: 'The Beatles',
    //             album: 'Abbey Road',
    //             url: 'https://www.youtube.com/embed/k75cECaAaiw',
    //             imgUrl: 'https://i.ytimg.com/vi/k75cECaAaiw/hqdefault.jpg',
    //             duration: 185
    //         },
    //         {
    //             songId: '3r5erPinW2g',
    //             songName: 'She Came In Through the Bathroom Window',
    //             artist: 'The Beatles',
    //             album: 'Abbey Road',
    //             url: 'https://www.youtube.com/embed/3r5erPinW2g',
    //             imgUrl: 'https://i.ytimg.com/vi/3r5erPinW2g/hqdefault.jpg',
    //             duration: 118
    //         }
    //     ]
    // },
    // {
    //     _id: 'H8I9J0K1L2',
    //     name: 'Rumours',
    //     type: 'album',
    //     stationImgUrl: 'https://i.ytimg.com/vi/NsxEtPHs6a0/hqdefault.jpg', // album cover
    //     tags: ['Rock', 'Classic'],
    //     createdBy: {
    //         id: 'H8I9J0K1L2',
    //         fullName: 'Fleetwood Mac',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'NsxEtPHs6a0',
    //             songName: 'Go Your Own Way',
    //             artist: 'Fleetwood Mac',
    //             album: 'Rumours',
    //             url: 'https://www.youtube.com/embed/NsxEtPHs6a0',
    //             imgUrl: 'https://i.ytimg.com/vi/NsxEtPHs6a0/hqdefault.jpg',
    //             duration: 228
    //         },
    //         {
    //             songId: 'iEtWI3-DhWs',
    //             songName: 'Dreams',
    //             artist: 'Fleetwood Mac',
    //             album: 'Rumours',
    //             url: 'https://www.youtube.com/embed/iEtWI3-DhWs',
    //             imgUrl: 'https://i.ytimg.com/vi/iEtWI3-DhWs/hqdefault.jpg',
    //             duration: 257
    //         },
    //         {
    //             songId: '3U0E4O1W3mQ',
    //             songName: `Don't Stop`,
    //             artist: 'Fleetwood Mac',
    //             album: 'Rumours',
    //             url: 'https://www.youtube.com/embed/3U0E4O1W3mQ',
    //             imgUrl: 'https://i.ytimg.com/vi/3U0E4O1W3mQ/hqdefault.jpg',
    //             duration: 190
    //         },
    //         {
    //             songId: 'FYXKabQxUyQ',
    //             songName: 'The Chain',
    //             artist: 'Fleetwood Mac',
    //             album: 'Rumours',
    //             url: 'https://www.youtube.com/embed/FYXKabQxUyQ',
    //             imgUrl: 'https://i.ytimg.com/vi/FYXKabQxUyQ/hqdefault.jpg',
    //             duration: 270
    //         },
    //         {
    //             songId: 'WXYuC9_pjOs',
    //             songName: 'You Make Loving Fun',
    //             artist: 'Fleetwood Mac',
    //             album: 'Rumours',
    //             url: 'https://www.youtube.com/embed/WXYuC9_pjOs',
    //             imgUrl: 'https://i.ytimg.com/vi/WXYuC9_pjOs/hqdefault.jpg',
    //             duration: 210
    //         }
    //     ]
    // },
    // {
    //     _id: 'J2K3L4M5N6',
    //     name: 'Back in Black',
    //     type: 'album',
    //     stationImgUrl: 'https://i.ytimg.com/vi/LJsFm09N-nc/hqdefault.jpg', // album cover
    //     tags: ['Rock', 'Hard Rock'],
    //     createdBy: {
    //         id: 'J2K3L4M5N6',
    //         fullName: 'AC/DC',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'LJsFm09N-nc',
    //             songName: 'Hells Bells',
    //             artist: 'AC/DC',
    //             album: 'Back in Black',
    //             url: 'https://www.youtube.com/embed/LJsFm09N-nc',
    //             imgUrl: 'https://i.ytimg.com/vi/LJsFm09N-nc/hqdefault.jpg',
    //             duration: 312
    //         },
    //         {
    //             songId: 't8k50VfeyN0',
    //             songName: 'Shoot to Thrill',
    //             artist: 'AC/DC',
    //             album: 'Back in Black',
    //             url: 'https://www.youtube.com/embed/t8k50VfeyN0',
    //             imgUrl: 'https://i.ytimg.com/vi/t8k50VfeyN0/hqdefault.jpg',
    //             duration: 317
    //         },
    //         {
    //             songId: 'VZsOaA1cofM',
    //             songName: 'Back in Black',
    //             artist: 'AC/DC',
    //             album: 'Back in Black',
    //             url: 'https://www.youtube.com/embed/VZsOaA1cofM',
    //             imgUrl: 'https://i.ytimg.com/vi/VZsOaA1cofM/hqdefault.jpg',
    //             duration: 255
    //         },
    //         {
    //             songId: '5bciH2WduL4',
    //             songName: 'You Shook Me All Night Long',
    //             artist: 'AC/DC',
    //             album: 'Back in Black',
    //             url: 'https://www.youtube.com/embed/5bciH2WduL4',
    //             imgUrl: 'https://i.ytimg.com/vi/5bciH2WduL4/hqdefault.jpg',
    //             duration: 210
    //         },
    //         {
    //             songId: 'H4lMfeKpMc8',
    //             songName: 'Rock and Roll Ain’t Noise Pollution',
    //             artist: 'AC/DC',
    //             album: 'Back in Black',
    //             url: 'https://www.youtube.com/embed/H4lMfeKpMc8',
    //             imgUrl: 'https://i.ytimg.com/vi/H4lMfeKpMc8/hqdefault.jpg',
    //             duration: 254
    //         }
    //     ]
    // },
    // {
    //     _id: 'K1L2M3N4O6',
    //     name: 'Hotel California',
    //     type: 'album',
    //     stationImgUrl: 'https://i.ytimg.com/vi/tsVxl8QcNyM/hqdefault.jpg', // album cover
    //     tags: ['Rock', 'Classic'],
    //     createdBy: {
    //         id: 'K1L2M3N4O5',
    //         fullName: 'Eagles',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'tsVxl8QcNyM',
    //             songName: 'Hotel California',
    //             artist: 'Eagles',
    //             album: 'Hotel California',
    //             url: 'https://www.youtube.com/embed/tsVxl8QcNyM',
    //             imgUrl: 'https://i.ytimg.com/vi/tsVxl8QcNyM/hqdefault.jpg',
    //             duration: 390
    //         },
    //         {
    //             songId: '2ZnhyZqWSt4',
    //             songName: 'New Kid in Town',
    //             artist: 'Eagles',
    //             album: 'Hotel California',
    //             url: 'https://www.youtube.com/embed/2ZnhyZqWSt4',
    //             imgUrl: 'https://i.ytimg.com/vi/2ZnhyZqWSt4/hqdefault.jpg',
    //             duration: 237
    //         },
    //         {
    //             songId: '9WrsG8azkMI',
    //             songName: 'Life in the Fast Lane',
    //             artist: 'Eagles',
    //             album: 'Hotel California',
    //             url: 'https://www.youtube.com/embed/9WrsG8azkMI',
    //             imgUrl: 'https://i.ytimg.com/vi/9WrsG8azkMI/hqdefault.jpg',
    //             duration: 255
    //         },
    //         {
    //             songId: '_2iq8QStoJ0',
    //             songName: 'Wasted Time',
    //             artist: 'Eagles',
    //             album: 'Hotel California',
    //             url: 'https://www.youtube.com/embed/_2iq8QStoJ0',
    //             imgUrl: 'https://i.ytimg.com/vi/_2iq8QStoJ0/hqdefault.jpg',
    //             duration: 303
    //         },
    //         {
    //             songId: 'Qm2L91tn8rs',
    //             songName: 'Pretty Maids All in a Row',
    //             artist: 'Eagles',
    //             album: 'Hotel California',
    //             url: 'https://www.youtube.com/embed/Qm2L91tn8rs',
    //             imgUrl: 'https://i.ytimg.com/vi/Qm2L91tn8rs/hqdefault.jpg',
    //             duration: 236
    //         }
    //     ]
    // },
    // {
    //     _id: 'M1N2O3P4Q5',
    //     name: 'Taylor Swift',
    //     type: 'artist',
    //     stationImgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png', // artist image
    //     tags: ['Pop', 'Country'],
    //     createdBy: {
    //         id: 'M1N2O3P4Q5',
    //         fullName: 'Taylor Swift',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: '09R8_2nJZjA',
    //             songName: 'Love Story',
    //             artist: 'Taylor Swift',
    //             album: 'Fearless',
    //             url: 'https://www.youtube.com/embed/09R8_2nJZjA',
    //             imgUrl: 'https://i.ytimg.com/vi/09R8_2nJZjA/hqdefault.jpg',
    //             duration: 235
    //         },
    //         {
    //             songId: 'W56FGX4XJx0',
    //             songName: 'Blank Space',
    //             artist: 'Taylor Swift',
    //             album: '1989',
    //             url: 'https://www.youtube.com/embed/W56FGX4XJx0',
    //             imgUrl: 'https://i.ytimg.com/vi/W56FGX4XJx0/hqdefault.jpg',
    //             duration: 231
    //         },
    //         {
    //             songId: 'GrG-RJpwuq0',
    //             songName: 'Shake It Off',
    //             artist: 'Taylor Swift',
    //             album: '1989',
    //             url: 'https://www.youtube.com/embed/GrG-RJpwuq0',
    //             imgUrl: 'https://i.ytimg.com/vi/GrG-RJpwuq0/hqdefault.jpg',
    //             duration: 219
    //         },
    //         {
    //             songId: 'PsI-Hw-ZgEg',
    //             songName: 'You Belong With Me',
    //             artist: 'Taylor Swift',
    //             album: 'Fearless',
    //             url: 'https://www.youtube.com/embed/PsI-Hw-ZgEg',
    //             imgUrl: 'https://i.ytimg.com/vi/PsI-Hw-ZgEg/hqdefault.jpg',
    //             duration: 236
    //         },
    //         {
    //             songId: 'LYU06sKf5QY',
    //             songName: 'Cardigan',
    //             artist: 'Taylor Swift',
    //             album: 'Folklore',
    //             url: 'https://www.youtube.com/embed/LYU06sKf5QY',
    //             imgUrl: 'https://i.ytimg.com/vi/LYU06sKf5QY/hqdefault.jpg',
    //             duration: 239
    //         }
    //     ]
    // },
    // {
    //     _id: 'R2S3T4U5V6',
    //     name: 'Drake',
    //     type: 'artist',
    //     stationImgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png', // artist image
    //     tags: ['Hip-Hop', 'R&B'],
    //     createdBy: {
    //         id: 'R2S3T4U5V6',
    //         fullName: 'Drake',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'YmZrKlAL8rY',
    //             songName: 'God’s Plan',
    //             artist: 'Drake',
    //             album: 'Scorpion',
    //             url: 'https://www.youtube.com/embed/YmZrKlAL8rY',
    //             imgUrl: 'https://i.ytimg.com/vi/YmZrKlAL8rY/hqdefault.jpg',
    //             duration: 198
    //         },
    //         {
    //             songId: 'H5cI6nGhc_U',
    //             songName: 'In My Feelings',
    //             artist: 'Drake',
    //             album: 'Scorpion',
    //             url: 'https://www.youtube.com/embed/H5cI6nGhc_U',
    //             imgUrl: 'https://i.ytimg.com/vi/H5cI6nGhc_U/hqdefault.jpg',
    //             duration: 228
    //         },
    //         {
    //             songId: 'p9-H7HJ9fa4',
    //             songName: 'One Dance',
    //             artist: 'Drake',
    //             album: 'Views',
    //             url: 'https://www.youtube.com/embed/p9-H7HJ9fa4',
    //             imgUrl: 'https://i.ytimg.com/vi/p9-H7HJ9fa4/hqdefault.jpg',
    //             duration: 174
    //         },
    //         {
    //             songId: 'pLxl51xgpHE',
    //             songName: 'In My Feelings',
    //             artist: 'Drake',
    //             album: 'Scorpion',
    //             url: 'https://www.youtube.com/embed/pLxl51xgpHE',
    //             imgUrl: 'https://i.ytimg.com/vi/pLxl51xgpHE/hqdefault.jpg',
    //             duration: 228
    //         },
    //         {
    //             songId: 'yPa51UsO3wg',
    //             songName: 'Hold On, We’re Going Home',
    //             artist: 'Drake',
    //             album: 'Nothing Was the Same',
    //             url: 'https://www.youtube.com/embed/yPa51UsO3wg',
    //             imgUrl: 'https://i.ytimg.com/vi/yPa51UsO3wg/hqdefault.jpg',
    //             duration: 206
    //         }
    //     ]
    // },
    // {
    //     _id: 'W7X8Y9Z0A1',
    //     name: 'Adele',
    //     type: 'artist',
    //     stationImgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png', // artist image
    //     tags: ['Pop', 'Soul'],
    //     createdBy: {
    //         id: 'W7X8Y9Z0A1',
    //         fullName: 'Adele',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'F28sBW3XQxY',
    //             songName: 'Rolling in the Deep',
    //             artist: 'Adele',
    //             album: '21',
    //             url: 'https://www.youtube.com/embed/F28sBW3XQxY',
    //             imgUrl: 'https://i.ytimg.com/vi/F28sBW3XQxY/hqdefault.jpg',
    //             duration: 228
    //         },
    //         {
    //             songId: 'sV8Iq0UaSK8',
    //             songName: 'Someone Like You',
    //             artist: 'Adele',
    //             album: '21',
    //             url: 'https://www.youtube.com/embed/sV8Iq0UaSK8',
    //             imgUrl: 'https://i.ytimg.com/vi/sV8Iq0UaSK8/hqdefault.jpg',
    //             duration: 285
    //         },
    //         {
    //             songId: 'cM0z8CckuUk',
    //             songName: 'Hello',
    //             artist: 'Adele',
    //             album: '25',
    //             url: 'https://www.youtube.com/embed/cM0z8CckuUk',
    //             imgUrl: 'https://i.ytimg.com/vi/cM0z8CckuUk/hqdefault.jpg',
    //             duration: 295
    //         },
    //         {
    //             songId: '0zMZsW0OZGc',
    //             songName: 'When We Were Young',
    //             artist: 'Adele',
    //             album: '25',
    //             url: 'https://www.youtube.com/embed/0zMZsW0OZGc',
    //             imgUrl: 'https://i.ytimg.com/vi/0zMZsW0OZGc/hqdefault.jpg',
    //             duration: 290
    //         },
    //         {
    //             songId: 'Gq9YJpQo-rE',
    //             songName: 'Set Fire to the Rain',
    //             artist: 'Adele',
    //             album: '21',
    //             url: 'https://www.youtube.com/embed/Gq9YJpQo-rE',
    //             imgUrl: 'https://i.ytimg.com/vi/Gq9YJpQo-rE/hqdefault.jpg',
    //             duration: 262
    //         }
    //     ]
    // },
    // {
    //     _id: 'X2Y3Z4A5B6',
    //     name: 'Bruno Mars',
    //     type: 'artist',
    //     stationImgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png', // artist image
    //     tags: ['Pop', 'R&B'],
    //     createdBy: {
    //         id: 'X2Y3Z4A5B6',
    //         fullName: 'Bruno Mars',
    //         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    //     },
    //     likedByUsers: [],
    //     songs: [
    //         {
    //             songId: 'OPf0YbXqDm0',
    //             songName: 'Uptown Funk',
    //             artist: 'Bruno Mars',
    //             album: 'Uptown Special',
    //             url: 'https://www.youtube.com/embed/OPf0YbXqDm0',
    //             imgUrl: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
    //             duration: 271
    //         },
    //         {
    //             songId: 'KQ6iUzXxW1s',
    //             songName: 'Just the Way You Are',
    //             artist: 'Bruno Mars',
    //             album: 'Doo-Wops & Hooligans',
    //             url: 'https://www.youtube.com/embed/KQ6iUzXxW1s',
    //             imgUrl: 'https://i.ytimg.com/vi/KQ6iUzXxW1s/hqdefault.jpg',
    //             duration: 220
    //         },
    //         {
    //             songId: 'Qn7Im9d6u6k',
    //             songName: 'Grenade',
    //             artist: 'Bruno Mars',
    //             album: 'Doo-Wops & Hooligans',
    //             url: 'https://www.youtube.com/embed/Qn7Im9d6u6k',
    //             imgUrl: 'https://i.ytimg.com/vi/Qn7Im9d6u6k/hqdefault.jpg',
    //             duration: 222
    //         },
    //         {
    //             songId: 'Y6tM0sQcMg8',
    //             songName: '24K Magic',
    //             artist: 'Bruno Mars',
    //             album: '24K Magic',
    //             url: 'https://www.youtube.com/embed/Y6tM0sQcMg8',
    //             imgUrl: 'https://i.ytimg.com/vi/Y6tM0sQcMg8/hqdefault.jpg',
    //             duration: 226
    //         },
    //         {
    //             songId: 'YbeR_sEjU8U',
    //             songName: `That's What I Like`,
    //             artist: 'Bruno Mars',
    //             album: '24K Magic',
    //             url: 'https://www.youtube.com/embed/YbeR_sEjU8U',
    //             imgUrl: 'https://i.ytimg.com/vi/YbeR_sEjU8U/hqdefault.jpg',
    //             duration: 206
    //         }
    //     ]
    // }
]




