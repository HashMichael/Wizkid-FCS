export interface TourDate {
  id: string
  city: string
  country: string
  venue: string
  date: string
  time: string
  status: 'on-sale' | 'sold-out' | 'vip-available'
  ticketUrl: string
  continent: 'Africa' | 'Europe' | 'North America' | 'Asia'
  lat: number
  lng: number
}

export const tourDates: TourDate[] = [
  {
    id: 't1', city: 'Lagos', country: 'Nigeria', venue: 'Eko Hotel Convention Centre',
    date: '2025-03-15', time: '8:00 PM', status: 'sold-out',
    ticketUrl: '#', continent: 'Africa', lat: 6.4281, lng: 3.4219
  },
  {
    id: 't2', city: 'London', country: 'UK', venue: 'O2 Arena',
    date: '2025-04-12', time: '7:30 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'Europe', lat: 51.5074, lng: 0.0034
  },
  {
    id: 't3', city: 'New York', country: 'USA', venue: 'Madison Square Garden',
    date: '2025-05-03', time: '8:00 PM', status: 'vip-available',
    ticketUrl: '#', continent: 'North America', lat: 40.7505, lng: -73.9934
  },
  {
    id: 't4', city: 'Paris', country: 'France', venue: 'Accor Arena',
    date: '2025-05-24', time: '8:30 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'Europe', lat: 48.8396, lng: 2.3782
  },
  {
    id: 't5', city: 'Toronto', country: 'Canada', venue: 'Scotiabank Arena',
    date: '2025-06-07', time: '7:00 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'North America', lat: 43.6435, lng: -79.3791
  },
  {
    id: 't6', city: 'Amsterdam', country: 'Netherlands', venue: 'Ziggo Dome',
    date: '2025-06-20', time: '8:00 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'Europe', lat: 52.3131, lng: 4.9406
  },
  {
    id: 't7', city: 'Dubai', country: 'UAE', venue: 'Coca-Cola Arena',
    date: '2025-07-05', time: '9:00 PM', status: 'vip-available',
    ticketUrl: '#', continent: 'Asia', lat: 25.1972, lng: 55.2796
  },
  {
    id: 't8', city: 'Accra', country: 'Ghana', venue: 'Grand Arena',
    date: '2025-07-19', time: '8:00 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'Africa', lat: 5.6037, lng: -0.1870
  },
  {
    id: 't9', city: 'Los Angeles', country: 'USA', venue: 'Crypto.com Arena',
    date: '2025-08-02', time: '8:00 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'North America', lat: 34.0430, lng: -118.2673
  },
  {
    id: 't10', city: 'Berlin', country: 'Germany', venue: 'Mercedes-Benz Arena',
    date: '2025-08-16', time: '7:30 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'Europe', lat: 52.5200, lng: 13.4050
  },
  {
    id: 't11', city: 'Johannesburg', country: 'South Africa', venue: 'FNB Stadium',
    date: '2025-09-06', time: '7:00 PM', status: 'sold-out',
    ticketUrl: '#', continent: 'Africa', lat: -26.2041, lng: 28.0473
  },
  {
    id: 't12', city: 'Chicago', country: 'USA', venue: 'United Center',
    date: '2025-09-20', time: '8:00 PM', status: 'on-sale',
    ticketUrl: '#', continent: 'North America', lat: 41.8807, lng: -87.6742
  },
]

export const vipPackages = [
  {
    name: 'Gold Experience',
    price: '$499',
    features: [
      'Priority entry & reserved seating',
      'Exclusive pre-show lounge access',
      'Limited edition tour merchandise pack',
      'Professional photo opportunity backdrop',
      'Commemorative laminate & lanyard',
    ],
    highlight: false,
  },
  {
    name: 'Starboy VIP',
    price: '$999',
    features: [
      'Everything in Gold Experience',
      'Meet & greet with Wizkid',
      'Personal photo with Wizkid',
      'Signed album or poster',
      'Premium bar access all night',
      'Access to soundcheck session',
    ],
    highlight: true,
  },
  {
    name: 'Platinum Circle',
    price: '$2,499',
    features: [
      'Everything in Starboy VIP',
      'Front-row guaranteed seats',
      'Private dinner with Wizkid\'s team',
      'Backstage tour before the show',
      'Custom framed photo from the event',
      'Invitation to after-party',
    ],
    highlight: false,
  },
]

export const testimonials = [
  {
    name: 'Sarah K.',
    location: 'London, UK',
    quote: 'The O2 show was transcendent. Wizkid performed for 3 hours straight. Every song felt like a religious experience.',
    rating: 5,
  },
  {
    name: 'Emeka O.',
    location: 'Lagos, Nigeria',
    quote: 'Home boy showed up and shut Lagos DOWN. The energy in that room... nothing I\'ve ever felt before.',
    rating: 5,
  },
  {
    name: 'Jasmine T.',
    location: 'New York, USA',
    quote: 'I cried during Essence. A full arena of 20,000 people, all swaying together. Pure magic.',
    rating: 5,
  },
  {
    name: 'Marcus B.',
    location: 'Toronto, Canada',
    quote: 'The production quality was insane. The light show, the dancers — it felt like a movie.',
    rating: 5,
  },
]
