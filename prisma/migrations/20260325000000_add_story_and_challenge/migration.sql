-- CreateTable: StoryProgress
CREATE TABLE "StoryProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "pagesRead" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StoryProgress_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StoryProgress_studentId_storyId_key" ON "StoryProgress"("studentId", "storyId");
CREATE INDEX "StoryProgress_studentId_idx" ON "StoryProgress"("studentId");
ALTER TABLE "StoryProgress" ADD CONSTRAINT "StoryProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable: DailyChallenge
CREATE TABLE "DailyChallenge" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "topic" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyChallenge_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "DailyChallenge_studentId_date_key" ON "DailyChallenge"("studentId", "date");
CREATE INDEX "DailyChallenge_studentId_idx" ON "DailyChallenge"("studentId");
CREATE INDEX "DailyChallenge_date_idx" ON "DailyChallenge"("date");
ALTER TABLE "DailyChallenge" ADD CONSTRAINT "DailyChallenge_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
