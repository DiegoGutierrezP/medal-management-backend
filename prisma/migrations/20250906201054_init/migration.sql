-- CreateEnum
CREATE TYPE "public"."Medal" AS ENUM ('BRONCE', 'PLATA', 'ORO', 'PLATINO', 'DIAMANTE', 'MAESTRO', 'GRAN_MAESTRO');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "medal" "public"."Medal" NOT NULL DEFAULT 'BRONCE';
