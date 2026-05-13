import { Metadata } from "next";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import LeadershipSection from "@/components/Common/LeadershipSection";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Management - ${process.env.SITE_NAME}`,
	description: "Meet the leadership team of Barloworld Mongolia.",
};

export default function ManagementPage() {
	return (
		<>
			<ProductPageHeader
				title='Management'
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "About", href: "/about" },
					{ label: "Management" },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<LeadershipSection />
					</main>
				</div>
			</article>
		</>
	);
}
