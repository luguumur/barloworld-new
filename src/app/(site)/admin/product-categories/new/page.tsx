import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductCategoryForm from "@/components/Admin/ProductCategory/ProductCategoryForm";
import { getProductTypes } from "@/actions/productType";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Product Category - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a product category",
};

export default async function NewProductCategoryPage() {
	const productTypes = await getProductTypes();
	const typeOptions = productTypes.map((t) => ({ id: t.id, name: t.name, name_en: t.name_en }));

	return (
		<>
			<Breadcrumb pageTitle="New Product Category" />
			<ProductCategoryForm mode="create" productTypes={typeOptions} />
		</>
	);
}
