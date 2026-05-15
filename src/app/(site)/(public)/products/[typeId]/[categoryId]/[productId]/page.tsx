import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getProductTypeByIdPublic } from "@/lib/productTypePublic";
import {
	getProductCategoryByIdPublic,
	getProductCategoriesPublic,
} from "@/lib/productCategoryPublic";
import { getProductByIdPublic, getProductsPublic } from "@/lib/productPublic";
import ProductDetail from "@/components/Products/ProductDetail";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";

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

	const [type, category, product, products, allCategories] = await Promise.all([
		getProductTypeByIdPublic(params.typeId),
		getProductCategoryByIdPublic(params.categoryId),
		getProductByIdPublic(params.productId),
		getProductsPublic({ categoryId: params.categoryId }),
		getProductCategoriesPublic(),
	]);

	if (!type || !category || !product) notFound();

	const typeName = lang === "mn" ? type.name : type.name_en;
	const catName = lang === "mn" ? category.name : category.name_en;
	const productName = lang === "mn" ? product.name : product.name_en;

	const productMenuItems = products
		.filter((c: any) => c.category.id === category.id)
		.map((c) => ({
			href: `/products/${params.typeId}/${category.id}/${c.id}`,
			label: lang === "mn" ? c.name : c.name_en,
		}));

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
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar products={productMenuItems} />
					<main className='page-content col-md-9'>
						<ProductDetail product={product} lang={lang} />
					</main>
				</div>
			</article>
		</>
	);
}
