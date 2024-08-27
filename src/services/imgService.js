const imgs = {
    liked: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
    equalizerAnimatedGreen: 'https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif',
}

function getImg(name) {
    return imgs[name]
}

export const imgService = {
    getImg
}