"use client";
import NewsEmptyState from "./NewsEmptyState";
import NewsListTable from "./NewsListTable";
import NewsTopbar from "./NewsTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

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
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	news: NewsItem[];
	categories: CategoryOption[];
	initialSearch?: string;
	initialCategoryId?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<NewsTopbar
					initialSearch={initialSearch}
					initialCategoryId={initialCategoryId}
					categories={categories}
				/>
			</div>
			{news?.length ? (
				<>
					<NewsListTable news={news} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='news'
					/>
				</>
			) : (
				<NewsEmptyState />
			)}
		</>
	);
}
