/*
  Warnings:

  - You are about to drop the column `remaining` on the `ContinueWatching` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `Movie` table. All the data in the column will be lost.
  - The `budget` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `boxOffice` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `size` on the `MovieDownload` table. All the data in the column will be lost.
  - The `price` column on the `MovieStreaming` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `birthDate` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `language` on the `Serial` table. All the data in the column will be lost.
  - You are about to drop the column `years` on the `Serial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `ContinueWatching` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,serialId]` on the table `ContinueWatching` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `remainingSec` to the `ContinueWatching` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `ContinueWatching` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `durationMinutes` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeBytes` to the `MovieDownload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Serial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `Serial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContinueWatching" DROP COLUMN "remaining",
ADD COLUMN     "remainingSec" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "duration",
DROP COLUMN "votes",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "votesCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "budget",
ADD COLUMN     "budget" BIGINT,
DROP COLUMN "boxOffice",
ADD COLUMN     "boxOffice" BIGINT;

-- AlterTable
ALTER TABLE "MovieDownload" DROP COLUMN "size",
ADD COLUMN     "sizeBytes" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "MovieStreaming" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(6,2);

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Serial" DROP COLUMN "language",
DROP COLUMN "years",
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "languageId" INTEGER NOT NULL,
ADD COLUMN     "startYear" INTEGER NOT NULL,
ADD COLUMN     "studioId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerialCast" (
    "id" SERIAL NOT NULL,
    "serialId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "character" TEXT,

    CONSTRAINT "SerialCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerialCrew" (
    "id" SERIAL NOT NULL,
    "serialId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "role" "PersonType" NOT NULL,

    CONSTRAINT "SerialCrew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "SerialCast_serialId_idx" ON "SerialCast"("serialId");

-- CreateIndex
CREATE INDEX "SerialCast_personId_idx" ON "SerialCast"("personId");

-- CreateIndex
CREATE INDEX "SerialCrew_serialId_idx" ON "SerialCrew"("serialId");

-- CreateIndex
CREATE INDEX "SerialCrew_personId_idx" ON "SerialCrew"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "ContinueWatching_userId_movieId_key" ON "ContinueWatching"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "ContinueWatching_userId_serialId_key" ON "ContinueWatching"("userId", "serialId");

-- AddForeignKey
ALTER TABLE "Serial" ADD CONSTRAINT "Serial_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Serial" ADD CONSTRAINT "Serial_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Serial" ADD CONSTRAINT "Serial_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCast" ADD CONSTRAINT "SerialCast_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCast" ADD CONSTRAINT "SerialCast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCrew" ADD CONSTRAINT "SerialCrew_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCrew" ADD CONSTRAINT "SerialCrew_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContinueWatching" ADD CONSTRAINT "ContinueWatching_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
