import MagazineListContainer from "@/components/Admin/Magazine";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getMagazines } from "@/actions/magazine";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Magazines - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage magazines",
};

export const revalidate = 0;

export default async function MagazinesPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const magazines = await getMagazines(search);

	return (
		<>
			<Breadcrumb pageTitle="Magazines" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<MagazineListContainer
					magazines={magazines}
					initialSearch={search ?? ""}
				/>
			</Suspense>
		</>
	);
}
