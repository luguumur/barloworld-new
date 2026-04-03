import AttributeValueGroupListContainer from "@/components/Admin/AttributeValueGroup";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getAttributeValueGroups } from "@/actions/attributeValueGroup";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Attribute Value Groups - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage attribute value groups",
};

export const revalidate = 0;

export default async function AttributeValueGroupsPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
	const items = await getAttributeValueGroups(search);

	return (
		<>
			<Breadcrumb pageTitle="Attribute Value Groups" />
			<Suspense fallback={<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">Loading…</div>}>
				<AttributeValueGroupListContainer items={items} initialSearch={search ?? ""} />
			</Suspense>
		</>
	);
}
