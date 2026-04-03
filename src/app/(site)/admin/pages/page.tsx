import PageListContainer from "@/components/Admin/Page";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getPages } from "@/actions/page";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Custom Pages - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Create and manage custom pages (e.g. Service, About)",
};

export const revalidate = 0;

export default async function PagesAdminPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const pages = await getPages(search);

	return (
		<>
			<Breadcrumb pageTitle="Custom Pages" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<PageListContainer pages={pages} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
