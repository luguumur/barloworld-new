import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AttributeForm from "@/components/Admin/Attribute/AttributeForm";
import { getAttributeById } from "@/actions/attribute";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Attribute - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit attribute",
};

export default async function EditAttributePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const item = await getAttributeById(id);
	if (!item) notFound();

	return (
		<>
			<Breadcrumb pageTitle="Edit Attribute" />
			<AttributeForm
				mode="edit"
				editId={id}
				initial={{
					name: item.name,
					name_en: item.name_en,
					data_type: item.data_type,
				}}
			/>
		</>
	);
}
