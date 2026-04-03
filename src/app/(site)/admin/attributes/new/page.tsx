import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AttributeForm from "@/components/Admin/Attribute/AttributeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Attribute - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add an attribute",
};

export default function NewAttributePage() {
	return (
		<>
			<Breadcrumb pageTitle="New Attribute" />
			<AttributeForm mode="create" />
		</>
	);
}
