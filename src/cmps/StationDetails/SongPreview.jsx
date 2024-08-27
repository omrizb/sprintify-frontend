export function SongPreview({ song, index, viewMode }) {

    const {songName, artist, album, url, imgUrl, duration} = song
    //switch case to various displays: main-view, now-playing, song-list
    return (
        <div className="song-preview list-style">
            <div>{index}</div>
            <div className="title-column">
                <img src={imgUrl} alt="" />
                <div className="text">
                    <div>{songName}</div>
                    <div>{artist}</div>
                </div>
            </div>
            <div>{album}</div>
            <div>{`${duration.hours}: ${duration.minutes}: ${duration.seconds}`}</div>
        </div>
    )
}




// {
//     songId: 'fJ9rUzIMcZQ',
//     songName: 'Bohemian Rhapsody',
//     artist: 'Queen',
//     album: 'A Night at the Opera',
//     url: 'https://www.youtube.com/embed/fJ9rUzIMcZQ',
//     imgUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
//     duration: { hours: 0, minutes: 6, seconds: 0 }
// },