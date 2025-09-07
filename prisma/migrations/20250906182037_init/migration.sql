-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPoint" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedalThreshold" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "MedalThreshold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_alias_key" ON "public"."User"("alias");

-- AddForeignKey
ALTER TABLE "public"."UserPoint" ADD CONSTRAINT "UserPoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
