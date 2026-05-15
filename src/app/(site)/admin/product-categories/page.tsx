import ProductCategoryListContainer from "@/components/Admin/ProductCategory";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getProductCategories } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
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
	title: `Product Categories - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage product categories",
};

export const revalidate = 0;

export default async function ProductCategoriesPage({
	searchParams,
}: {
	searchParams: { search?: string; type?: string; page?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const typeFilter =
		typeof searchParams.type === "string" ? searchParams.type : undefined;
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
	const [{ items, total }, productTypesResult] = await Promise.all([
		getProductCategories({ types: typeFilter, search, page, pageSize }),
		getProductTypes(),
	]);
	const totalPages = Math.ceil(total / pageSize);
	const typeOptions = productTypesResult.items.map((t) => ({
		id: t.id,
		name: t.name,
	}));

	return (
		<>
			<Breadcrumb pageTitle='Product Categories' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<ProductCategoryListContainer
					items={items}
					productTypes={typeOptions}
					initialSearch={search ?? ""}
					initialType={typeFilter ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
