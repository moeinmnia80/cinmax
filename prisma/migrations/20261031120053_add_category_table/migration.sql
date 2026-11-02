/*
  Warnings:

  - You are about to drop the column `categories` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Serial` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_categories_idx";

-- DropIndex
DROP INDEX "Serial_categories_idx";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "categories";

-- AlterTable
ALTER TABLE "Serial" DROP COLUMN "categories";

-- DropEnum
DROP TYPE "ContentCategory";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieCategory" (
    "movieId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MovieCategory_pkey" PRIMARY KEY ("movieId","categoryId")
);

-- CreateTable
CREATE TABLE "SerialCategory" (
    "serialId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SerialCategory_pkey" PRIMARY KEY ("serialId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "MovieCategory_categoryId_idx" ON "MovieCategory"("categoryId");

-- CreateIndex
CREATE INDEX "SerialCategory_categoryId_idx" ON "SerialCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCategory" ADD CONSTRAINT "SerialCategory_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerialCategory" ADD CONSTRAINT "SerialCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
