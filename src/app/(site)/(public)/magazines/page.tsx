import { Metadata } from "next";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import MagazineGrid from "@/components/Common/MagazineGrid";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Magazines - ${process.env.SITE_NAME}`,
	description: "Browse all issues of Barloworld Mongolia magazine.",
};

export default function MagazinesPage() {
	return (
		<>
			<ProductPageHeader
				title='Magazines'
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Magazines" }]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<MagazineGrid />
					</main>
				</div>
			</article>
		</>
	);
}
