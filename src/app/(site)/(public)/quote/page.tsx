import { Metadata } from "next";
import QuoteForm from "@/components/Common/QuoteForm";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";

export const metadata: Metadata = {
	title: `Request a Quote - ${process.env.SITE_NAME}`,
	description: "Request a quote for Cat equipment from Barloworld Mongolia.",
};

export default async function QuotePage({
	searchParams,
}: {
	searchParams: Promise<{ equipment?: string }>;
}) {
	const { equipment } = await searchParams;

	return (
		<>
			<ProductPageHeader
				title='Request a Quote'
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Request a Quote" },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<h2 className='mb-4 text-2xl font-bold'>Get a Quote</h2>
						<p className='mb-8 text-gray-600'>
							Fill out the form below and our team will contact you shortly.
						</p>
						<QuoteForm defaultProduct={equipment ?? ""} />
					</main>
				</div>
			</article>
		</>
	);
}
