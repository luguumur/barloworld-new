import ProductTypeListContainer from "@/components/Admin/ProductType";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getProductTypes } from "@/actions/productType";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Product Types - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage product types",
};

export const revalidate = 0;

export default async function ProductTypesPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
	const items = await getProductTypes(search);

	return (
		<>
			<Breadcrumb pageTitle="Product Types" />
			<Suspense fallback={<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">Loading…</div>}>
				<ProductTypeListContainer items={items} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
