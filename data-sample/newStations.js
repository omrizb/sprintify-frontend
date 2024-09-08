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
                spotifyId: `7tFiyTwD0nx5a1eklYtX2J`,
                ytId: `fJ9rUzIMcZQ`,
                songName: `Bohemian Rhapsody - Remastered 2011`,
                artist: {
                    name: `Queen`,
                    spotifyId: `1dfeR4HaWDbWqFHLkxsg1d`
                },
                album: {
                    name: `A Night At The Opera (Deluxe Remastered Version)`,
                    spotifyId: `6X9k3hSsvQck2OfKYdBbXr`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a`,
                    small: `https://i.scdn.co/image/ab67616d00004851ce4f1737bc8a646c8c4bd25a`
                },
                duration: 354
            },
            {
                spotifyId: `7qiZfU4dY1lWllzX7mPBI3`,
                ytId: `JGwWNGJdvx8`,
                songName: `Shape of You`,
                artist: {
                    name: `Ed Sheeran`,
                    spotifyId: `6eUKZXaKkcviH0Ku9w2n3V`
                },
                album: {
                    name: `÷ (Deluxe)`,
                    spotifyId: `3T4tUhGYeRNVUGevb0wThu`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96`,
                    small: `https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96`
                },
                duration: 233
            },
            {
                spotifyId: `7J1uxwnxfQLu4APicE5Rnj`,
                ytId: `Zi_XLOBDo_Y`,
                songName: `Billie Jean`,
                artist: {
                    name: `Michael Jackson`,
                    spotifyId: `3fMbdgg4jU18AjLCKBhRSm`
                },
                album: {
                    name: `Thriller`,
                    spotifyId: `2ANVost0y2y52ema1E9xAZ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97`,
                    small: `https://i.scdn.co/image/ab67616d00004851de437d960dda1ac0a3586d97`
                },
                duration: 294
            },
            {
                spotifyId: `0VjIjW4GlUZAMYd2vXMi3b`,
                ytId: `4NRXx6U8ABQ`,
                songName: `Blinding Lights`,
                artist: {
                    name: `The Weeknd`,
                    spotifyId: `1Xyo4u8uXC1ZmMpatF05PJ`
                },
                album: {
                    name: `After Hours`,
                    spotifyId: `4yP0hdKOZPNshxUOjY0cZj`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36`,
                    small: `https://i.scdn.co/image/ab67616d000048518863bc11d2aa12b54f5aeb36`
                },
                duration: 200
            },
            {
                spotifyId: `40riOy7x9W7GXjyGp4pjAv`,
                ytId: `BciS5krYL80`,
                songName: `Hotel California - 2013 Remaster`,
                artist: {
                    name: `Eagles`,
                    spotifyId: `0ECwFtbIWEVNwjlrfc6xoL`
                },
                album: {
                    name: `Hotel California (2013 Remaster)`,
                    spotifyId: `2widuo17g5CEC66IbzveRu`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2734637341b9f507521afa9a778`,
                    small: `https://i.scdn.co/image/ab67616d000048514637341b9f507521afa9a778`
                },
                duration: 391
            },
            {
                spotifyId: `1c8gk2PeTE04A1pIDH9YMk`,
                ytId: `rYEDA3JcQqw`,
                songName: `Rolling in the Deep`,
                artist: {
                    name: `Adele`,
                    spotifyId: `4dpARuHxo51G3z768sgnrY`
                },
                album: {
                    name: `21`,
                    spotifyId: `0Lg1uZvI312TPqxNWShFXL`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300`,
                    small: `https://i.scdn.co/image/ab67616d000048512118bf9b198b05a95ded6300`
                },
                duration: 228
            },
            {
                spotifyId: `1YILIKjno1jrlDhPDmAZtO`,
                ytId: `OPf0YbXqDm0`,
                songName: `Uptown Funk (made popular by Mark Ronson ft. Bruno Mars) [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Pop Party Pack 6 - Party Tyme - Vocal Versions`,
                    spotifyId: `0ttqBuDOfQr0m68xo0KRQA`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273c792eeb3ea7615b548287172`,
                    small: `https://i.scdn.co/image/ab67616d00004851c792eeb3ea7615b548287172`
                },
                duration: 273
            },
            {
                spotifyId: `5ghIJDpPoe3CfHMGu71E6T`,
                ytId: `hTWKbfoikeg`,
                songName: `Smells Like Teen Spirit`,
                artist: {
                    name: `Nirvana`,
                    spotifyId: `6olE6TJLqED3rqDCT0FyPh`
                },
                album: {
                    name: `Nevermind (Remastered)`,
                    spotifyId: `2guirTSEqLizK7j9i1MTTZ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf`,
                    small: `https://i.scdn.co/image/ab67616d00004851e175a19e530c898d167d39bf`
                },
                duration: 301
            },
            {
                spotifyId: `5CQ30WqJwcep0pYcV4AMNc`,
                ytId: `QkF3oxziUI4`,
                songName: `Stairway to Heaven - Remaster`,
                artist: {
                    name: `Led Zeppelin`,
                    spotifyId: `36QJpDe2go2KgaRleHCDTp`
                },
                album: {
                    name: `Led Zeppelin IV (Deluxe Edition)`,
                    spotifyId: `44Ig8dzqOkvkGDzaUof9lK`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69`,
                    small: `https://i.scdn.co/image/ab67616d00004851c8a11e48c91a982d086afc69`
                },
                duration: 482
            },
            {
                spotifyId: `34gCuhDGsG4bRPIf9bb02f`,
                ytId: `lp-EO5I60KA`,
                songName: `Thinking out Loud`,
                artist: {
                    name: `Ed Sheeran`,
                    spotifyId: `6eUKZXaKkcviH0Ku9w2n3V`
                },
                album: {
                    name: `x (Deluxe Edition)`,
                    spotifyId: `1xn54DMo2qIqBuMqHtUsFd`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27313b3e37318a0c247b550bccd`,
                    small: `https://i.scdn.co/image/ab67616d0000485113b3e37318a0c247b550bccd`
                },
                duration: 281
            },
            {
                spotifyId: `0aym2LBJBk9DAYuHHutrIl`,
                ytId: `A_MjCqQoLLA`,
                songName: `Hey Jude - Remastered 2015`,
                artist: {
                    name: `The Beatles`,
                    spotifyId: `3WrFJ7ztbogyGnTHbHJFl2`
                },
                album: {
                    name: `1 (Remastered)`,
                    spotifyId: `7vEJAtP3KgKSpOHVgwm3Eh`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf`,
                    small: `https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf`
                },
                duration: 425
            },
            {
                spotifyId: `2VxeLyX666F8uXCJ0dZF8B`,
                ytId: `bo_efYhYU2A`,
                songName: `Shallow`,
                artist: {
                    name: `Lady Gaga`,
                    spotifyId: `1HY2Jd0NmPuamShAr6KMms`
                },
                album: {
                    name: `A Star Is Born Soundtrack`,
                    spotifyId: `4sLtOBOzn4s3GDUv3c5oJD`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342`,
                    small: `https://i.scdn.co/image/ab67616d00004851e2d156fdc691f57900134342`
                },
                duration: 215
            },
            {
                spotifyId: `4SSzBIcyIq7rRItmEsT74P`,
                ytId: `kJQP7kiw5Fk`,
                songName: `Despacito (Remix) [made popular by Luis Fonsi & Daddy Yankee ft. Justin Bieber] [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Pop Party Pack 8 - Party Tyme - Vocal Versions`,
                    spotifyId: `5zY0NJegRsc1DzLMSgOGQQ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2737baaa8cb53b689654262a52d`,
                    small: `https://i.scdn.co/image/ab67616d000048517baaa8cb53b689654262a52d`
                },
                duration: 228
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
        createdAt: 1520746778065,
        addedAt: 1658912695416,
        songs: [
            {
                spotifyId: `7snQQk1zcKl8gZ92AnueZW`,
                ytId: `1w7OgIMMRc4`,
                songName: `Sweet Child O' Mine`,
                artist: {
                    name: `Guns N' Roses`,
                    spotifyId: `3qm84nBOXUEQ2vnTfUTTFC`
                },
                album: {
                    name: `Appetite For Destruction`,
                    spotifyId: `28yHV3Gdg30AiB8h8em1eW`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27321ebf49b3292c3f0f575f0f5`,
                    small: `https://i.scdn.co/image/ab67616d0000485121ebf49b3292c3f0f575f0f5`
                },
                duration: 356
            },
            {
                spotifyId: `2Fxmhks0bxGSBdJ92vM42m`,
                ytId: `DyDfgMOUjCI`,
                songName: `bad guy`,
                artist: {
                    name: `Billie Eilish`,
                    spotifyId: `6qqNVTkY8uBg9cP3Jd7DAH`
                },
                album: {
                    name: `WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?`,
                    spotifyId: `0S0KGZnfBGSIssfF54WSJh`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce`,
                    small: `https://i.scdn.co/image/ab67616d0000485150a3147b4edd7701a876c6ce`
                },
                duration: 194
            },
            {
                spotifyId: `3mRM4NM8iO7UBqrSigCQFH`,
                ytId: `fNFzfwLM72c`,
                songName: `Stayin' Alive - From "Saturday Night Fever" Soundtrack`,
                artist: {
                    name: `Bee Gees`,
                    spotifyId: `1LZEQNv7sE11VDY3SdxQeN`
                },
                album: {
                    name: `Greatest`,
                    spotifyId: `5YHZaCxCuuK81h4Fimb9rT`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27352038992fc6d7868f31d23b7`,
                    small: `https://i.scdn.co/image/ab67616d0000485152038992fc6d7868f31d23b7`
                },
                duration: 285
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
        createdAt: 1663456894661,
        addedAt: 1670568999136,
        songs: [
            {
                spotifyId: `4eHbdreAnSOrDDsFfc4Fpm`,
                ytId: `3JWTaaS7LdU`,
                songName: `I Will Always Love You`,
                artist: {
                    name: `Whitney Houston`,
                    spotifyId: `6XpaIBNiVzIetEPCWDvAFP`
                },
                album: {
                    name: `The Bodyguard - Original Soundtrack Album`,
                    spotifyId: `7JVJlkNNobS0GSoy4tCS96`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273456c0b5d0316a80dc600802e`,
                    small: `https://i.scdn.co/image/ab67616d00004851456c0b5d0316a80dc600802e`
                },
                duration: 271
            },
            {
                spotifyId: `3U4isOIWM3VvDubwSI3y7a`,
                ytId: `450p7goxZqg`,
                songName: `All of Me`,
                artist: {
                    name: `John Legend`,
                    spotifyId: `5y2Xq6xcjJb2jVM54GHK3t`
                },
                album: {
                    name: `Love In The Future (Expanded Edition)`,
                    spotifyId: `4OTAx9un4e6NfoHuVRiOrC`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27394c9217a398f5174757c0c78`,
                    small: `https://i.scdn.co/image/ab67616d0000485194c9217a398f5174757c0c78`
                },
                duration: 269
            },
            {
                spotifyId: `5RKQ5NdjSh2QzD4MaunT91`,
                ytId: `1k8craCGpgs`,
                songName: `Don't Stop Believin' (2022 Remaster)`,
                artist: {
                    name: `Journey`,
                    spotifyId: `0rvjqX7ttXeg3mTy8Xscbt`
                },
                album: {
                    name: `Escape (2022 Remaster)`,
                    spotifyId: `4guAwaniEAEQSW0NCpo4gm`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27363fa4751355b66f236943275`,
                    small: `https://i.scdn.co/image/ab67616d0000485163fa4751355b66f236943275`
                },
                duration: 249
            },
            {
                spotifyId: `60nZcImufyMA1MKQY3dcCH`,
                ytId: `ZbZSe6N_BXs`,
                songName: `Happy - From "Despicable Me 2"`,
                artist: {
                    name: `Pharrell Williams`,
                    spotifyId: `2RdwBSPQiwcmiDo9kixcl8`
                },
                album: {
                    name: `G I R L`,
                    spotifyId: `0lrmy4pJINsFzycJvttX2W`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e8107e6d9214baa81bb79bba`,
                    small: `https://i.scdn.co/image/ab67616d00004851e8107e6d9214baa81bb79bba`
                },
                duration: 232
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
        createdAt: 1536351131722,
        addedAt: 1672042571160,
        songs: [
            {
                spotifyId: `2WfaOiMkCvy7F5fcp2zZ8L`,
                ytId: `djV11Xbc914`,
                songName: `Take on Me`,
                artist: {
                    name: `a-ha`,
                    spotifyId: `2jzc5TC5TVFLXQlBNiIUzE`
                },
                album: {
                    name: `Hunting High and Low`,
                    spotifyId: `1ER3B6zev5JEAaqhnyyfbf`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e8dd4db47e7177c63b0b7d53`,
                    small: `https://i.scdn.co/image/ab67616d00004851e8dd4db47e7177c63b0b7d53`
                },
                duration: 225
            },
            {
                spotifyId: `480F1NHaaFyFH0nBntjVDa`,
                ytId: `0zGcUoRlhmw`,
                songName: `Closer (Originally Performed by The Chainsmokers ft. Halsey) - Instrumental Version`,
                artist: {
                    name: `KaraokePro`,
                    spotifyId: `2QQVBYuFqkbV1je2L9aV1Z`
                },
                album: {
                    name: `Closer (Originally Performed by The Chainsmokers ft. Halsey) [Instrumental Version]`,
                    spotifyId: `1GhalUIb3JtS5KuHL8qw1U`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27360007848929c55d6356e8d8c`,
                    small: `https://i.scdn.co/image/ab67616d0000485160007848929c55d6356e8d8c`
                },
                duration: 245
            },
            {
                spotifyId: `2374M0fQpWi3dLnB54qaLX`,
                ytId: `FTQbiNvZqaY`,
                songName: `Africa`,
                artist: {
                    name: `TOTO`,
                    spotifyId: `0PFtn5NtBbbUNbU9EAmIWF`
                },
                album: {
                    name: `Toto IV`,
                    spotifyId: `62U7xIHcID94o20Of5ea4D`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b`,
                    small: `https://i.scdn.co/image/ab67616d000048514a052b99c042dc15f933145b`
                },
                duration: 295
            },
            {
                spotifyId: `1zwMYTA5nlNjZxYrvBB2pV`,
                ytId: `hLQl3WQQoQ0`,
                songName: `Someone Like You`,
                artist: {
                    name: `Adele`,
                    spotifyId: `4dpARuHxo51G3z768sgnrY`
                },
                album: {
                    name: `21`,
                    spotifyId: `0Lg1uZvI312TPqxNWShFXL`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300`,
                    small: `https://i.scdn.co/image/ab67616d000048512118bf9b198b05a95ded6300`
                },
                duration: 285
            },
            {
                spotifyId: `7ygpwy2qP3NbrxVkHvUhXY`,
                ytId: `bx1Bh8ZvH84`,
                songName: `Wonderwall - Remastered`,
                artist: {
                    name: `Oasis`,
                    spotifyId: `2DaxqgrOhkeH0fpeiQq2f4`
                },
                album: {
                    name: `(What's The Story) Morning Glory? (Deluxe Remastered Edition)`,
                    spotifyId: `6tOe4eAF8xNhEkl9WyvsE4`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2737a4c8c59851c88f6794c3cbf`,
                    small: `https://i.scdn.co/image/ab67616d000048517a4c8c59851c88f6794c3cbf`
                },
                duration: 258
            },
            {
                spotifyId: `2xHxKGGGQjudyLpAQrHRHU`,
                ytId: `r7qovpFAGrQ`,
                songName: `Old Town Road (Remix) [made popular by Lil Nas X ft. Billy Ray Cyrus] [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Pop Party Pack 9 - Party Tyme (Vocal Versions)`,
                    spotifyId: `0UFjrTvhneQA4wzpTCniE7`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273a89ef85d131c98d076a47673`,
                    small: `https://i.scdn.co/image/ab67616d00004851a89ef85d131c98d076a47673`
                },
                duration: 157
            },
            {
                spotifyId: `3BovdzfaX4jb5KFQwoPfAw`,
                ytId: `oRdxUFDoQe0`,
                songName: `Beat It`,
                artist: {
                    name: `Michael Jackson`,
                    spotifyId: `3fMbdgg4jU18AjLCKBhRSm`
                },
                album: {
                    name: `Thriller`,
                    spotifyId: `2ANVost0y2y52ema1E9xAZ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97`,
                    small: `https://i.scdn.co/image/ab67616d00004851de437d960dda1ac0a3586d97`
                },
                duration: 258
            },
            {
                spotifyId: `64DnH7p7396lzw98TDVrNO`,
                ytId: `BQ0mxQXmLsk`,
                songName: `Havana (Made Popular By Camila Cabello ft. Young Thug) [Vocal Version]`,
                artist: {
                    name: `Party Tyme Karaoke`,
                    spotifyId: `3JoDcjZtpq0ccldFgYmeAB`
                },
                album: {
                    name: `Party Tyme Karaoke - Pop Female Hits 3 (Vocal Versions)`,
                    spotifyId: `7KZkNLKSesoqjZtiTpwIvO`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273365475af64303767990e0978`,
                    small: `https://i.scdn.co/image/ab67616d00004851365475af64303767990e0978`
                },
                duration: 214
            },
            {
                spotifyId: `7pKfPomDEeI4TPT6EOYjn9`,
                ytId: `ugrAo8wEPiI`,
                songName: `Imagine - Remastered 2010`,
                artist: {
                    name: `John Lennon`,
                    spotifyId: `4x1nvY2FN8jxqAFA0DA02H`
                },
                album: {
                    name: `Imagine`,
                    spotifyId: `0xzaemKucrJpYhyl7TltAk`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27399581550ef9746ca582bb3cc`,
                    small: `https://i.scdn.co/image/ab67616d0000485199581550ef9746ca582bb3cc`
                },
                duration: 187
            },
            {
                spotifyId: `09CtPGIpYB4BrO8qb1RGsF`,
                ytId: `fRh_vgS2dFE`,
                songName: `Sorry`,
                artist: {
                    name: `Justin Bieber`,
                    spotifyId: `1uNFoZAHBGtllmzznpCI3s`
                },
                album: {
                    name: `Purpose (Deluxe)`,
                    spotifyId: `6Fr2rQkZ383FcMqFyT7yPr`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de`,
                    small: `https://i.scdn.co/image/ab67616d00004851f46b9d202509a8f7384b90de`
                },
                duration: 200
            },
            {
                spotifyId: `37ZJ0p5Jm13JPevGcx4SkF`,
                ytId: `lDK9QqIzhwk`,
                songName: `Livin' On A Prayer`,
                artist: {
                    name: `Bon Jovi`,
                    spotifyId: `58lV9VcRSjABbAbfWS6skp`
                },
                album: {
                    name: `Slippery When Wet`,
                    spotifyId: `0kBfgEilUFCMIQY5IOjG4t`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2731336b31b6a1799f0de5807ac`,
                    small: `https://i.scdn.co/image/ab67616d000048511336b31b6a1799f0de5807ac`
                },
                duration: 249
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
        createdAt: 1525122704915,
        addedAt: 1655214546560,
        songs: [
            {
                spotifyId: `6v3KW9xbzN5yKLt9YKDYA2`,
                ytId: `Pkh8UtuejGw`,
                songName: `Señorita`,
                artist: {
                    name: `Shawn Mendes`,
                    spotifyId: `7n2wHs1TKAczGzO7Dd2rGr`
                },
                album: {
                    name: `Shawn Mendes (Deluxe)`,
                    spotifyId: `0xzScN8P3hQAz3BT3YYX5w`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273c820f033bd82bef4355d1563`,
                    small: `https://i.scdn.co/image/ab67616d00004851c820f033bd82bef4355d1563`
                },
                duration: 190
            },
            {
                spotifyId: `003vvx7Niy0yvhvHt4a68B`,
                ytId: `gGdGFtwCNBE`,
                songName: `Mr. Brightside`,
                artist: {
                    name: `The Killers`,
                    spotifyId: `0C0XlULifJtAgn6ZNCW2eu`
                },
                album: {
                    name: `Hot Fuss`,
                    spotifyId: `4piJq7R3gjUOxnYs6lDCTg`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273ccdddd46119a4ff53eaf1f5d`,
                    small: `https://i.scdn.co/image/ab67616d00004851ccdddd46119a4ff53eaf1f5d`
                },
                duration: 222
            },
            {
                spotifyId: `1WkMMavIMc4JZ8cfMmxHkI`,
                ytId: `ru0K8uYEZWw`,
                songName: `CAN'T STOP THE FEELING! (from DreamWorks Animation's "TROLLS")`,
                artist: {
                    name: `Justin Timberlake`,
                    spotifyId: `31TPClRtHm23RisEBtV3X7`
                },
                album: {
                    name: `TROLLS (Original Motion Picture Soundtrack)`,
                    spotifyId: `65ayND23IInUPHJKsaAqe7`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273d965d29d7dcf46ade5a8a7e4`,
                    small: `https://i.scdn.co/image/ab67616d00004851d965d29d7dcf46ade5a8a7e4`
                },
                duration: 237
            },
            {
                spotifyId: `3AhXZa8sUQht0UEdBJgpGc`,
                ytId: `IwOfCgkyEj0`,
                songName: `Like a Rolling Stone`,
                artist: {
                    name: `Bob Dylan`,
                    spotifyId: `74ASZWbe4lXaubB36ztrGX`
                },
                album: {
                    name: `Highway 61 Revisited`,
                    spotifyId: `6YabPKtZAjxwyWbuO9p4ZD`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27341720ef0ae31e10d39e43ca2`,
                    small: `https://i.scdn.co/image/ab67616d0000485141720ef0ae31e10d39e43ca2`
                },
                duration: 369
            },
            {
                spotifyId: `17u2WZq0EgeX5Ra3c1v6n9`,
                ytId: `UceaB4D0jpo`,
                songName: `Rockstar (Made Popular By Post Malone ft. 21 Savage) [Vocal Version]`,
                artist: {
                    name: `Party Tyme Karaoke`,
                    spotifyId: `3JoDcjZtpq0ccldFgYmeAB`
                },
                album: {
                    name: `Party Tyme Karaoke - Super Hits 31 - Vocal Versions`,
                    spotifyId: `7C1zCs2QIy0mrlbrUtAGwt`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e2f15c0561a5093866f8a0cd`,
                    small: `https://i.scdn.co/image/ab67616d00004851e2f15c0561a5093866f8a0cd`
                },
                duration: 218
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
        createdAt: 1589509512211,
        addedAt: 1660260425775,
        songs: [
            {
                spotifyId: `5Z01UMMf7V1o0MzF86s6WJ`,
                ytId: `xFYQQPAOz7Y`,
                songName: `Lose Yourself`,
                artist: {
                    name: `Eminem`,
                    spotifyId: `7dGJo4pcD2V6oG8kP0tJRR`
                },
                album: {
                    name: `Curtain Call: The Hits (Deluxe Edition)`,
                    spotifyId: `5qENHeCSlwWpEzb25peRmQ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273eab40fc794b88b9d1e012578`,
                    small: `https://i.scdn.co/image/ab67616d00004851eab40fc794b88b9d1e012578`
                },
                duration: 326
            },
            {
                spotifyId: `5xTtaWoae3wi06K5WfVUUH`,
                ytId: `nfWlot6h_JM`,
                songName: `Shake It Off`,
                artist: {
                    name: `Taylor Swift`,
                    spotifyId: `06HL4z0CvFAxyc27GXpf02`
                },
                album: {
                    name: `1989`,
                    spotifyId: `2QJmrSgbdM35R67eoGQo4j`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2739abdf14e6058bd3903686148`,
                    small: `https://i.scdn.co/image/ab67616d000048519abdf14e6058bd3903686148`
                },
                duration: 219
            },
            {
                spotifyId: `0GjEhVFGZW8afUYGChu3Rr`,
                ytId: `xFrGuyw1V8s`,
                songName: `Dancing Queen`,
                artist: {
                    name: `ABBA`,
                    spotifyId: `0LcJLqbBmaGUft1e9Mm8HV`
                },
                album: {
                    name: `Arrival`,
                    spotifyId: `1V6a99EbTTIegOhWoPxYI9`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27370f7a1b35d5165c85b95a0e0`,
                    small: `https://i.scdn.co/image/ab67616d0000485170f7a1b35d5165c85b95a0e0`
                },
                duration: 230
            },
            {
                spotifyId: `663UJBmPsgBc1yYg7McfAr`,
                ytId: `TUVcZfQe-Kw`,
                songName: `Levitating (made popular by Dua Lipa ft. DaBaby) [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Super Hits 37 - Party Tyme (Vocal Versions)`,
                    spotifyId: `6ctHQdlc7wVDKQLHAPgQnf`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2731f714a71df8e364d8e35d6fa`,
                    small: `https://i.scdn.co/image/ab67616d000048511f714a71df8e364d8e35d6fa`
                },
                duration: 213
            },
            {
                spotifyId: `2LlQb7Uoj1kKyGhlkBf9aC`,
                ytId: `sOnqjkJTMaA`,
                songName: `Thriller`,
                artist: {
                    name: `Michael Jackson`,
                    spotifyId: `3fMbdgg4jU18AjLCKBhRSm`
                },
                album: {
                    name: `Thriller`,
                    spotifyId: `2ANVost0y2y52ema1E9xAZ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97`,
                    small: `https://i.scdn.co/image/ab67616d00004851de437d960dda1ac0a3586d97`
                },
                duration: 357
            },
            {
                spotifyId: `4G8gkOterJn0Ywt6uhqbhp`,
                ytId: `ktvTqknDobU`,
                songName: `Radioactive`,
                artist: {
                    name: `Imagine Dragons`,
                    spotifyId: `53XhwfbYqKCa1cC15pYq2q`
                },
                album: {
                    name: `Night Visions`,
                    spotifyId: `6htgf3qv7vGcsdxLCDxKp8`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273b2b2747c89d2157b0b29fb6a`,
                    small: `https://i.scdn.co/image/ab67616d00004851b2b2747c89d2157b0b29fb6a`
                },
                duration: 186
            },
            {
                spotifyId: `2HHtWyy5CgaQbC7XSoOb0e`,
                ytId: `btPJPFnesV4`,
                songName: `Eye of the Tiger`,
                artist: {
                    name: `Survivor`,
                    spotifyId: `26bcq2nyj5GB7uRr558iQg`
                },
                album: {
                    name: `Eye Of The Tiger`,
                    spotifyId: `4PT9VulQaQP6XR1xBI2x1W`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2734e2755e7a96ec5e062c76aac`,
                    small: `https://i.scdn.co/image/ab67616d000048514e2755e7a96ec5e062c76aac`
                },
                duration: 243
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
        createdAt: 1595198626770,
        addedAt: 1650599371425,
        songs: [
            {
                spotifyId: `3Um9toULmYFGCpvaIPFw7l`,
                ytId: `H-kA3UtBj4M`,
                songName: `What's Going On`,
                artist: {
                    name: `Marvin Gaye`,
                    spotifyId: `3koiLjNrgRTNbOwViDipeA`
                },
                album: {
                    name: `What's Going On`,
                    spotifyId: `2v6ANhWhZBUKkg6pJJBs3B`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273b36949bee43217351961ffbc`,
                    small: `https://i.scdn.co/image/ab67616d00004851b36949bee43217351961ffbc`
                },
                duration: 233
            },
            {
                spotifyId: `5YwYmrpCULmbHcFDALupzO`,
                ytId: `aJOTlE1K90k`,
                songName: `Girls Like You (made popular by Maroon 5 ft. Cardi B) [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Pop Party Pack 8 - Party Tyme - Vocal Versions`,
                    spotifyId: `5zY0NJegRsc1DzLMSgOGQQ`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2737baaa8cb53b689654262a52d`,
                    small: `https://i.scdn.co/image/ab67616d000048517baaa8cb53b689654262a52d`
                },
                duration: 235
            },
            {
                spotifyId: `3APHT3KjbHi9OllkVQsuXF`,
                ytId: `CU3mc0yvRNk`,
                songName: `Bohemian Like You`,
                artist: {
                    name: `The Dandy Warhols`,
                    spotifyId: `7siPLyFwRFYQkKgWKJ5Sod`
                },
                album: {
                    name: `Thirteen Tales From Urban Bohemia`,
                    spotifyId: `3RFenjlpdmIfkYATMdkbak`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2735f13db82827b6abb7e31a488`,
                    small: `https://i.scdn.co/image/ab67616d000048515f13db82827b6abb7e31a488`
                },
                duration: 211
            },
            {
                spotifyId: `0tgVpDi06FyKpA1z0VMD4v`,
                ytId: `2Vv-BfVoq4g`,
                songName: `Perfect`,
                artist: {
                    name: `Ed Sheeran`,
                    spotifyId: `6eUKZXaKkcviH0Ku9w2n3V`
                },
                album: {
                    name: `÷ (Deluxe)`,
                    spotifyId: `3T4tUhGYeRNVUGevb0wThu`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96`,
                    small: `https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96`
                },
                duration: 263
            },
            {
                spotifyId: `5Qe7NHxeLAn8KoLTNLSdwe`,
                ytId: `v1HDt1tknTc`,
                songName: `I Want To Hold Your Hand - Remastered 2009`,
                artist: {
                    name: `The Beatles`,
                    spotifyId: `3WrFJ7ztbogyGnTHbHJFl2`
                },
                album: {
                    name: `The Beatles 1962 - 1966 (Remastered)`,
                    spotifyId: `6126O4XLYAfzU3961ziahP`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2735ef4660298ae29ee18799fc2`,
                    small: `https://i.scdn.co/image/ab67616d000048515ef4660298ae29ee18799fc2`
                },
                duration: 146
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
        createdAt: 1577358440904,
        addedAt: 1669613834324,
        songs: [
            {
                spotifyId: `0SiywuOBRcynK0uKGWdCnn`,
                ytId: `qrO4YZeyl0I`,
                songName: `Bad Romance`,
                artist: {
                    name: `Lady Gaga`,
                    spotifyId: `1HY2Jd0NmPuamShAr6KMms`
                },
                album: {
                    name: `The Fame Monster (Deluxe Edition)`,
                    spotifyId: `6rePArBMb5nLWEaY9aQqL4`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2735c9890c0456a3719eeecd8aa`,
                    small: `https://i.scdn.co/image/ab67616d000048515c9890c0456a3719eeecd8aa`
                },
                duration: 294
            },
            {
                spotifyId: `1YokYILrMXhJPhr3isGpYr`,
                ytId: `8UVNT4wvIGY`,
                songName: `Somebody That I Used To Know (made popular by Gotye ft. Kimbra) [vocal version]`,
                artist: {
                    name: `Party Tyme`,
                    spotifyId: `18BHcaFxDHqgfehv4g6vjC`
                },
                album: {
                    name: `Pop Male Hits 7 - Party Tyme - Vocal Versions`,
                    spotifyId: `1AI7dhqDt6Es9usPhMVFSM`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273a7bdabf3285a11927a30b188`,
                    small: `https://i.scdn.co/image/ab67616d00004851a7bdabf3285a11927a30b188`
                },
                duration: 246
            },
            {
                spotifyId: `4gMgiXfqyzZLMhsksGmbQV`,
                ytId: `5IpYOF4Hi6Q`,
                songName: `Another Brick in the Wall, Pt. 2`,
                artist: {
                    name: `Pink Floyd`,
                    spotifyId: `0k17h0D3J5VfsdmQ1iZtE9`
                },
                album: {
                    name: `The Wall`,
                    spotifyId: `5Dbax7G8SWrP9xyzkOvy2F`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf`,
                    small: `https://i.scdn.co/image/ab67616d000048515d48e2f56d691f9a4e4b0bdf`
                },
                duration: 238
            },
            {
                spotifyId: `3EYOJ48Et32uATr9ZmLnAo`,
                ytId: `3T1c7GkzRQQ`,
                songName: `Roxanne`,
                artist: {
                    name: `The Police`,
                    spotifyId: `5NGO30tJxFlKixkPSgXcFE`
                },
                album: {
                    name: `Outlandos D'Amour - Remastered 2003`,
                    spotifyId: `1H9g6j4Wwj6wh6p8YHVtkf`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2732043dd3544a339547d04b436`,
                    small: `https://i.scdn.co/image/ab67616d000048512043dd3544a339547d04b436`
                },
                duration: 191
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
        createdAt: 1597770432182,
        addedAt: 1652134109479,
        songs: [
            {
                spotifyId: `2H1047e0oMSj10dgp7p2VG`,
                ytId: `uSD4vsh1zDA`,
                songName: `I Gotta Feeling`,
                artist: {
                    name: `Black Eyed Peas`,
                    spotifyId: `1yxSLGMDHlW21z4YXirZDS`
                },
                album: {
                    name: `THE E.N.D. (THE ENERGY NEVER DIES)`,
                    spotifyId: `3lng6RAtdksQ2q02Fk5jaB`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273382514f0114ba8f4a16d5db4`,
                    small: `https://i.scdn.co/image/ab67616d00004851382514f0114ba8f4a16d5db4`
                },
                duration: 289
            },
            {
                spotifyId: `18GiV1BaXzPVYpp9rmOg0E`,
                ytId: `MMFj8uDubsE`,
                songName: `Blowin' in the Wind`,
                artist: {
                    name: `Bob Dylan`,
                    spotifyId: `74ASZWbe4lXaubB36ztrGX`
                },
                album: {
                    name: `The Freewheelin' Bob Dylan`,
                    spotifyId: `0o1uFxZ1VTviqvNaYkTJek`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2737d214af8499aa95ad220f573`,
                    small: `https://i.scdn.co/image/ab67616d000048517d214af8499aa95ad220f573`
                },
                duration: 165
            },
            {
                spotifyId: `698ItKASDavgwZ3WjaWjtz`,
                ytId: `60ItHLz5WEA`,
                songName: `Faded`,
                artist: {
                    name: `Alan Walker`,
                    spotifyId: `7vk5e3vY1uw9plTHJAMwjN`
                },
                album: {
                    name: `Different World`,
                    spotifyId: `3nzuGtN3nXARvvecier4K0`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a`,
                    small: `https://i.scdn.co/image/ab67616d00004851a108e07c661f9fc54de9c43a`
                },
                duration: 212
            },
            {
                spotifyId: `2ZBNclC5wm4GtiWaeh0DMx`,
                ytId: `4m1EFMoRFvY`,
                songName: `Single Ladies (Put a Ring on It)`,
                artist: {
                    name: `Beyoncé`,
                    spotifyId: `6vWDO969PvNqNYHIOW5v0m`
                },
                album: {
                    name: `I AM...SASHA FIERCE`,
                    spotifyId: `23Y5wdyP5byMFktZf8AcWU`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e13de7b8662b085b0885ffef`,
                    small: `https://i.scdn.co/image/ab67616d00004851e13de7b8662b085b0885ffef`
                },
                duration: 193
            },
            {
                spotifyId: `0nrRP2bk19rLc0orkWPQk2`,
                ytId: `IcrbM1l_BoI`,
                songName: `Wake Me Up`,
                artist: {
                    name: `Avicii`,
                    spotifyId: `1vCWHaC5f2uS3yhpwWbIA6`
                },
                album: {
                    name: `True`,
                    spotifyId: `2H6i2CrWgXE1HookLu8Au0`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e14f11f796cef9f9a82691a7`,
                    small: `https://i.scdn.co/image/ab67616d00004851e14f11f796cef9f9a82691a7`
                },
                duration: 247
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
        createdAt: 1660877122924,
        addedAt: 1651289543848,
        songs: [
            {
                spotifyId: `7vggqxNKwd6xdRoYS0pQtM`,
                ytId: `mZ6VezKMoRY`,
                songName: `Three Little Birds`,
                artist: {
                    name: `Bob Marley & The Wailers`,
                    spotifyId: `2QsynagSdAqZj3U9HgDzjD`
                },
                album: {
                    name: `Legend - The Best Of Bob Marley And The Wailers`,
                    spotifyId: `4jKeipwuUTjlx9USNYdhZn`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273413a6c2c7b296d98171e5e21`,
                    small: `https://i.scdn.co/image/ab67616d00004851413a6c2c7b296d98171e5e21`
                },
                duration: 180
            },
            {
                spotifyId: `54flyrjcdnQdco7300avMJ`,
                ytId: `-tJYN-eG1zk`,
                songName: `We Will Rock You - Remastered 2011`,
                artist: {
                    name: `Queen`,
                    spotifyId: `1dfeR4HaWDbWqFHLkxsg1d`
                },
                album: {
                    name: `News Of The World (Deluxe Remastered Version)`,
                    spotifyId: `6Di4m5k1BtMJ0R44bWNutu`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27393c65b02f4a72cd6eccf446d`,
                    small: `https://i.scdn.co/image/ab67616d0000485193c65b02f4a72cd6eccf446d`
                },
                duration: 122
            },
            {
                spotifyId: `60a0Rd6pjrkxjPbaKzXjfq`,
                ytId: `eVTXPUF4Oz4`,
                songName: `In the End`,
                artist: {
                    name: `Linkin Park`,
                    spotifyId: `6XyY86QOPPrYVGvF9ch6wz`
                },
                album: {
                    name: `Hybrid Theory (Bonus Edition)`,
                    spotifyId: `6hPkbAV3ZXpGZBGUvL6jVM`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273e2f039481babe23658fc719a`,
                    small: `https://i.scdn.co/image/ab67616d00004851e2f039481babe23658fc719a`
                },
                duration: 216
            },
            {
                spotifyId: `1h2xVEoJORqrg71HocgqXd`,
                ytId: `0CFuCYNx-1g`,
                songName: `Superstition - Single Version`,
                artist: {
                    name: `Stevie Wonder`,
                    spotifyId: `7guDJrEfX3qb6FEbdPA5qi`
                },
                album: {
                    name: `The Definitive Collection`,
                    spotifyId: `4E1itnJOhTMRSATNaxh0Sq`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2739e447b59bd3e2cbefaa31d91`,
                    small: `https://i.scdn.co/image/ab67616d000048519e447b59bd3e2cbefaa31d91`
                },
                duration: 245
            },
            {
                spotifyId: `62PaSfnXSMyLshYJrlTuL3`,
                ytId: `YQHsXMglC9A`,
                songName: `Hello`,
                artist: {
                    name: `Adele`,
                    spotifyId: `4dpARuHxo51G3z768sgnrY`
                },
                album: {
                    name: `25`,
                    spotifyId: `3AvPX1B1HiFROvYjLb5Qwi`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27347ce408fb4926d69da6713c2`,
                    small: `https://i.scdn.co/image/ab67616d0000485147ce408fb4926d69da6713c2`
                },
                duration: 295
            },
            {
                spotifyId: `2E5RQ54P4GP9AI9p5vtZuz`,
                ytId: `CvBfHwUxHIk`,
                songName: `Umbrella - Made famous by Rihanna Ft. Jay Z`,
                artist: {
                    name: `PMC All-Stars`,
                    spotifyId: `0yHtl7OPYS3CaDLsOzFFw0`
                },
                album: {
                    name: `2007 Hot Hits vol 4`,
                    spotifyId: `0L574XKcyv8Qnu6OXP0km2`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273094a46633310c4d2e05bc72b`,
                    small: `https://i.scdn.co/image/ab67616d00004851094a46633310c4d2e05bc72b`
                },
                duration: 260
            },
            {
                spotifyId: `63T7DJ1AFDD6Bn8VzG6JE8`,
                ytId: `O4irXQhgMqg`,
                songName: `Paint It, Black`,
                artist: {
                    name: `The Rolling Stones`,
                    spotifyId: `22bE4uQ6baNwSHPVcDxLCe`
                },
                album: {
                    name: `Aftermath`,
                    spotifyId: `72qrnM4yUNMDDlWiqKc8iY`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273bad7062c3fd2f2d037989694`,
                    small: `https://i.scdn.co/image/ab67616d00004851bad7062c3fd2f2d037989694`
                },
                duration: 202
            },
            {
                spotifyId: `4JehYebiI9JE8sR8MisGVb`,
                ytId: `bnVUHWCynig`,
                songName: `Halo`,
                artist: {
                    name: `Beyoncé`,
                    spotifyId: `6vWDO969PvNqNYHIOW5v0m`
                },
                album: {
                    name: `I AM...SASHA FIERCE`,
                    spotifyId: `39P7VD7qlg3Z0ltq60eHp7`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273801c4d205accdba0a468a10b`,
                    small: `https://i.scdn.co/image/ab67616d00004851801c4d205accdba0a468a10b`
                },
                duration: 261
            },
            {
                spotifyId: `7iN1s7xHE4ifF5povM6A48`,
                ytId: `QDYfEBY9NM4`,
                songName: `Let It Be - Remastered 2009`,
                artist: {
                    name: `The Beatles`,
                    spotifyId: `3WrFJ7ztbogyGnTHbHJFl2`
                },
                album: {
                    name: `Let It Be (Remastered)`,
                    spotifyId: `0jTGHV5xqHPvEcwL8f6YU5`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1`,
                    small: `https://i.scdn.co/image/ab67616d0000485184243a01af3c77b56fe01ab1`
                },
                duration: 243
            }
        ]
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
        createdAt: 1666031807756,
        addedAt: 1650371352006,
        songs: [
            {
                spotifyId: `5HMiF48eiKHttTtSGg7XPb`,
                ytId: `tg00YEETFzg`,
                songName: `We Found Love (Originally Performed by Rihanna Ft. Calvin Harris) - Karaoke Version`,
                artist: {
                    name: `Claudia Aurora`,
                    spotifyId: `6NJtuTFUcwNOyNHGssRFIi`
                },
                album: {
                    name: `We Found Love`,
                    spotifyId: `3wyJ6qDmdItwh5fWyxwQHu`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2731796ed3ed0ce9ec7bc8b59e6`,
                    small: `https://i.scdn.co/image/ab67616d000048511796ed3ed0ce9ec7bc8b59e6`
                },
                duration: 216
            },
            {
                spotifyId: `7Jh1bpe76CNTCgdgAdBw4Z`,
                ytId: `lXgkuM2NhYI`,
                songName: `Heroes - 2017 Remaster`,
                artist: {
                    name: `David Bowie`,
                    spotifyId: `0oSGxfWSnnOXhD2fKuz2Gy`
                },
                album: {
                    name: `"Heroes" (2017 Remaster)`,
                    spotifyId: `4I5zzKYd2SKDgZ9DRf5LVk`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273204f41d52743c6a9efd62985`,
                    small: `https://i.scdn.co/image/ab67616d00004851204f41d52743c6a9efd62985`
                },
                duration: 371
            },
            {
                spotifyId: `5R8dQOPq8haW94K7mgERlO`,
                ytId: `bESGLojNYSo`,
                songName: `Poker Face`,
                artist: {
                    name: `Lady Gaga`,
                    spotifyId: `1HY2Jd0NmPuamShAr6KMms`
                },
                album: {
                    name: `The Fame`,
                    spotifyId: `1jpUMnKpRlng1OJN7LJauV`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b273613aaa3ae566d9f36008aed0`,
                    small: `https://i.scdn.co/image/ab67616d00004851613aaa3ae566d9f36008aed0`
                },
                duration: 237
            },
            {
                spotifyId: `2zYzyRzz6pRmhPzyfMEC8s`,
                ytId: `l482T0yNkeo`,
                songName: `Highway to Hell`,
                artist: {
                    name: `AC/DC`,
                    spotifyId: `711MCceyCBcFnzjGY4Q7Un`
                },
                album: {
                    name: `Highway to Hell`,
                    spotifyId: `10v912xgTZbjAtYfyKWJCS`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27351c02a77d09dfcd53c8676d0`,
                    small: `https://i.scdn.co/image/ab67616d0000485151c02a77d09dfcd53c8676d0`
                },
                duration: 208
            },
            {
                spotifyId: `1JO1xLtVc8mWhIoE3YaCL0`,
                ytId: `pSw8an1u3rc`,
                songName: `Happy Together`,
                artist: {
                    name: `The Turtles`,
                    spotifyId: `2VIoWte1HPDbZ2WqHd2La7`
                },
                album: {
                    name: `Happy Together`,
                    spotifyId: `2pMxs38Y5A0mmHrcu3twvB`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27372649ad8e79d1e8bdd54c929`,
                    small: `https://i.scdn.co/image/ab67616d0000485172649ad8e79d1e8bdd54c929`
                },
                duration: 176
            },
            {
                spotifyId: `6cFZ4PLC19taNlpl9pbGMf`,
                ytId: `kijpcUv-b8M`,
                songName: `Somebody To Love - Remastered 2011`,
                artist: {
                    name: `Queen`,
                    spotifyId: `1dfeR4HaWDbWqFHLkxsg1d`
                },
                album: {
                    name: `A Day At The Races (Deluxe Remastered Version)`,
                    spotifyId: `0lmQ6rAGcChLjGXM52Qu3i`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b27395313a5eee00d9bdf37883e2`,
                    small: `https://i.scdn.co/image/ab67616d0000485195313a5eee00d9bdf37883e2`
                },
                duration: 296
            },
            {
                spotifyId: `0wwPcA6wtMf6HUMpIRdeP7`,
                ytId: `uxpDa-c-4Mc`,
                songName: `Hotline Bling`,
                artist: {
                    name: `Drake`,
                    spotifyId: `3TVXtAsR1Inumwj472S9r4`
                },
                album: {
                    name: `Views`,
                    spotifyId: `40GMAhriYJRO1rsY4YdrZb`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c`,
                    small: `https://i.scdn.co/image/ab67616d000048519416ed64daf84936d89e671c`
                },
                duration: 267
            },
            {
                spotifyId: `3gsCAGsWr6pUm1Vy7CPPob`,
                ytId: `DEbi_YjpA-Y`,
                songName: `Killing Me Softly With His Song`,
                artist: {
                    name: `Roberta Flack`,
                    spotifyId: `0W498bDDNlJIrYMKXdpLHA`
                },
                album: {
                    name: `Killing Me Softly`,
                    spotifyId: `4GxrvKiysSiDU1HHifh1PA`
                },
                imgUrl: {
                    big: `https://i.scdn.co/image/ab67616d0000b2737ff730d1580c27bc461d0ccf`,
                    small: `https://i.scdn.co/image/ab67616d000048517ff730d1580c27bc461d0ccf`
                },
                duration: 286
            }
        ]
    }
]




