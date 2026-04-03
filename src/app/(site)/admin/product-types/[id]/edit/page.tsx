import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductTypeForm from "@/components/Admin/ProductType/ProductTypeForm";
import { getProductTypeById } from "@/actions/productType";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Product Type - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit product type",
};

export default async function EditProductTypePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const item = await getProductTypeById(id);
	if (!item) notFound();

	return (
		<>
			<Breadcrumb pageTitle="Edit Product Type" />
			<ProductTypeForm
				mode="edit"
				editId={id}
				initial={{ name: item.name, name_en: item.name_en }}
			/>
		</>
	);
}
