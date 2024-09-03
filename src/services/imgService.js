const imgs = {
    liked: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
    equalizerAnimatedGreen: 'https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif',
    music: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb',
    podcasts: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa',
    liveEvents: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg',
    madeForYou: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
    newReleases: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64',
    pop: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825',
}

function getImg(name) {
    return imgs[name]
}

export const imgService = {
    getImg
}

