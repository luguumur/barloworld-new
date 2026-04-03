import NewsCategoryListContainer from "@/components/Admin/NewsCategory";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getNewsCategories } from "@/actions/newsCategory";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `News Categories - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage news categories",
};

export const revalidate = 0;

export default async function NewsCategoryPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const categories = await getNewsCategories(search);

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
				/>
			</Suspense>
		</>
	);
}
