import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getProductTypeByIdPublic } from "@/lib/productTypePublic";
import { getProductCategoryByIdPublic } from "@/lib/productCategoryPublic";
import { getProductByIdPublic, getProductsPublic } from "@/lib/productPublic";
import ProductDetail from "@/components/Products/ProductDetail";
import ProductPageHeader from "@/components/Products/ProductPageHeader";

export const revalidate = 0;

type Props = {
	params: { typeId: string; categoryId: string; productId: string };
};

export async function generateMetadata({ params }: Props) {
	const product = await getProductByIdPublic(params.productId);
	return {
		title: product ? `${product.name_en} | Barloworld Mongolia` : "Product",
	};
}

export default async function ProductDetailPage({ params }: Props) {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [type, category, product, categoryProducts] = await Promise.all([
		getProductTypeByIdPublic(params.typeId),
		getProductCategoryByIdPublic(params.categoryId),
		getProductByIdPublic(params.productId),
		getProductsPublic({ categoryId: params.categoryId }),
	]);

	if (!type || !category || !product) notFound();

	const typeName = lang === "mn" ? type.name : type.name_en;
	const catName = lang === "mn" ? category.name : category.name_en;
	const productName = lang === "mn" ? product.name : product.name_en;

	return (
		<>
			<ProductPageHeader
				title={productName}
				// backgroundImage={product.img_path}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: typeName, href: `/products/${type.id}` },
					{ label: catName, href: `/products/${type.id}/${category.id}` },
					{ label: productName },
				]}
			/>
			<ProductDetail
				product={product}
				lang={lang}
				categoryProducts={categoryProducts}
			/>
		</>
	);
}
