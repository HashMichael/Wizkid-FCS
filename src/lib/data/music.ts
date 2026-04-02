export interface Album {
  id: string
  title: string
  year: number
  type: 'album' | 'single' | 'feature' | 'collab'
  cover: string
  tracks: string[]
  streams?: string
  label?: string
  description?: string
}

export const discography: Album[] = [

  {
    id: 'morayo',
    title: 'Morayo',
    year: 2024,
    type: 'album',
    cover: '/MORAYO.png',
    tracks: [
    'Trouble Mind', 'Karamo', 'Kese(Dance)', 'Bad Girl (ft. Asake)', 'Time',
    'Piece Of My Heart (ft. Brent Faiyaz)', 'Break Me Down', 'Bend',
    'Million Blessings', 'Apres Minut (ft. Tiakola)', 'Soji', 'Bad For You(ft. Jazmine Sullivan)',
    'Don`t Care', 'Slow (ft. Anais Cardot)', 'Lose', 'Pray'
    ],
    streams: '1.2B+',
    label: 'Starboy / RCA Music',
    description: 'A mature love album capturing Wizkid at his most vulnerable and confident.'
  },
  {
    id: 'more-love-less-ego',
    title: 'More Love Less Ego',
    year: 2022,
    type: 'album',
    cover: '/More.png',
    tracks: [
    'Money & Love', 'Bad To Me', 'Piece Of My Heart', 'Slip', 'Idan',
    'Ginger (ft. Burna Boy)', 'Reckless (ft. DVSN)', 'Tease Me',
    'Holy Bird', 'Special', 'Plenty', 'Love Me Right'
    ],
    streams: '1.2B+',
    label: 'Starboy / Sony Music',
    description: 'A mature love album capturing Wizkid at his most vulnerable and confident.'
  },
  {
    id: 'made-in-lagos',
    title: 'Made in Lagos',
    year: 2020,
    type: 'album',
    cover: '/MIL.png',
    tracks: [
    'Reckless', 'Smile (ft. H.E.R)', 'Ease Butt', 'Mighty Wine',
    'Blessed (ft. Damian Marley)', 'No Stress', 'Joro', 'Soko',
    'Essence (ft. Tems)', 'Mood (ft. Brent Faiyaz)', 'Positions', 'True Love'
    ],
    streams: '4.5B+',
    label: 'Starboy / Sony Music',
    description: 'The Grammy-nominated masterpiece that put Afrobeats on the global map.'
  },
  {
    id: 'sounds-from-the-other-side',
    title: 'Sounds From The Other Side',
    year: 2017,
    type: 'album',
    cover: '\/soundman.png',
    tracks: [
    'Fake It', 'Daddy Yo', 'Sweet Love', 'Come Closer (ft. Drake)',
    'African Bad Gyal', 'Gbese', 'Manya', 'Lovefeelingz',
    'Slow Wine', 'One For Me', 'Side Effects (ft. Efya)'
    ],
    streams: '2.1B+',
    label: 'Starboy / RCA Records',
    description: 'Wizkid\'s international breakthrough, blending Afrobeats with global sounds.'
  },
  {
    id: 'ayo',
    title: 'Ayo',
    year: 2014,
    type: 'album',
    cover: '/Ojuele.png',
    tracks: [
    'Jaiye Jaiye (ft. Femi Kuti)', 'Caro', 'Show Me The Money',
    'Bombay (ft. Sarkodie)', 'Mogbe', 'On Top Your Matter',
    'Mummy Mi', 'One Question', 'Found', 'Shortcut To Heaven'
    ],
    streams: '800M+',
    label: 'Starboy / Sony Music',
    description: 'The sophomore album that solidified Wizkid as Africa\'s biggest star.'
  },
  {
    id: 'superstar',
    title: 'Superstar',
    year: 2011,
    type: 'album',
    cover: '/super.png',
    tracks: [
    'Holla At Your Boy', 'Tease Me / Who Is Your Guy', 'Back To The Way',
    'Don\'t Dull', 'Love My Baby', 'Pakurumo (ft. 2face Idibia)',
    'Omalicha (ft. Emeka)', 'Ololufe', 'Oluwa Lo Ni (ft. Banky W)'
    ],
    streams: '400M+',
    label: 'Banky Music / EME',
    description: 'The debut that launched a superstar — raw, hungry, and undeniable.'
  },
  {
    id: 'jogodo',
    title: 'Jogodo (ft. Asake)',
    year: 2026,
    type: 'collab',
    cover: '/jogodo.png',
    tracks: ['Jogodo'],
    streams: '500M+',
    label: 'Starboy / OVO',
    description: 'The legendary Afrobeats-meets-rap collaboration with Drake.'
  },
  {
    id: 'kese',
    title: 'Kese(Dance)',
    year: 2024,
    type: 'single',
    cover: '/keseDance.png',
    tracks: ['Kese(Dance)'],
    streams: '500M+',
    label: 'Starboy / RCA',
    description: 'A single AFrobeats hit that take fans in a amazing waves.'
  },
  {
    id: 'piece-of-my-heart',
    title: 'Piece of my Heart (ft. Brent Faiyaz)',
    year: 2024,
    type: 'collab',
    cover: '/piece.png',
    tracks: ['Piece of my Heart'],
    streams: '500M+',
    label: 'Starboy / OVO',
    description: 'The legendary Afrobeats-meets-rap collaboration with Drake.'
  },
  {
    id: 'essence',
    title: 'Essence',
    year: 2020,
    type: 'collab',
    cover: '/Essence.png',
    tracks: ['Essence (ft. Tems)', 'Essence (ft. Justin Bieber & Tems)'],
    streams: '800M+',
    label: 'Starboy / Sony Music',
    description: 'The crossover smash that defined the summer of 2021.'
  },
  {
    id: 'joro',
    title: 'Joro',
    year: 2019,
    type: 'single',
    cover: '/joro.png',
    tracks: ['Joro'],
    streams: '350M+',
    label: 'Starboy / Sony Music',
    description: 'The hypnotic banger that dominated 2019.'
  },
  {
    id: 'soco',
    title: 'Soco (ft. Starboy)',
    year: 2018,
    type: 'collab',
    cover: '/soco.png',
    tracks: ['Soco'],
    streams: '500M+',
    label: 'Starboy / OVO',
    description: 'The legendary Afrobeats-meets-rap collaboration with Drake.'
  },

  {
    id: 'one-dance',
    title: 'One Dance (ft. Drake & Kyla)',
    year: 2016,
    type: 'collab',
    cover: '/DrakeOneDance.png',
    tracks: ['One Dance'],
    streams: '6B+',
    label: 'Starboy / OVO',
    description: 'A Global Dominance Music collaboration with Drake and Kyla.'
  },

  {
    id: 'fever',
    title: 'Fever',
    year: 2018,
    type: 'single',
    cover: '/fever.png',
    tracks: ['Fever'],
    streams: '500M+',
    label: 'Starboy',
    description: 'The legendary Afrobeats-meets-rap collaboration with Drake.'
  },
]

export const pressQuotes = [
  { source: 'Rolling Stone', quote: 'The undisputed king of Afrobeats. Wizkid makes music that feels like sunlight.' },
  { source: 'Billboard', quote: 'Made in Lagos is a landmark record — a masterclass in modern African pop.' },
  { source: 'Pitchfork', quote: 'Wizkid operates on a frequency that transcends genre, geography, and generation.' },
  { source: 'The Guardian', quote: 'A voice that carries the weight of Lagos and the dreams of an entire continent.' },
  { source: 'NME', quote: 'Essence isn\'t just a hit — it\'s a cultural moment etched in modern music history.' },
]

export const streamingPlatforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp?si=B2xWZnAmRhmB8bEygoKGRw', color: '#1DB954', monthlyListeners: '16M+' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/wizkid/309335750', color: '#FA243C', monthlyListeners: '15M+' },
  { name: 'YouTube Music', url: 'www.youtube.com/@StarBoyTV', color: '#FF0000', monthlyListeners: '8M+' },
  { name: 'Audiomack', url: 'https://audiomack.com/wizkid', color: '#FF6700', monthlyListeners: '6M+' },
  { name: 'Boomplay', url: 'https://www.boomplay.com/artists/1082?from=search&srModel=COPYLINK&srList=WEB&share_content=artist&share_channel=copylink&share_platform=web', color: '#00BCD4', monthlyListeners: '5M+' },
]
