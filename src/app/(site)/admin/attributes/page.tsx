import AttributeListContainer from "@/components/Admin/Attribute";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getAttributes } from "@/actions/attribute";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Attributes - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage attributes",
};

export const revalidate = 0;

export default async function AttributesPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
	const items = await getAttributes(search);

	return (
		<>
			<Breadcrumb pageTitle="Attributes" />
			<Suspense fallback={<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">Loading…</div>}>
				<AttributeListContainer items={items} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
