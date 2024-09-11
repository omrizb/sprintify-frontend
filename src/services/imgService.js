const imgs = {
    liked: 'https://misc.scdn.co/liked-songs/liked-songs-64.png',
    equalizerAnimatedGreen: 'https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif',
    music: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb',
    podcasts: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa',
    liveEvents: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg',
    madeForYou: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
    newReleases: 'https://i.scdn.co/image/ab67fb8200005caf194fec0fdc197fb9e4fe8e64',
    pop: 'https://i.scdn.co/image/ab67fb8200005caf66d545e6a69d0bfe8bd1e825',
    hipHop: 'https://i.scdn.co/image/ab67fb8200005caf5f3752b3234e724f9cd6056f',
    rock: 'https://i.scdn.co/image/ab67fb8200005cafda4c849095796a9e5d2c4ddb',
    latin: 'https://i.scdn.co/image/ab67fb8200005caf3a44e7ae3d808c220898185c',
    podcastCharts: 'https://t.scdn.co/images/7262179db37c498480ef06bfacb60310.jpeg',
    // educational:
    // documentary:
    // comedy:
    // charts:
    // danceElectronic:
    dailyMix1: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7c774b7b4da216c33782c193/1/en/default',
    dailyMix2: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebee0bf92f5269431b705722b2/2/en/default',
    dailyMix3: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7bff9168ecfa90aca537adee/3/en/default',
    dailyMix4: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb59c9bdf20c6eb811f9aa894/4/en/default',
    dailyMix5: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebed7d082db2925fe99a9b9487/5/en/default',
    dailyMix6: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb92883b0e094a36d2f43ad284/6/en/default',





}

function getImg(name) {
    return imgs[name]
}

export const imgService = {
    getImg
}

// const imgKeys = [
//     'music', 'podcasts', 'liveEvents', 'madeForYou', 'newReleases', 'pop', 'hipHop', 'rock',
//     'latin', 'podcastCharts', 'educational', 'documentary', 'comedy', 'charts', 'danceElectronic',
//     'mood', 'indie', 'workout', 'discover', 'country', 'rAndB', 'kPop', 'chill', 'sleep', 'party',
//     'atHome', 'decades', 'love', 'metal', 'jazz', 'trending', 'wellness', 'anime', 'gaming',
//     'folkAcoustic', 'focus', 'soul', 'kidsFamily', 'classical', 'tvMovies', 'instrumental', 'punk',
//     'ambient', 'netflix', 'blues', 'cookingDining', 'alternative', 'travel', 'caribbean', 'afro',
//     'glow', 'songwriters', 'natureNoise', 'funkDisco', 'spotifySingles', 'summer', 'equal',
//     'radar', 'freshFinds', 'tastemakers']



