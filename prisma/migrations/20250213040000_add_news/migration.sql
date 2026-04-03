-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "subtitle" TEXT,
    "subtitle_en" TEXT,
    "thumbnail" TEXT,
    "content" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
