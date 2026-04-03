"use client";
import NewsEmptyState from "./NewsEmptyState";
import NewsListTable from "./NewsListTable";
import NewsTopbar from "./NewsTopbar";

type NewsItem = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	thumbnail: string | null;
	content: string;
	content_en: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	category?: {
		id: string;
		name: string;
		name_en: string;
		createdAt: Date;
		updatedAt: Date;
	};
};

type CategoryOption = { id: string; name: string; name_en: string };

export default function NewsListContainer({
	news,
	categories,
	initialSearch = "",
	initialCategoryId = "",
}: {
	news: NewsItem[];
	categories: CategoryOption[];
	initialSearch?: string;
	initialCategoryId?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<NewsTopbar
					initialSearch={initialSearch}
					initialCategoryId={initialCategoryId}
					categories={categories}
				/>
			</div>
			{news?.length ? (
				<NewsListTable news={news} />
			) : (
				<NewsEmptyState />
			)}
		</>
	);
}
