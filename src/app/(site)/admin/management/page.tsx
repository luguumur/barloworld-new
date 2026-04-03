import ManagementListContainer from "@/components/Admin/Management";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getManagements } from "@/actions/management";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Management - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage management (name, position, image, order)",
};

export const revalidate = 0;

export default async function ManagementPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
	const managements = await getManagements(search);

	return (
		<>
			<Breadcrumb pageTitle="Management" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<ManagementListContainer managements={managements} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
