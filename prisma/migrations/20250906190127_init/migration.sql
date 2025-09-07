-- AlterTable
ALTER TABLE "public"."MedalThreshold" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."UserPoint" ADD COLUMN     "updatedAt" TIMESTAMP(3);
