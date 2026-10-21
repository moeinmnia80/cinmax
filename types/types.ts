/**
 * Cinemax – shared TypeScript types
 * Mirrors schema.prisma, but in the JSON-serialized shape the frontend receives:
 *  - DateTime  -> string (ISO 8601)
 *  - Decimal   -> string  (Prisma.Decimal serializes to string)
 *  - BigInt    -> string  (BigInt is not JSON-serializable; convert on the server)
 */

import { MovieCategory } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

// ==========================================
// Primitives
// ==========================================

// export type Date = string;
export type DecimalString = string;

// ==========================================
// Enums (const object + union = runtime values + types)
// ==========================================

export const Gender = { male: "male", female: "female" } as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const Role = { user: "user", admin: "admin" } as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Provider = {
  local: "local",
  google: "google",
  facebook: "facebook",
} as const;
export type Provider = (typeof Provider)[keyof typeof Provider];

export const SerialStatus = {
  Ongoing: "Ongoing",
  Ended: "Ended",
  Cancelled: "Cancelled",
} as const;
export type SerialStatus = (typeof SerialStatus)[keyof typeof SerialStatus];

export const PersonType = {
  Actor: "Actor",
  Director: "Director",
  Writer: "Writer",
  Producer: "Producer",
} as const;
export type PersonType = (typeof PersonType)[keyof typeof PersonType];

// export const MovieCategory = {
//   Hollywood: "Hollywood",
//   Independent: "Independent",
//   Bollywood: "Bollywood",
//   Korean: "Korean",
//   Animation: "Animation",
// } as const;
// export type MovieCategory = (typeof MovieCategory)[keyof typeof MovieCategory];

export const FeaturedType = { Movie: "Movie", Serial: "Serial" } as const;
export type FeaturedType = (typeof FeaturedType)[keyof typeof FeaturedType];

export const ImageCategory = {
  poster: "poster",
  backdrop: "backdrop",
  gallery: "gallery",
  banner: "banner",
} as const;
export type ImageCategory = (typeof ImageCategory)[keyof typeof ImageCategory];

// ==========================================
// Base entities (no relations)
// ==========================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: Gender;
  role: Role;
  provider: Provider;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  // `password` is intentionally omitted – never send it to the client
}

export interface Genre {
  id: number;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Language {
  id: number;
  code: string; // "en", "fa", "zh"
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Studio {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Person {
  id: number;
  slug: string;
  name: string;
  role: PersonType;
  image: string | null;
  bio: string | null;
  birthDate: Date | null;
  birthPlace: string | null;
  height: string | null;
  activeYears: string | null;
  socialInstagram: string | null;
  socialTwitter: string | null;
  socialImdb: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: number;
  slug: string;
  name: string;
  price: DecimalString;
  period: string;
  popular: boolean;
  features: string[];
  downloadMax: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPurchase {
  id: string;
  userId: string;
  movieId: number | null;
  serialId: number | null;
  price: DecimalString;
  createdAt: Date;
}

// ==========================================
// Movie + related
// ==========================================

export interface Movie {
  id: number;
  slug: string;
  title: string;
  tagline: string | null;
  rating: Decimal;
  votesCount: number;
  year: number;
  durationMinutes: number;
  category: MovieCategory;
  description: string;
  longDescription: string | null;
  image: string;
  backdrop: string;
  trailer: string | null;
  budget: bigint | null;
  boxOffice: bigint | null;
  recognition: string | null;
  isPurchasable: boolean;
  purchasePrice: Decimal | null;
  languageId: number;
  countryId: number | null;
  studioId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieImage {
  id: number;
  movieId: number;
  url: string;
  key: string;
  caption: string | null;
  type: ImageCategory;
  createdAt: Date;
}

export interface MovieCrew {
  id: number;
  movieId: number;
  personId: number;
  role: PersonType;
}

export interface MovieGenre {
  movieId: number;
  genreId: number;
}

export interface MovieCast {
  id: number;
  movieId: number;
  personId: number;
  role: string;
  character: string | null;
}

export interface MovieAward {
  id: number;
  movieId: number;
  title: string;
}

export interface MovieDownload {
  id: number;
  movieId: number;
  quality: string;
  resolution: string;
  sizeBytes: bigint;
  format: string;
  language: string;
  url: string | null;
}

export interface MovieSubtitle {
  movieId: number;
  languageId: number;
}

export interface MovieAudio {
  id: number;
  movieId: number;
  languageId: number;
  details: string | null;
}

export interface MovieStreaming {
  id: number;
  movieId: number;
  platform: string;
  available: boolean;
  price: DecimalString | null;
}

export interface MovieRelated {
  sourceMovieId: number;
  targetMovieId: number;
}

// ==========================================
// Serial + related
// ==========================================

export interface Serial {
  id: number;
  slug: string;
  title: string;
  rating: Decimal;
  startYear: number;
  endYear: number | null;
  seasons: number;
  durationMinutes: number;
  episodes: number;
  description: string;
  image: string;
  backdrop: string | null;
  status: SerialStatus;
  badge: string | null;
  isPurchasable: boolean;
  purchasePrice: Decimal | null;
  languageId: number;
  countryId: number | null;
  studioId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerialCast {
  id: number;
  serialId: number;
  personId: number;
  role: string;
  character: string | null;
}

export interface SerialCrew {
  id: number;
  serialId: number;
  personId: number;
  role: PersonType;
}

export interface SerialImage {
  id: number;
  serialId: number;
  url: string;
  key: string;
  caption: string | null;
  type: ImageCategory;
  createdAt: Date;
}

export interface SerialGenre {
  serialId: number;
  genreId: number;
}

export interface SerialRelatedMovie {
  serialId: number;
  movieId: number;
}

// ==========================================
// User interactions
// ==========================================

export interface Review {
  id: number;
  movieId: number;
  author: string;
  avatar: string | null;
  rating: number;
  text: string;
  date: Date;
}

export interface ContinueWatching {
  id: number;
  userId: string;
  movieId: number | null;
  serialId: number | null;
  progress: number; // 0-100
  remainingSec: number;
  currentSeason: number | null;
  currentEpisode: number | null;
  updatedAt: Date;
}

export interface FeaturedItem {
  id: number;
  type: FeaturedType;
  order: number;
  active: boolean;
  movieId: number | null;
  serialId: number | null;
  createdAt: Date;
  updatedAt: Date;
  movie: Movie | null;
  serial: Serial | null;
}

// ==========================================
// Composed types (what your pages/components actually use)
// ==========================================

/** Cast/crew row with the person expanded */
export type WithPerson<T> = T & { person: Person };

/** Lightweight card for lists, grids, carousels */
export type MovieCard = Pick<
  Movie,
  | "id"
  | "slug"
  | "title"
  | "rating"
  | "year"
  | "image"
  | "category"
  | "durationMinutes"
> & { genres: Pick<Genre, "id" | "slug" | "name">[] };

export type SerialCard = Pick<
  Serial,
  | "id"
  | "slug"
  | "title"
  | "rating"
  | "startYear"
  | "endYear"
  | "image"
  | "status"
  | "badge"
> & { genres: Pick<Genre, "id" | "slug" | "name">[] };

/** Full movie details page */
export interface MovieDetailGenre extends MovieGenre {
  genre: Genre;
}
export interface MovieDetailCast extends MovieCast {
  person: Person;
}
export interface MovieDetailCrew extends MovieCrew {
  person: Person;
}
export interface MovieDetailRelated extends MovieRelated {
  targetMovie: Movie;
}
export interface MovieDetail extends Movie {
  language: Language;
  country: Country | null;
  studio: Studio | null;
  genres: MovieDetailGenre[];
  cast: MovieDetailCast[];
  crew: MovieDetailCrew[];
  awards: MovieAward[];
  downloads: MovieDownload[];
  subtitles: (MovieSubtitle & { language: Language })[];
  audios: (MovieAudio & { language: Language })[];
  streamings: MovieStreaming[];
  images: MovieImage[];
  reviews: Review[];
  relatedMovies: MovieDetailRelated[];
}

/** Full serial details page */
export interface SerialDetailGenre extends Partial<SerialGenre> {
  genre: Genre;
}

export interface SerialDetailCast extends Partial<SerialCast> {
  person: Person;
}

export interface SerialDetailCrew extends Partial<SerialCrew> {
  person: Person;
}

export interface SerialDetailRelatedMovie extends Partial<SerialRelatedMovie> {
  movie: Partial<Movie>;
}

export interface SerialDetail extends Serial {
  language?: Partial<Language>;
  country?: Partial<Country> | null;
  studio?: Partial<Studio> | null;
  genres?: SerialDetailGenre[];
  cast?: SerialDetailCast[];
  crew?: SerialDetailCrew[];
  images?: SerialImage[];
  relatedMovies?: SerialDetailRelatedMovie[];
}

/** Person page with filmography */
export interface PersonDetail extends Person {
  movieCast: (MovieCast & { movie: MovieCard })[];
  movieCrew: (MovieCrew & { movie: MovieCard })[];
  serialCast: (SerialCast & { serial: SerialCard })[];
  serialCrew: (SerialCrew & { serial: SerialCard })[];
}

/** Home page hero / featured row */
export type FeaturedEntry =
  | (FeaturedItem & {
      type: "Movie";
      movie: MovieCard & Pick<Movie, "backdrop" | "description">;
    })
  | (FeaturedItem & {
      type: "Serial";
      serial: SerialCard & Pick<Serial, "backdrop" | "description">;
    });

/** Continue-watching row */
export type ContinueWatchingEntry = ContinueWatching & {
  movie: MovieCard | null;
  serial: SerialCard | null;
};

export interface UserWithSubscription extends User {
  subscriptions: (UserSubscription & { plan: Plan }) | null;
}

// ==========================================
// API helpers
// ==========================================

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MovieFilters {
  q?: string;
  genre?: string;
  category?: MovieCategory;
  year?: number;
  minRating?: number;
  sort?: "rating" | "year" | "title" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
