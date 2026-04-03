import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductForm from "@/components/Admin/Product/ProductForm";
import { getProductCategories } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
import { getAttributeValueGroups } from "@/actions/attributeValueGroup";
import { getAttributes } from "@/actions/attribute";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Product - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new product",
};

export const revalidate = 0;

export default async function NewProductPage() {
	const [categories, productTypes, attributeGroups, attributes] =
		await Promise.all([
			getProductCategories(),
			getProductTypes(),
			getAttributeValueGroups(),
			getAttributes(),
		]);
	const categoryOptions = categories.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
		types: c.types,
	}));
	const typeOptions = productTypes.map((t) => ({
		id: t.id,
		name: t.name,
		name_en: t.name_en,
	}));
	const groupOptions = attributeGroups.map((g) => ({
		id: g.id,
		name: g.name,
		name_en: g.name_en,
	}));
	const attributeOptions = attributes.map((a) => ({
		id: a.id,
		name: a.name,
		name_en: a.name_en,
		data_type: a.data_type,
	}));

	return (
		<>
			<Breadcrumb pageTitle="New Product" />
			<ProductForm
				mode="create"
				categories={categoryOptions}
				productTypes={typeOptions}
				attributeGroups={groupOptions}
				attributes={attributeOptions}
			/>
		</>
	);
}
