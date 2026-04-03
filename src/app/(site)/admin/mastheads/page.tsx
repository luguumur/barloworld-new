import MastheadListContainer from "@/components/Admin/Masthead";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getMastheads } from "@/actions/masthead";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Mastheads - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage mastheads",
};

export const revalidate = 0;

export default async function MastheadsPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const mastheads = await getMastheads(search);

	return (
		<>
			<Breadcrumb pageTitle="Mastheads" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<MastheadListContainer
					mastheads={mastheads}
					initialSearch={search ?? ""}
				/>
			</Suspense>
		</>
	);
}
