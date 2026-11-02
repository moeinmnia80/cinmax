-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::"ContentCategory"[];

-- AlterTable
ALTER TABLE "Serial" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::"ContentCategory"[];
