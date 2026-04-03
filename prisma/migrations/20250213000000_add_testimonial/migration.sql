-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "subtitle" TEXT,
    "subtitle_en" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "video_url" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
