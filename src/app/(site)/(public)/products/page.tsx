import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import ImageCards from "@/components/Common/ImageCards";
import { getProductTypesPublic } from "@/lib/productTypePublic";
import { resolveImageUrl } from "@/libs/resolveImageUrl";
import { getDbT } from "@/libs/getDbT";

export const revalidate = 0;

export const metadata = {
	title: "Products | Barloworld Mongolia",
};

export default async function ProductTypesPage() {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [types, t] = await Promise.all([getProductTypesPublic(), getDbT()]);

	const imageCards = types.map((type) => ({
		href: `/products/${type.id}`,
		image: resolveImageUrl(type.img_path, null),
		alt: lang === "mn" ? type.name : type.name_en,
		title: lang === "mn" ? type.name : type.name_en,
	}));

	return (
		<>
			<ProductPageHeader
				title={t("Products.title", "Cat Equipment")}
				breadcrumbs={[
					{ label: t("Products.breadcrumb_home", "Home"), href: "/" },
					{ label: t("Products.breadcrumb_products", "Products") },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<ImageCards cards={imageCards} />
					</main>
				</div>
			</article>
		</>
	);
}
