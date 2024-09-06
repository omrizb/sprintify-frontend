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
        isPinned: true,
        stationImgUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
    }
]




