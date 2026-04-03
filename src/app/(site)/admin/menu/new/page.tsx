import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MenuItemForm from "@/components/Admin/MenuItem/MenuItemForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Menu Item - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a menu item to the site header",
};

export default function NewMenuItemPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Menu Item" />
			<MenuItemForm mode="create" />
		</>
	);
}
