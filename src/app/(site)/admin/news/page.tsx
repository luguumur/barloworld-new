import NewsListContainer from "@/components/Admin/News";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getNews } from "@/actions/news";
import { getNewsCategories } from "@/actions/newsCategory";
import { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";

export const metadata: Metadata = {
	title: `News - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage news",
};

export const revalidate = 0;

export default async function NewsPage({
	searchParams,
}: {
	searchParams: { search?: string; category?: string; page?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const categoryId =
		typeof searchParams.category === "string"
			? searchParams.category
			: undefined;
	const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
	const rawSize = parseInt(
		(await cookies()).get(ADMIN_PAGE_SIZE_COOKIE)?.value ?? "",
		10
	);
	const pageSize: PageSizeOption = (
		PAGE_SIZE_OPTIONS as readonly number[]
	).includes(rawSize)
		? (rawSize as PageSizeOption)
		: DEFAULT_PAGE_SIZE;
	const [{ items: news, total }, categoriesResult] = await Promise.all([
		getNews({ search, categoryId, page, pageSize }),
		getNewsCategories(),
	]);
	const totalPages = Math.ceil(total / pageSize);
	const categoryOptions = categoriesResult.items.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
	}));

	return (
		<>
			<Breadcrumb pageTitle='News' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<NewsListContainer
					news={news}
					categories={categoryOptions}
					initialSearch={search ?? ""}
					initialCategoryId={categoryId ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
