import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MenuItemForm from "@/components/Admin/MenuItem/MenuItemForm";
import { getMenuItemById } from "@/actions/menu";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Menu Item - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit menu item",
};

export default async function EditMenuItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const item = await getMenuItemById(id);
	if (!item) notFound();

	const initial = {
		title: item.title,
		title_en: item.title_en ?? "",
		path: item.path,
		linkType: item.linkType as "PAGE" | "CUSTOM",
		parentId: item.parentId ?? null,
		order: item.order,
		newTab: item.newTab,
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Menu Item" />
			<MenuItemForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
