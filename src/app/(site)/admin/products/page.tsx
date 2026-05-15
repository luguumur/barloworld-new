import ProductListContainer from "@/components/Admin/Product";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { cookies } from "next/headers";
import { getProducts } from "@/actions/product";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";
import { getProductCategories } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Products - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage products",
};

export const revalidate = 0;

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: {
		search?: string;
		category?: string;
		type?: string;
		page?: string;
	};
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const categoryId =
		typeof searchParams.category === "string"
			? searchParams.category
			: undefined;
	const productTypes =
		typeof searchParams.type === "string" ? searchParams.type : undefined;
	const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
	const rawSize = parseInt(
		cookies().get(ADMIN_PAGE_SIZE_COOKIE)?.value ?? "",
		10
	);
	const pageSize: PageSizeOption = (
		PAGE_SIZE_OPTIONS as readonly number[]
	).includes(rawSize)
		? (rawSize as PageSizeOption)
		: DEFAULT_PAGE_SIZE;

	const [
		{ products, total },
		{ items: categories },
		{ items: productTypesList },
	] = await Promise.all([
		getProducts({ search, categoryId, productTypes, page, pageSize }),
		getProductCategories(),
		getProductTypes(),
	]);

	const totalPages = Math.ceil(total / pageSize);

	const categoryOptions = categories.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
		types: c.types,
	}));
	const typeOptions = productTypesList.map((t) => ({
		id: t.id,
		name: t.name,
		name_en: t.name_en,
	}));

	return (
		<>
			<Breadcrumb pageTitle='Products' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<ProductListContainer
					products={products}
					categories={categoryOptions}
					productTypes={typeOptions}
					initialSearch={search ?? ""}
					initialCategoryId={categoryId ?? ""}
					initialProductTypes={productTypes ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
