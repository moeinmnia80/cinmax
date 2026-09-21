-- CreateEnum
CREATE TYPE "SerialStatus" AS ENUM ('Ongoing', 'Ended', 'Cancelled');

-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('Actor', 'Director', 'Writer', 'Producer');

-- CreateEnum
CREATE TYPE "MovieCategory" AS ENUM ('Hollywood', 'Independent', 'Bollywood', 'Korean', 'Animation');

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "PersonType" NOT NULL DEFAULT 'Actor',
    "image" TEXT,
    "bio" TEXT,
    "birthDate" TEXT,
    "birthPlace" TEXT,
    "height" TEXT,
    "activeYears" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,
    "socialImdb" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "period" TEXT NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "downloadMax" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "rating" DECIMAL(3,1) NOT NULL,
    "votes" TEXT,
    "year" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "category" "MovieCategory" NOT NULL DEFAULT 'Hollywood',
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "image" TEXT NOT NULL,
    "backdrop" TEXT NOT NULL,
    "trailer" TEXT,
    "budget" TEXT,
    "boxOffice" TEXT,
    "recognition" TEXT,
    "languageId" INTEGER NOT NULL,
    "countryId" INTEGER,
    "studioId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieCrew" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" "PersonType" NOT NULL,

    CONSTRAINT "MovieCrew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "MovieCast" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "character" TEXT,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieAward" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MovieAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDownload" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "MovieDownload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieSubtitle" (
    "movieId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "MovieSubtitle_pkey" PRIMARY KEY ("movieId","languageId")
);

-- CreateTable
CREATE TABLE "MovieAudio" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "details" TEXT,

    CONSTRAINT "MovieAudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieStreaming" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "price" TEXT,

    CONSTRAINT "MovieStreaming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieRelated" (
    "sourceMovieId" INTEGER NOT NULL,
    "targetMovieId" INTEGER NOT NULL,

    CONSTRAINT "MovieRelated_pkey" PRIMARY KEY ("sourceMovieId","targetMovieId")
);

-- CreateTable
CREATE TABLE "Serial" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" DECIMAL(3,1) NOT NULL,
    "years" TEXT NOT NULL,
    "seasons" INTEGER NOT NULL DEFAULT 1,
    "episodes" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "backdrop" TEXT,
    "status" "SerialStatus" NOT NULL DEFAULT 'Ongoing',
    "badge" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Serial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerialGenre" (
    "serialId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "SerialGenre_pkey" PRIMARY KEY ("serialId","genreId")
);

-- CreateTable
CREATE TABLE "SerialRelatedMovie" (
    "serialId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "SerialRelatedMovie_pkey" PRIMARY KEY ("serialId","movieId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "avatar" TEXT,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContinueWatching" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "movieId" INTEGER,
    "serialId" INTEGER,
    "progress" INTEGER NOT NULL,
    "remaining" TEXT NOT NULL,
    "currentSeason" INTEGER,
    "currentEpisode" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContinueWatching_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Genre_slug_idx" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_name_key" ON "Studio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Person_slug_key" ON "Person"("slug");

-- CreateIndex
CREATE INDEX "Person_slug_idx" ON "Person"("slug");

-- CreateIndex
CREATE INDEX "Person_name_idx" ON "Person"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- CreateIndex
CREATE INDEX "Movie_slug_idx" ON "Movie"("slug");

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "Movie"("title");

-- CreateIndex
CREATE INDEX "Movie_rating_idx" ON "Movie"("rating");

-- CreateIndex
CREATE INDEX "Movie_year_idx" ON "Movie"("year");

-- CreateIndex
CREATE INDEX "Movie_category_idx" ON "Movie"("category");

-- CreateIndex
CREATE INDEX "MovieCrew_movieId_idx" ON "MovieCrew"("movieId");

-- CreateIndex
CREATE INDEX "MovieCrew_personId_idx" ON "MovieCrew"("personId");

-- CreateIndex
CREATE INDEX "MovieCast_movieId_idx" ON "MovieCast"("movieId");

-- CreateIndex
CREATE INDEX "MovieCast_personId_idx" ON "MovieCast"("personId");

-- CreateIndex
CREATE INDEX "MovieAward_movieId_idx" ON "MovieAward"("movieId");

-- CreateIndex
CREATE INDEX "MovieDownload_movieId_idx" ON "MovieDownload"("movieId");

-- CreateIndex
CREATE INDEX "MovieAudio_movieId_idx" ON "MovieAudio"("movieId");

-- CreateIndex
CREATE INDEX "MovieAudio_languageId_idx" ON "MovieAudio"("languageId");

-- CreateIndex
CREATE INDEX "MovieStreaming_movieId_idx" ON "MovieStreaming"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Serial_slug_key" ON "Serial"("slug");

-- CreateIndex
CREATE INDEX "Serial_slug_idx" ON "Serial"("slug");

-- CreateIndex
CREATE INDEX "Serial_title_idx" ON "Serial"("title");

-- CreateIndex
CREATE INDEX "Serial_rating_idx" ON "Serial"("rating");

-- CreateIndex
CREATE INDEX "Review_movieId_idx" ON "Review"("movieId");

-- CreateIndex
CREATE INDEX "ContinueWatching_userId_idx" ON "ContinueWatching"("userId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAward" ADD CONSTRAINT "MovieAward_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDownload" ADD CONSTRAINT "MovieDownload_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSubtitle" ADD CONSTRAINT "MovieSubtitle_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSubtitle" ADD CONSTRAINT "MovieSubtitle_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAudio" ADD CONSTRAINT "MovieAudio_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAudio" ADD CONSTRAINT "MovieAudio_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieStreaming" ADD CONSTRAINT "MovieStreaming_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRelated" ADD CONSTRAINT "MovieRelated_sourceMovieId_fkey" FOREIGN KEY ("sourceMovieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRelated" ADD CONSTRAINT "MovieRelated_targetMovieId_fkey" FOREIGN KEY ("targetMovieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialGenre" ADD CONSTRAINT "SerialGenre_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialGenre" ADD CONSTRAINT "SerialGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialRelatedMovie" ADD CONSTRAINT "SerialRelatedMovie_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialRelatedMovie" ADD CONSTRAINT "SerialRelatedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContinueWatching" ADD CONSTRAINT "ContinueWatching_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContinueWatching" ADD CONSTRAINT "ContinueWatching_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
