/*
  Warnings:

  - A unique constraint covering the columns `[movieId,personId,role]` on the table `MovieCrew` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serialId,personId,role]` on the table `SerialCrew` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieCrew_movieId_personId_role_key" ON "MovieCrew"("movieId", "personId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "SerialCrew_serialId_personId_role_key" ON "SerialCrew"("serialId", "personId", "role");
