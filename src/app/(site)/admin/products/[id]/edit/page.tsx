import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductForm from "@/components/Admin/Product/ProductForm";
import { getProductById } from "@/actions/product";
import { getProductCategories } from "@/actions/productCategory";
import { getProductTypes } from "@/actions/productType";
import { getAttributeValueGroups } from "@/actions/attributeValueGroup";
import { getAttributes } from "@/actions/attribute";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Product - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit product",
};

export const revalidate = 0;

export default async function EditProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [product, categories, productTypes, attributeGroups, attributes] =
		await Promise.all([
			getProductById(id),
			getProductCategories(),
			getProductTypes(),
			getAttributeValueGroups(),
			getAttributes(),
		]);
	if (!product) notFound();

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

	const price =
		product.price != null
			? typeof product.price === "object" && "toString" in product.price
				? (product.price as { toString: () => string }).toString()
				: String(product.price)
			: null;

	const initial = {
		name: product.name,
		name_en: product.name_en,
		description: product.description,
		description_en: product.description_en,
		price,
		img_path: product.img_path ?? "",
		brochure_path: product.brochure_path ?? "",
		model_3d: product.model_3d ?? "",
		video_link: product.video_link ?? "",
		product_types: product.product_types ?? "",
		product_order: product.product_order ?? null,
		status: product.status,
		categoryId: product.categoryId,
		attributeValues:
			product.attributeValues?.map((av) => ({
				attributeId: av.attributeId,
				groupId: av.groupId,
				value: av.string_value ?? "",
			})) ?? [],
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Product" />
			<ProductForm
				mode="edit"
				editId={id}
				initial={initial}
				categories={categoryOptions}
				productTypes={typeOptions}
				attributeGroups={groupOptions}
				attributes={attributeOptions}
			/>
		</>
	);
}
