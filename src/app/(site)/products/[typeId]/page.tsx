import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductTypeByIdPublic } from "@/lib/productTypePublic";
import { getProductCategoriesPublic } from "@/lib/productCategoryPublic";
import GridCard from "@/components/Products/GridCard";
import ProductPageHeader from "@/components/Products/ProductPageHeader";

export const revalidate = 0;

type Props = { params: { typeId: string } };

export async function generateMetadata({ params }: Props) {
	const type = await getProductTypeByIdPublic(params.typeId);
	return { title: type ? `${type.name_en} | Barloworld Mongolia` : "Products" };
}

export default async function ProductCategoriesPage({ params }: Props) {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [type, categories] = await Promise.all([
		getProductTypeByIdPublic(params.typeId),
		getProductCategoriesPublic(),
	]);

	if (!type) notFound();

	const typeName = lang === "mn" ? type.name : type.name_en;

	const filtered = categories.filter(
		(c) =>
			c.types?.toLowerCase() === type.name?.toLowerCase() ||
			c.types?.toLowerCase() === type.name_en?.toLowerCase()
	);

	return (
		<>
			<ProductPageHeader
				title={typeName}
				backgroundImage={type.img_path}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: typeName },
				]}
			/>

			<div className="mx-auto max-w-[1170px] px-4 py-12 sm:px-8 xl:px-0">
				{filtered.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<p className="text-gray-5">No categories found for this product type.</p>
						<Link href="/products" className="mt-4 text-sm font-semibold text-primary hover:underline">
							← Back to Products
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((cat) => (
							<GridCard
								key={cat.id}
								href={`/products/${type.id}/${cat.id}`}
								name={lang === "mn" ? cat.name : cat.name_en}
								imgPath={cat.img_path}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
}
