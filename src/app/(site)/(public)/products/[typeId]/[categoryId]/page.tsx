import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getProductTypeByIdPublic } from "@/lib/productTypePublic";
import {
	getProductCategoryByIdPublic,
	getProductCategoriesPublic,
} from "@/lib/productCategoryPublic";
import { getProductsPublic } from "@/lib/productPublic";
import ProductCard from "@/components/Products/ProductCard";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";

type Props = { params: { typeId: string; categoryId: string } };

export async function generateMetadata({ params }: Props) {
	const cat = await getProductCategoryByIdPublic(params.categoryId);
	return { title: cat ? `${cat.name_en} | Barloworld Mongolia` : "Products" };
}

export default async function ProductsListPage({ params }: Props) {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [type, category, products, allCategories] = await Promise.all([
		getProductTypeByIdPublic(params.typeId),
		getProductCategoryByIdPublic(params.categoryId),
		getProductsPublic({ categoryId: params.categoryId }),
		getProductCategoriesPublic(),
	]);

	if (!type || !category) notFound();

	const typeName = lang === "mn" ? type.name : type.name_en;
	const catName = lang === "mn" ? category.name : category.name_en;

	const categoryMenuItems = allCategories
		.filter((c) => c.types === type.name)
		.map((c) => ({
			href: `/products/${params.typeId}/${c.id}`,
			label: lang === "mn" ? c.name : c.name_en,
		}));

	return (
		<>
			<ProductPageHeader
				title={catName}
				// backgroundImage={category.img_path}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: typeName, href: `/products/${type.id}` },
					{ label: catName },
				]}
				subtitle={`${products.length} model${
					products.length !== 1 ? "s" : ""
				} available`}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar categories={categoryMenuItems} />
					<main className='page-content col-md-9'>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								href={`/products/${type.id}/${category.id}/${product.id}`}
								lang={lang}
							/>
						))}
					</main>
				</div>
			</article>

			{/* <div className='container mx-auto px-4 py-12 sm:px-8 xl:px-0'>
				{products.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-24 text-center'>
						<p className='text-gray-5'>
							No models available in this category yet.
						</p>
						<Link
							href={`/products/${type.id}`}
							className='mt-4 text-sm font-semibold text-primary hover:underline'
						>
							← Back to {typeName}
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								href={`/products/${type.id}/${category.id}/${product.id}`}
								lang={lang}
							/>
						))}
					</div>
				)}
			</div> */}
		</>
	);
}
