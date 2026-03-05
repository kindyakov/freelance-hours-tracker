-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('WORK', 'LEARNING', 'PERSONAL', 'OTHER');

-- AlterTable
ALTER TABLE "Segment" ADD COLUMN     "category" "ActivityCategory" NOT NULL DEFAULT 'WORK';
