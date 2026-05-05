import SiteSearchPageClient from "@/components/GlobalSearch/SiteSearchPageClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Search results — ${process.env.SITE_NAME ?? "Barloworld"}`,
	description: "Search pages, news, products, and more.",
};

export default function SearchPage() {
	return (
		<main className='min-h-[55vh] bg-gray-1 dark:bg-dark'>
			<div className='responsivegrid aem-Grid aem-Grid--12 aem-Grid--default--12 w-full'>
				<div className='aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--offset--default--0 w-full'>
					<div className='container mx-auto px-4 py-10 sm:px-8 xl:px-0'>
						<Suspense
							fallback={
								<p className='text-sm text-body dark:text-gray-5'>
									Loading search…
								</p>
							}
						>
							<SiteSearchPageClient />
						</Suspense>
					</div>
				</div>
			</div>
		</main>
	);
}
