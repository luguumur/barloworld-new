import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AttributeValueGroupForm from "@/components/Admin/AttributeValueGroup/AttributeValueGroupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Attribute Group - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add an attribute value group",
};

export default function NewAttributeValueGroupPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Attribute Group" />
			<AttributeValueGroupForm mode="create" />
		</>
	);
}
