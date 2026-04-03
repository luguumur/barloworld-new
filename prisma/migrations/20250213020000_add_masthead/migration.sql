-- CreateTable
CREATE TABLE "Masthead" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "subtitle" TEXT,
    "subtitle_en" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "url" TEXT,
    "imageurl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Masthead_pkey" PRIMARY KEY ("id")
);
