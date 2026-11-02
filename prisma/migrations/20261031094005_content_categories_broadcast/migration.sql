/*
  Warnings:

  - You are about to drop the column `category` on the `Movie` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContentCategory" AS ENUM ('Hollywood', 'Bollywood', 'Korean', 'Turkish', 'Japanese', 'Chinese', 'Iranian', 'European', 'Arabic', 'Thai', 'Latin', 'Animation', 'Anime', 'Donghua');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri');

-- DropIndex
DROP INDEX "Movie_category_idx";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "category",
ADD COLUMN     "categories" "ContentCategory"[];

-- AlterTable
ALTER TABLE "Serial" ADD COLUMN     "categories" "ContentCategory"[];

-- DropEnum
DROP TYPE "MovieCategory";

-- CreateTable
CREATE TABLE "Broadcast" (
    "id" SERIAL NOT NULL,
    "type" "FeaturedType" NOT NULL,
    "label" TEXT,
    "days" "WeekDay"[],
    "time" VARCHAR(5) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "movieId" INTEGER,
    "serialId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Broadcast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Broadcast_movieId_idx" ON "Broadcast"("movieId");

-- CreateIndex
CREATE INDEX "Broadcast_serialId_idx" ON "Broadcast"("serialId");

-- CreateIndex
CREATE INDEX "Movie_categories_idx" ON "Movie" USING GIN ("categories");

-- CreateIndex
CREATE INDEX "Serial_categories_idx" ON "Serial" USING GIN ("categories");

-- AddForeignKey
ALTER TABLE "Broadcast" ADD CONSTRAINT "Broadcast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Broadcast" ADD CONSTRAINT "Broadcast_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
