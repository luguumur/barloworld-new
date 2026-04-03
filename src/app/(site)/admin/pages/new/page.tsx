import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import PageForm from "@/components/Admin/Page/PageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Page - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Create a new custom page",
};

export default function NewPagePage() {
	return (
		<>
			<Breadcrumb pageTitle="New Page" />
			<PageForm mode="create" />
		</>
	);
}
