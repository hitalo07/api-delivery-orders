-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "end_at" DROP NOT NULL,
ALTER COLUMN "end_at" DROP DEFAULT;
