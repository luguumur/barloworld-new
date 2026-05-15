import NewsCategoryListContainer from "@/components/Admin/NewsCategory";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
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
	title: `News Categories - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage news categories",
};

export const revalidate = 0;

export default async function NewsCategoryPage({
	searchParams,
}: {
	searchParams: { search?: string; page?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
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
	const { items: categories, total } = await getNewsCategories({
		search,
		page,
		pageSize,
	});
	const totalPages = Math.ceil(total / pageSize);

	return (
		<>
			<Breadcrumb pageTitle='News Categories' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<NewsCategoryListContainer
					categories={categories}
					initialSearch={search ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
