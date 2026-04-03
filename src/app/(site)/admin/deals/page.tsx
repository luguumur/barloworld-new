import DealListContainer from "@/components/Admin/Deal";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getDeals } from "@/actions/deal";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Deals & Specials - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage deals and specials",
};

export const revalidate = 0;

export default async function DealsPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const deals = await getDeals(search);

	return (
		<>
			<Breadcrumb pageTitle="Deals & Specials" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<DealListContainer deals={deals} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
