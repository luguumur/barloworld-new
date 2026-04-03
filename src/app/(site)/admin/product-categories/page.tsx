import ProductCategoryListContainer from "@/components/Admin/ProductCategory";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getProductCategories } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Product Categories - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage product categories",
};

export const revalidate = 0;

export default async function ProductCategoriesPage({
	searchParams,
}: {
	searchParams: { search?: string; type?: string };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
	const typeFilter = typeof searchParams.type === "string" ? searchParams.type : undefined;
	const [items, productTypes] = await Promise.all([
		getProductCategories(typeFilter, search),
		getProductTypes(),
	]);
	const typeOptions = productTypes.map((t) => ({ id: t.id, name: t.name }));

	return (
		<>
			<Breadcrumb pageTitle="Product Categories" />
			<Suspense fallback={<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">Loading…</div>}>
				<ProductCategoryListContainer
					items={items}
					productTypes={typeOptions}
					initialSearch={search ?? ""}
					initialType={typeFilter ?? ""}
				/>
			</Suspense>
		</>
	);
}
