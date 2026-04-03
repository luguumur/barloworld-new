import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MastheadForm from "@/components/Admin/Masthead/MastheadForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Masthead - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new masthead",
};

export default function NewMastheadPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Masthead" />
			<MastheadForm mode="create" />
		</>
	);
}
