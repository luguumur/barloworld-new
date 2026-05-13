import { Metadata } from "next";
import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import TestimonialsGrid from "@/components/Home/TestimonialsSection/TestimonialsGrid";
import { getTestimonialsPublic } from "@/actions/testimonial";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Testimonials - ${process.env.SITE_NAME}`,
	description: "Hear what our customers say about Barloworld Mongolia.",
};

export default async function TestimonialsPage() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const items = await getTestimonialsPublic(0); // 0 = all

	return (
		<>
			<ProductPageHeader
				title={lang === "mn" ? "Сэтгэгдэл" : "Testimonials"}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: lang === "mn" ? "Сэтгэгдэл" : "Testimonials" },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<TestimonialsGrid items={items} lang={lang} />
					</main>
				</div>
			</article>
		</>
	);
}
