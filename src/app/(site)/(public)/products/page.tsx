import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import ImageCards from "@/components/Common/ImageCards";
import { getProductTypesPublic } from "@/lib/productTypePublic";
import { resolveImageUrl } from "@/libs/resolveImageUrl";

export const revalidate = 0;

export const metadata = {
	title: "Products | Barloworld Mongolia",
};

export default async function ProductTypesPage() {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const types = await getProductTypesPublic();

	const imageCards = types.map((type) => ({
		href: `/products/${type.id}`,
		image: resolveImageUrl(type.img_path, null),
		alt: lang === "mn" ? type.name : type.name_en,
		title: lang === "mn" ? type.name : type.name_en,
	}));

	return (
		<>
			<ProductPageHeader
				title='Cat Equipment'
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
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
