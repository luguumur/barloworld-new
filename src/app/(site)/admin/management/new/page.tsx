import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ManagementForm from "@/components/Admin/Management/ManagementForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Management - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a management entry",
};

export default function NewManagementPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Management" />
			<ManagementForm mode="create" />
		</>
	);
}
