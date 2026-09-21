-- CreateEnum
CREATE TYPE "FeaturedType" AS ENUM ('Movie', 'Serial');

-- CreateTable
CREATE TABLE "FeaturedItem" (
    "id" SERIAL NOT NULL,
    "type" "FeaturedType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "movieId" INTEGER,
    "serialId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeaturedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeaturedItem_active_order_idx" ON "FeaturedItem"("active", "order");

-- AddForeignKey
ALTER TABLE "FeaturedItem" ADD CONSTRAINT "FeaturedItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedItem" ADD CONSTRAINT "FeaturedItem_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "Serial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
