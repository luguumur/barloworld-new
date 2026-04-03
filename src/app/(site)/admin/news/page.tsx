import NewsListContainer from "@/components/Admin/News";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getNews } from "@/actions/news";
import { getNewsCategories } from "@/actions/newsCategory";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `News - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage news",
};

export const revalidate = 0;

export default async function NewsPage({
	searchParams,
}: {
	searchParams: { search?: string; category?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const categoryId =
		typeof searchParams.category === "string" ? searchParams.category : undefined;
	const [news, categories] = await Promise.all([
		getNews(search, categoryId),
		getNewsCategories(),
	]);
	const categoryOptions = categories.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
	}));

	return (
		<>
			<Breadcrumb pageTitle="News" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<NewsListContainer
					news={news}
					categories={categoryOptions}
					initialSearch={search ?? ""}
					initialCategoryId={categoryId ?? ""}
				/>
			</Suspense>
		</>
	);
}
