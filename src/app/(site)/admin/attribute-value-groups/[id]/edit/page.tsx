import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AttributeValueGroupForm from "@/components/Admin/AttributeValueGroup/AttributeValueGroupForm";
import { getAttributeValueGroupById } from "@/actions/attributeValueGroup";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Attribute Group - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit attribute value group",
};

export default async function EditAttributeValueGroupPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const item = await getAttributeValueGroupById(id);
	if (!item) notFound();

	return (
		<>
			<Breadcrumb pageTitle="Edit Attribute Group" />
			<AttributeValueGroupForm
				mode="edit"
				editId={id}
				initial={{ name: item.name, name_en: item.name_en }}
			/>
		</>
	);
}
