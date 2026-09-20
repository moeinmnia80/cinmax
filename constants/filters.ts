export const topRated = [
  {
    rank: 1,
    title: "PHANTOM DIRECTIVE",
    genre: "Espionage · Thriller",
    rating: "9.1",
    year: 2025,
    duration: "2h 34m",
    votes: "2.1M",
    image:
      "https://images.unsplash.com/photo-1678918549313-cbaf32e5a1c5?w=160&h=220&fit=crop&auto=format",
    slug: "apex-shadow",
  },
  {
    rank: 2,
    title: "IRON VEIL",
    genre: "Action · Crime",
    rating: "8.8",
    year: 2024,
    duration: "2h 05m",
    votes: "1.7M",
    image:
      "https://images.unsplash.com/photo-1739619241821-902e19238431?w=160&h=220&fit=crop&auto=format",
    slug: "iron-veil",
  },
  {
    rank: 3,
    title: "COLD MERIDIAN",
    genre: "Thriller · Drama",
    rating: "8.6",
    year: 2023,
    duration: "2h 18m",
    votes: "1.4M",
    image:
      "https://images.unsplash.com/photo-1733772117852-dec2aaa2a02d?w=160&h=220&fit=crop&auto=format",
    slug: "cold-meridian",
  },
  {
    rank: 4,
    title: "NEON GHOST",
    genre: "Sci-Fi · Action",
    rating: "8.3",
    year: 2025,
    duration: "2h 11m",
    votes: "980K",
    image:
      "https://images.unsplash.com/photo-1558683018-e0e6e20f2bdb?w=160&h=220&fit=crop&auto=format",
    slug: "neon-ghost",
  },
  {
    rank: 5,
    title: "ECLIPSE PROTOCOL",
    genre: "Sci-Fi · Thriller",
    rating: "8.4",
    year: 2024,
    duration: "2h 22m",
    votes: "1.1M",
    image:
      "https://images.unsplash.com/photo-1702499903230-867455db1752?w=160&h=220&fit=crop&auto=format",
    slug: "signal-lost",
  },
];

export const cast = [
  {
    id: 1,
    slug: "damien-volkov",
    name: "Damien Volkov",
    role: "Lead Actor",
    knownFor: "Eclipse Protocol, Iron Veil, Cold Meridian",
    movies: 38,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: 2,
    slug: "renata-cruz",
    name: "Renata Cruz",
    role: "Lead Actress",
    knownFor: "Dead Horizon, Signal Lost, Apex Shadow",
    movies: 24,
    image:
      "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: 3,
    slug: "marcus-okafor",
    name: "Marcus Okafor",
    role: "Supporting Actor",
    knownFor: "Phantom Directive, Neon Ghost",
    movies: 51,
    image:
      "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: 4,
    slug: "isla-fontaine",
    name: "Isla Fontaine",
    role: "Lead Actress",
    knownFor: "The Silent Coast, Dead Horizon",
    movies: 17,
    image:
      "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: 5,
    slug: null,
    name: "Yuri Petrov",
    role: "Character Actor",
    knownFor: "Cold Meridian, Eclipse Protocol",
    movies: 63,
    image:
      "https://images.unsplash.com/photo-1548251147-dda09867567a?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: 6,
    slug: "nadia-shen",
    name: "Nadia Shen",
    role: "Lead Actress",
    knownFor: "Neon Ghost, Signal Lost, Apex Shadow",
    movies: 29,
    image:
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=400&h=520&fit=crop&auto=format",
  },
];

export const genres = [
  {
    label: "Action",
    count: "1,240 titles",
    image:
      "https://images.unsplash.com/photo-1643756173714-5b492591768c?w=600&h=340&fit=crop&auto=format",
  },
  {
    label: "Sci-Fi",
    count: "860 titles",
    image:
      "https://images.unsplash.com/photo-1702499903230-867455db1752?w=600&h=340&fit=crop&auto=format",
  },
  {
    label: "Horror",
    count: "530 titles",
    image:
      "https://images.unsplash.com/photo-1641667838410-b257ca266e38?w=600&h=340&fit=crop&auto=format",
  },
  {
    label: "Drama",
    count: "2,100 titles",
    image:
      "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=600&h=340&fit=crop&auto=format",
  },
  {
    label: "Thriller",
    count: "740 titles",
    image:
      "https://images.unsplash.com/photo-1722851152653-1182e178a81f?w=600&h=340&fit=crop&auto=format",
  },
  {
    label: "Crime",
    count: "610 titles",
    image:
      "https://images.unsplash.com/photo-1515868769-ad822a0c67e9?w=600&h=340&fit=crop&auto=format",
  },
];

export const plans = [
  {
    name: "Basic",
    price: "8.99",
    features: ["HD Quality", "1 Screen", "No downloads", "Ad-supported"],
    highlight: false,
  },
  {
    name: "Standard",
    price: "14.99",
    features: ["Full HD · 1080p", "2 Screens", "10 downloads/month", "No ads"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "22.99",
    features: [
      "4K Ultra HD",
      "4 Screens",
      "Unlimited downloads",
      "Dolby Atmos",
    ],
    highlight: false,
  },
];

export const filterGenres = [
  "Action",
  "Sci-Fi",
  "Thriller",
  "Drama",
  "Crime",
  "Horror",
  "Mystery",
];
export const filterRatings = ["9+", "8+", "7+", "Any"];
export const filterYears = ["2025", "2024", "2023", "Earlier"];
