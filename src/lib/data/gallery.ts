export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: 'live' | 'studio' | 'fashion' | 'events' | 'all'
  width: number
  height: number
  location?: string
  year?: number
}

export const galleryItems: GalleryItem[] = [
  { id: 'g1', src: '/Machala.jpg', alt: 'Wizkid Live Performance', category: 'live', width: 800, height: 1000, location: 'O2 Arena, London', year: 2024 },
  { id: 'g2', src: '/12.png', alt: 'Stage Energy', category: 'live', width: 1000, height: 700, location: 'MSG, New York', year: 2024 },
  { id: 'g3', src: '/Gemini.png', alt: 'Studio Session', category: 'studio', width: 700, height: 900, location: 'Lagos Studio', year: 2023 },
  { id: 'g4', src: '/made.png', alt: 'Concert Crowd', category: 'live', width: 900, height: 600, location: 'FNB Stadium, Johannesburg', year: 2024 },
  { id: 'g5', src: '/11.png', alt: 'Fashion Editorial', category: 'fashion', width: 700, height: 1000, year: 2024 },
  { id: 'g6', src: '/WizAsa.png', alt: 'Grammy Night', category: 'events', width: 1000, height: 750, location: 'Grammy Awards, LA', year: 2023 },
  { id: 'g7', src: '/Wizkid!.png', alt: 'Behind The Scenes', category: 'studio', width: 700, height: 900, year: 2024 },
  { id: 'g8', src: '/Wizkid!s.png', alt: 'Press Event', category: 'events', width: 900, height: 600, year: 2024 },
  { id: 'g9', src: '/Wizkid1.png', alt: 'Fashion Week', category: 'fashion', width: 700, height: 1000, year: 2024 },
  { id: 'g10', src: '/Wizkids.png', alt: 'Sold Out Show', category: 'live', width: 1000, height: 700, location: 'Eko Hotel, Lagos', year: 2024 },
  { id: 'g11', src: '/1.png', alt: 'Album Shoot', category: 'studio', width: 800, height: 900, year: 2022 },
  { id: 'g12', src: '/2.png', alt: 'Coachella Performance', category: 'live', width: 1000, height: 650, location: 'Coachella, California', year: 2023 },
  { id: 'g13', src: '/Machala.jpg', alt: 'Wizkid Live Performance', category: 'live', width: 800, height: 1000, location: 'O2 Arena, London', year: 2024 },
  { id: 'g14', src: '/3.png', alt: 'Stage Energy', category: 'live', width: 1000, height: 700, location: 'MSG, New York', year: 2024 },
  { id: 'g15', src: '/4.png', alt: 'Studio Session', category: 'studio', width: 700, height: 900, location: 'Lagos Studio', year: 2023 },
  { id: 'g16', src: '/5.png', alt: 'Concert Crowd', category: 'live', width: 900, height: 600, location: 'FNB Stadium, Johannesburg', year: 2024 },
  { id: 'g17', src: '/6.png', alt: 'Fashion Editorial', category: 'fashion', width: 700, height: 1000, year: 2024 },
  { id: 'g18', src: '/7.png', alt: 'Grammy Night', category: 'events', width: 1000, height: 750, location: 'Grammy Awards, LA', year: 2023 },
  { id: 'g19', src: '/8.png', alt: 'Behind The Scenes', category: 'studio', width: 700, height: 900, year: 2024 },
  { id: 'g20', src: '/9.png', alt: 'Press Event', category: 'events', width: 900, height: 600, year: 2024 },
  { id: 'g21', src: '/10.png', alt: 'Fashion Week', category: 'fashion', width: 700, height: 1000, year: 2024 },
  { id: 'g22', src: '/13.png', alt: 'Wizkid Live Performance', category: 'live', width: 800, height: 1000, location: 'O2 Arena, London', year: 2024 },
  { id: 'g23', src: '/14.png', alt: 'Stage Energy', category: 'live', width: 1000, height: 700, location: 'MSG, New York', year: 2024 },
  { id: 'g24', src: '/15.png', alt: 'Studio Session', category: 'studio', width: 700, height: 900, location: 'Lagos Studio', year: 2023 },
  { id: 'g25', src: '/16.png', alt: 'Concert Crowd', category: 'live', width: 900, height: 600, location: 'FNB Stadium, Johannesburg', year: 2024 },
  { id: 'g26', src: '/17.png', alt: 'Fashion Editorial', category: 'fashion', width: 700, height: 1000, year: 2024 },
  { id: 'g27', src: '/18.png', alt: 'Grammy Night', category: 'events', width: 1000, height: 750, location: 'Grammy Awards, LA', year: 2023 },
  { id: 'g28', src: '/19.png', alt: 'Behind The Scenes', category: 'studio', width: 700, height: 900, year: 2024 },
]

export const videoGallery = [
  {
    id: 'v1',
    title: 'Essence - Official Music Video',
    thumbnail: '/Essence.png',
    youtubeId: 'jipQpjUA',
    views: '400M',
    year: 2020,
  },
  {
    id: 'v2',
    title: 'Joro - Official Music Video',
    thumbnail: '/joro.png',
    youtubeId: 'dQw4w9WgXcQ',
    views: '180M',
    year: 2019,
  },
  {
    id: 'v3',
    title: 'Come Closer ft. Drake - Official Video',
    thumbnail: '/comeCloser.png',
    youtubeId: 'dQw4w9WgXcQ',
    views: '250M',
    year: 2017,
  },
]
