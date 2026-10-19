/*
  Warnings:

  - A unique constraint covering the columns `[movieId,personId]` on the table `MovieCast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serialId,personId]` on the table `SerialCast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieCast_movieId_personId_key" ON "MovieCast"("movieId", "personId");

-- CreateIndex
CREATE UNIQUE INDEX "SerialCast_serialId_personId_key" ON "SerialCast"("serialId", "personId");
