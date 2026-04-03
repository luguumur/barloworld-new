import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductCategoryForm from "@/components/Admin/ProductCategory/ProductCategoryForm";
import { getProductCategoryById } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Product Category - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit product category",
};

export default async function EditProductCategoryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [item, productTypes] = await Promise.all([
		getProductCategoryById(id),
		getProductTypes(),
	]);
	if (!item) notFound();

	const typeOptions = productTypes.map((t) => ({ id: t.id, name: t.name, name_en: t.name_en }));

	return (
		<>
			<Breadcrumb pageTitle="Edit Product Category" />
			<ProductCategoryForm
				mode="edit"
				editId={id}
				initial={{
					name: item.name,
					name_en: item.name_en,
					parentId: item.parentId,
					img_path: item.img_path,
					types: item.types,
				}}
				productTypes={typeOptions}
			/>
		</>
	);
}
