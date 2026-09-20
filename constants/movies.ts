export interface CastMember {
  name: string;
  role: string;
  character?: string;
  image: string;
}

export interface DownloadOption {
  quality: string;
  resolution: string;
  size: string;
  format: string;
  language: string;
}

export interface Review {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Movie {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  rating: string;
  votes: string;
  genre: string[];
  year: number;
  duration: string;
  language: string;
  country: string;
  category: string;
  description: string;
  longDescription: string;
  image: string; // poster (portrait)
  backdrop: string; // wide hero
  trailer: string;
  director: string;
  writer: string;
  producer: string;
  studio: string;
  budget: string;
  boxOffice: string;
  awards: string[];
  cast: CastMember[];
  downloads: DownloadOption[];
  subtitles: string[];
  audio: string[];
  reviews: Review[];
  relatedMovieIds: number[];
  relatedSerialIds: number[];
  streaming: { platform: string; available: boolean; price?: string }[];
}

export interface Serial {
  id: number;
  slug: string;
  title: string;
  rating: string;
  genre: string[];
  years: string;
  seasons: number;
  episodes: number;
  language: string;
  description: string;
  image: string;
  backdrop: string;
  status: "Ongoing" | "Ended" | "Cancelled";
}

export const movies: Movie[] = [
  {
    id: 1,
    slug: "iron-veil",
    title: "IRON VEIL",
    tagline: "Some borders are drawn in blood.",
    rating: "8.1",
    votes: "1.2M",
    genre: ["Action", "Thriller"],
    year: 2024,
    duration: "2h 05m",
    language: "English",
    country: "USA",
    category: "Hollywood",
    description:
      "A veteran mercenary is pulled back into the underworld when his former handler is taken hostage.",
    longDescription:
      "Damien Volkov was the best operative the agency ever trained — and the first one they tried to bury. Retired to anonymity in Lisbon, he is drawn back into the field when his former handler, the only person who ever trusted him, is taken hostage by a private security conglomerate with ties to every intelligence service on earth.\n\nWhat begins as a single extraction unravels into a conspiracy that rewrites everything he thought he knew about the wars he fought, the missions he completed, and the people he protected. Iron Veil is a taut, brutal, technical thriller that never stops moving — and never lets its hero off the hook.",
    image:
      "https://images.unsplash.com/photo-1739619241821-902e19238431?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1643756173714-5b492591768c?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Nora Halvorsen",
    writer: "T. Ashmore, Nora Halvorsen",
    producer: "Marcus Delacroix, Silver Line Productions",
    studio: "Meridian Pictures",
    budget: "$94M",
    boxOffice: "$412M",
    awards: [
      "Best Action Film — CineFest 2024",
      "Best Editing — Venice Film Awards",
      "Audience Choice — Toronto",
    ],
    cast: [
      {
        name: "Damien Volkov",
        role: "Lead Actor",
        character: "Erik Strand",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Renata Cruz",
        role: "Lead Actress",
        character: "Director Yael Moran",
        image:
          "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Marcus Okafor",
        role: "Supporting",
        character: "The Broker",
        image:
          "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Isla Fontaine",
        role: "Supporting",
        character: "Comm Officer",
        image:
          "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Yuri Petrov",
        role: "Antagonist",
        character: "Vasily Kern",
        image:
          "https://images.unsplash.com/photo-1548251147-dda09867567a?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Nadia Shen",
        role: "Supporting",
        character: "Field Asset",
        image:
          "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "4K",
        resolution: "2160p",
        size: "18.4 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "6.2 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "2.8 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "980 MB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: [
      "English",
      "Spanish",
      "French",
      "German",
      "Arabic",
      "Japanese",
      "Korean",
    ],
    audio: [
      "English 5.1 Dolby Atmos",
      "English 2.0 Stereo",
      "Spanish 5.1",
      "French 5.1",
    ],
    reviews: [
      {
        author: "CineVault",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
        rating: 9,
        date: "Mar 12, 2024",
        text: "Halvorsen delivers a masterclass in sustained tension. Iron Veil is the rare action film that earns every explosion because you actually care about the bodies inside.",
      },
      {
        author: "FilmGrid",
        avatar:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop",
        rating: 8,
        date: "Mar 14, 2024",
        text: "Volkov's performance anchors a film that could easily have collapsed into spectacle. The third act is some of the best sustained filmmaking this year.",
      },
      {
        author: "DarkProjector",
        avatar:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop",
        rating: 8,
        date: "Apr 01, 2024",
        text: "Lean, precise, and completely uninterested in holding your hand. Iron Veil trusts its audience — a rarity in contemporary action cinema.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "StreamVault", available: true, price: "$3.99 rent" },
      { platform: "NovaCinema", available: false },
    ],
    relatedMovieIds: [2, 3, 5],
    relatedSerialIds: [101, 103],
  },
  {
    id: 2,
    slug: "signal-lost",
    title: "SIGNAL LOST",
    tagline: "What the void sends back is not what you transmitted.",
    rating: "7.7",
    votes: "820K",
    genre: ["Sci-Fi", "Drama"],
    year: 2024,
    duration: "1h 52m",
    language: "English",
    country: "UK / USA",
    category: "Hollywood",
    description:
      "A deep-space relay station receives a signal from a decommissioned probe — one that disappeared forty years ago.",
    longDescription:
      "The Helios-7 relay station orbits a dead star at the edge of charted space. Its five-person crew monitors background radiation — routine, underfunded, forgotten. Then the signal arrives: voice traffic, in English, from the Pathfinder probe that vanished in 1984.\n\nAs the crew works to authenticate the signal, they realize the transmissions are not a recording. Someone — or something — is responding in real time to their questions. Signal Lost is a slow-burn science fiction film about the terror of being heard across impossible distance, and the price of reaching back.",
    image:
      "https://images.unsplash.com/photo-1746049847242-3343c6bde723?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1702499903230-867455db1752?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Yuki Tanaka",
    writer: "Isla Fontaine, Yuki Tanaka",
    producer: "Glen Rourke, Apex Film Group",
    studio: "Apex Film Group",
    budget: "$38M",
    boxOffice: "$97M",
    awards: [
      "Best Sci-Fi Film — Saturn Awards 2024",
      "Best Original Score — BAFTA nominee",
    ],
    cast: [
      {
        name: "Renata Cruz",
        role: "Lead",
        character: "Dr. Lena Marsh",
        image:
          "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Yuri Petrov",
        role: "Supporting",
        character: "Chief Engineer Sokolov",
        image:
          "https://images.unsplash.com/photo-1548251147-dda09867567a?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Isla Fontaine",
        role: "Supporting",
        character: "Comms Lead Aria",
        image:
          "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Marcus Okafor",
        role: "Supporting",
        character: "Mission Controller",
        image:
          "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "4K",
        resolution: "2160p",
        size: "14.1 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "4.9 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "2.1 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "760 MB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: ["English", "French", "German", "Japanese", "Portuguese"],
    audio: ["English 5.1 Dolby Atmos", "English 2.0 Stereo", "French 5.1"],
    reviews: [
      {
        author: "OrbitReview",
        avatar:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=60&h=60&fit=crop",
        rating: 8,
        date: "Jun 3, 2024",
        text: "Tanaka understands that the best science fiction is really about people. Signal Lost earns its haunting final image through two hours of precise, patient storytelling.",
      },
      {
        author: "VoidCinema",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        rating: 7,
        date: "Jun 10, 2024",
        text: "Deliberately slow, but that's the point. The film creates genuine dread not through jump scares but through the creeping realization that the answer is worse than the silence.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "NovaCinema", available: true, price: "$4.99 rent" },
      { platform: "StreamVault", available: false },
    ],
    relatedMovieIds: [1, 4, 6],
    relatedSerialIds: [102, 104],
  },
  {
    id: 3,
    slug: "cold-meridian",
    title: "COLD MERIDIAN",
    tagline: "The truth lives north of everything you were told.",
    rating: "8.6",
    votes: "1.4M",
    genre: ["Thriller", "Crime"],
    year: 2023,
    duration: "2h 18m",
    language: "English",
    country: "Canada / USA",
    category: "Hollywood",
    description:
      "An investigative journalist vanishes while tracking an off-the-books military program. Her partner follows the trail north.",
    longDescription:
      "Sara Voss was the best investigative journalist of her generation. When she disappears mid-investigation into a classified Arctic defense program, her partner and former editor, James Calloway, refuses the official narrative.\n\nFollowing a trail of encrypted drives, dead contacts, and deliberately redacted FOIA documents, Calloway travels north into a landscape engineered for secrecy — black sites built on permafrost, administered by private contractors, answerable to no government on record. Cold Meridian is a procedural thriller with the patience of a novel and the visual grammar of a landscape film.",
    image:
      "https://images.unsplash.com/photo-1733772117852-dec2aaa2a02d?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1665602878676-219e01293b51?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Glen Rourke",
    writer: "Amara Solis",
    producer: "Marcus Delacroix",
    studio: "Northern Frame Studios",
    budget: "$52M",
    boxOffice: "$203M",
    awards: [
      "Best Film — Chicago International",
      "Best Director — San Sebastián",
      "Best Screenplay nominee — Oscars",
    ],
    cast: [
      {
        name: "Marcus Okafor",
        role: "Lead",
        character: "James Calloway",
        image:
          "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Damien Volkov",
        role: "Supporting",
        character: "Col. Petrenkov",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Nadia Shen",
        role: "Supporting",
        character: "Sara Voss",
        image:
          "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Isla Fontaine",
        role: "Supporting",
        character: "Gov. Liaison",
        image:
          "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "4K",
        resolution: "2160p",
        size: "20.3 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "7.1 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "3.2 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "1.1 GB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: [
      "English",
      "Spanish",
      "French",
      "German",
      "Norwegian",
      "Russian",
    ],
    audio: [
      "English 7.1 Dolby Atmos",
      "English 5.1",
      "French 5.1",
      "Spanish 5.1",
    ],
    reviews: [
      {
        author: "ArcticScreen",
        avatar:
          "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=60&h=60&fit=crop",
        rating: 9,
        date: "Oct 8, 2023",
        text: "Cold Meridian is the year's most confident film. Rourke knows exactly where he's going, exactly how long it should take to get there, and exactly what he wants you to feel when you arrive.",
      },
      {
        author: "NorthernReel",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop",
        rating: 9,
        date: "Oct 15, 2023",
        text: "A procedural with the texture of literary fiction. The landscape is a character, the silence is scored, and the final revelation lands with the weight of a collapsed glacier.",
      },
      {
        author: "FilmTundra",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop",
        rating: 8,
        date: "Nov 2, 2023",
        text: "Okafor gives the performance of his career. A quiet, interior portrayal of grief disguised as determination.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "StreamVault", available: true },
      { platform: "NovaCinema", available: true, price: "$3.99 rent" },
    ],
    relatedMovieIds: [1, 5, 6],
    relatedSerialIds: [101, 103],
  },
  {
    id: 4,
    slug: "the-silent-coast",
    title: "THE SILENT COAST",
    tagline: "Isolation was the plan.",
    rating: "7.4",
    votes: "640K",
    genre: ["Drama", "Mystery"],
    year: 2024,
    duration: "1h 44m",
    language: "English",
    country: "Ireland / UK",
    category: "Independent",
    description:
      "When a coastal village is cut off by a freak storm, its residents discover that the isolation is deliberate.",
    longDescription:
      "The fishing village of An Cósta Ciúin is used to hard winters. But when a February storm cuts every communication line, closes every road, and strands a government surveyor among the 200 residents, the quiet begins to feel designed.\n\nAs days pass without rescue, the surveyor discovers that the village has been waiting — not for the storm to end, but for an inspection that was never meant to happen. The Silent Coast is a slow, atmospheric mystery about what communities bury, what surveyors find, and what silence actually protects.",
    image:
      "https://images.unsplash.com/photo-1629278357549-b413116d211c?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Amara Solis",
    writer: "Amara Solis, C. Merrill",
    producer: "Glen Rourke",
    studio: "Coastal Frame Films",
    budget: "$12M",
    boxOffice: "$41M",
    awards: [
      "Best European Film — Cannes (Un Certain Regard)",
      "Best Actress — Irish Film Awards",
    ],
    cast: [
      {
        name: "Isla Fontaine",
        role: "Lead",
        character: "Surveyor Mara Quinn",
        image:
          "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Renata Cruz",
        role: "Supporting",
        character: "Village Elder Brigid",
        image:
          "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Yuri Petrov",
        role: "Supporting",
        character: "Fisherman Lev",
        image:
          "https://images.unsplash.com/photo-1548251147-dda09867567a?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "4.2 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "1.8 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "680 MB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: ["English", "Irish", "French", "Spanish"],
    audio: ["English 5.1", "English 2.0 Stereo"],
    reviews: [
      {
        author: "CoastalFrame",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop",
        rating: 8,
        date: "Feb 20, 2024",
        text: "The Silent Coast is what happens when a filmmaker trusts the weather to do the work. Solis doesn't rush — and that restraint is exactly the right choice.",
      },
      {
        author: "QuietReels",
        avatar:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop",
        rating: 7,
        date: "Mar 1, 2024",
        text: "Beautifully shot and carefully paced. Fontaine is extraordinary. The film doesn't always earn its ambiguity, but when it does, it's genuinely unsettling.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "StreamVault", available: false },
      { platform: "NovaCinema", available: true },
    ],
    relatedMovieIds: [2, 6, 3],
    relatedSerialIds: [103, 102],
  },
  {
    id: 5,
    slug: "neon-ghost",
    title: "NEON GHOST",
    tagline: "In a city of lights, the darkest thing is a memory.",
    rating: "8.3",
    votes: "980K",
    genre: ["Sci-Fi", "Action"],
    year: 2025,
    duration: "2h 11m",
    language: "English",
    country: "USA",
    category: "Hollywood",
    description:
      "In a city where digital ghosts outnumber the living, a ghost-hunter takes a case that dissolves the line between memory and code.",
    longDescription:
      "Neo-Angeles, 2071. The dead don't disappear — they persist as digital echoes, archived consciousness fragments haunting the networks they used in life. Most are harmless noise. Some are not.\n\nKai Nakamura is a ghost-hunter: a licensed technician who tracks, negotiates with, and when necessary, erases persistent digital entities. When a routine job puts her inside the echo of a murdered intelligence analyst, she discovers a conspiracy that reaches from the street grid all the way to the city's governing AI. Neon Ghost is a cyberpunk action film with a genuine interior life — stylish, violent, and unexpectedly moving.",
    image:
      "https://images.unsplash.com/photo-1558683018-e0e6e20f2bdb?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1722851152653-1182e178a81f?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Nora Halvorsen",
    writer: "Nora Halvorsen, Yuki Tanaka",
    producer: "Silver Line Productions",
    studio: "Meridian Pictures",
    budget: "$120M",
    boxOffice: "$508M",
    awards: [
      "Best Visual Effects — VES Awards 2025",
      "Best Production Design — BAFTA 2025",
      "Audience Award — SXSW",
    ],
    cast: [
      {
        name: "Nadia Shen",
        role: "Lead",
        character: "Kai Nakamura",
        image:
          "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Yuri Petrov",
        role: "Supporting",
        character: "The Archivist",
        image:
          "https://images.unsplash.com/photo-1548251147-dda09867567a?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Marcus Okafor",
        role: "Supporting",
        character: "Grid Marshal Obi",
        image:
          "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Renata Cruz",
        role: "Antagonist",
        character: "Director Vega",
        image:
          "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Damien Volkov",
        role: "Supporting",
        character: "Ghost: Analyst K.",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "4K",
        resolution: "2160p HDR",
        size: "22.7 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "8.0 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "3.5 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "1.2 GB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: [
      "English",
      "Japanese",
      "Korean",
      "Mandarin",
      "Spanish",
      "French",
      "Arabic",
    ],
    audio: [
      "English 7.1 Dolby Atmos",
      "English 5.1",
      "Japanese 5.1",
      "Spanish 5.1",
    ],
    reviews: [
      {
        author: "NeonCritique",
        avatar:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=60&h=60&fit=crop",
        rating: 9,
        date: "Jan 22, 2025",
        text: "Neon Ghost is cyberpunk cinema finally grown up. It has the visual vocabulary of the genre but the emotional intelligence of something entirely new.",
      },
      {
        author: "GridWatch",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        rating: 8,
        date: "Feb 5, 2025",
        text: "Shen carries this film on pure presence. The action sequences are exceptional but it's the quieter scenes — Kai talking to the ghost of someone who doesn't know they're dead — that linger.",
      },
      {
        author: "DigitalReel",
        avatar:
          "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=60&h=60&fit=crop",
        rating: 8,
        date: "Feb 12, 2025",
        text: "The world-building is airtight, the action is kinetic, and the ending earns every tear it demands. A proper blockbuster that actually believes in something.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "StreamVault", available: true },
      { platform: "NovaCinema", available: true },
    ],
    relatedMovieIds: [1, 3, 6],
    relatedSerialIds: [104, 102],
  },
  {
    id: 6,
    slug: "apex-shadow",
    title: "APEX SHADOW",
    tagline: "The most dangerous agent is the one with nothing left to lose.",
    rating: "7.9",
    votes: "760K",
    genre: ["Action", "Espionage"],
    year: 2025,
    duration: "2h 02m",
    language: "English",
    country: "USA / Germany",
    category: "Hollywood",
    description:
      "A shadow detective operating outside any jurisdiction uncovers a network that runs deeper than organized crime.",
    longDescription:
      "Elena Voss spent fifteen years running black operations for an agency that officially doesn't exist. When her final mission unravels — exposing a global financial network that funds both sides of every conflict of the last three decades — she becomes the one thing her former employers cannot afford: a witness.\n\nApex Shadow moves at velocity, but it's smarter than it looks. The film uses the conventions of the espionage thriller to interrogate who actually benefits from permanent global instability — and who is expendable when the answer becomes inconvenient.",
    image:
      "https://images.unsplash.com/photo-1584742493143-6ac9273ec978?w=400&h=560&fit=crop&auto=format",
    backdrop:
      "https://images.unsplash.com/photo-1515868769-ad822a0c67e9?w=1400&h=700&fit=crop&auto=format",
    trailer: "#",
    director: "Marcus Delacroix",
    writer: "T. Ashmore",
    producer: "Silver Line Productions, Meridian Pictures",
    studio: "Meridian Pictures",
    budget: "$108M",
    boxOffice: "$389M",
    awards: [
      "Best Stunt Coordination — Action Alliance Awards 2025",
      "Best Original Screenplay nominee — Golden Globes",
    ],
    cast: [
      {
        name: "Damien Volkov",
        role: "Lead",
        character: "Elena Voss",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Renata Cruz",
        role: "Supporting",
        character: "Control",
        image:
          "https://images.unsplash.com/photo-1606143412458-acc5f86de897?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Isla Fontaine",
        role: "Supporting",
        character: "Asset Handler",
        image:
          "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=200&h=260&fit=crop&auto=format",
      },
      {
        name: "Marcus Okafor",
        role: "Antagonist",
        character: "The Principal",
        image:
          "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=200&h=260&fit=crop&auto=format",
      },
    ],
    downloads: [
      {
        quality: "4K",
        resolution: "2160p HDR",
        size: "19.8 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "1080p",
        resolution: "1920×1080",
        size: "6.8 GB",
        format: "MKV",
        language: "English",
      },
      {
        quality: "720p",
        resolution: "1280×720",
        size: "3.0 GB",
        format: "MP4",
        language: "English",
      },
      {
        quality: "480p",
        resolution: "854×480",
        size: "1.05 GB",
        format: "MP4",
        language: "English",
      },
    ],
    subtitles: ["English", "German", "French", "Spanish", "Arabic", "Russian"],
    audio: [
      "English 7.1 Dolby Atmos",
      "German 5.1",
      "French 5.1",
      "Spanish 2.0",
    ],
    reviews: [
      {
        author: "ShadowReel",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop",
        rating: 8,
        date: "Mar 3, 2025",
        text: "Delacroix has made a film that works simultaneously as a propulsive thriller and a pointed critique of the security-industrial complex. Not an easy needle to thread.",
      },
      {
        author: "FieldCritic",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop",
        rating: 8,
        date: "Mar 10, 2025",
        text: "Apex Shadow earns its runtime by refusing easy answers. The villain isn't a person — it's a system, which makes it all the more frightening.",
      },
    ],
    streaming: [
      { platform: "Cinemax Premium", available: true },
      { platform: "StreamVault", available: true, price: "$4.99 rent" },
      { platform: "NovaCinema", available: false },
    ],
    relatedMovieIds: [1, 3, 5],
    relatedSerialIds: [101, 103],
  },
];
