import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getProductTypeByIdPublic } from "@/lib/productTypePublic";
import { getProductCategoriesPublic } from "@/lib/productCategoryPublic";
import GridCard from "@/components/Products/GridCard";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { resolveImageUrl } from "@/libs/resolveImageUrl";

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

	const imageCards = filtered.map((cat) => ({
		key: cat.id,
		href: `/products/${type.id}/${cat.id}`,
		image: resolveImageUrl(cat.img_path, null),
		alt: lang === "mn" ? cat.name : cat.name_en,
		title: lang === "mn" ? cat.name : cat.name_en,
	}));

	return (
		<>
			<ProductPageHeader
				title={typeName}
				// backgroundImage={type.img_path}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: typeName },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<GridCard cards={imageCards} />
					</main>
				</div>
			</article>
		</>
	);
}
