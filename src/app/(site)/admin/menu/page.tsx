import MenuListContainer from "@/components/Admin/MenuItem";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getMenuItems } from "@/actions/menu";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Menu - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage site header menu (links to custom pages and URLs)",
};

export const revalidate = 0;

export default async function MenuAdminPage() {
	const items = await getMenuItems();

	return (
		<>
			<Breadcrumb pageTitle="Menu" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<MenuListContainer items={items} />
			</Suspense>
		</>
	);
}
