import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MagazineForm from "@/components/Admin/Magazine/MagazineForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Magazine - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new magazine",
};

export default function NewMagazinePage() {
	return (
		<>
			<Breadcrumb pageTitle="New Magazine" />
			<MagazineForm mode="create" />
		</>
	);
}
