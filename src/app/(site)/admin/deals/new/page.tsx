import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import DealForm from "@/components/Admin/Deal/DealForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Deal - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new deal or special",
};

export default function NewDealPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Deal" />
			<DealForm mode="create" />
		</>
	);
}
