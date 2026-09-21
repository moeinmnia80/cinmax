-- CreateEnum
CREATE TYPE "ImageCategory" AS ENUM ('poster', 'backdrop', 'gallery', 'banner');

-- CreateTable
CREATE TABLE "MovieImage" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "caption" TEXT,
    "type" "ImageCategory" NOT NULL DEFAULT 'gallery',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerialImage" (
    "id" SERIAL NOT NULL,
    "serialId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "caption" TEXT,
    "type" "ImageCategory" NOT NULL DEFAULT 'gallery',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SerialImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MovieImage_movieId_idx" ON "MovieImage"("movieId");

-- CreateIndex
CREATE INDEX "SerialImage_serialId_idx" ON "SerialImage"("serialId");

-- AddForeignKey
ALTER TABLE "MovieImage" ADD CONSTRAINT "MovieImage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialImage" ADD CONSTRAINT "SerialImage_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
