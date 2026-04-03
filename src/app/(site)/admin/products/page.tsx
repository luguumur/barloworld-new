import ProductListContainer from "@/components/Admin/Product";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getProducts } from "@/actions/product";
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
	searchParams: { search?: string; category?: string; type?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const categoryId =
		typeof searchParams.category === "string" ? searchParams.category : undefined;
	const productTypes =
		typeof searchParams.type === "string" ? searchParams.type : undefined;
	const [products, categories, productTypesList] = await Promise.all([
		getProducts({ search, categoryId, productTypes }),
		getProductCategories(),
		getProductTypes(),
	]);
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
			<Breadcrumb pageTitle="Products" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
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
				/>
			</Suspense>
		</>
	);
}
