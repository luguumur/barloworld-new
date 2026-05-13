import { Metadata } from "next";
import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import DealsGrid from "@/components/Home/DealsSection/DealsGrid";
import { getDealsPublic } from "@/actions/deal";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Deals & Specials - ${process.env.SITE_NAME}`,
	description: "Browse current deals and special offers from Barloworld Mongolia.",
};

export default async function DealsSpecialsPage() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const deals = await getDealsPublic(0); // 0 = fetch all

	return (
		<>
			<ProductPageHeader
				title='Deals & Specials'
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Deals & Specials" },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<DealsGrid deals={deals} lang={lang} />
					</main>
				</div>
			</article>
		</>
	);
}
