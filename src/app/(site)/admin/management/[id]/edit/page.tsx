import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ManagementForm from "@/components/Admin/Management/ManagementForm";
import { getManagementById } from "@/actions/management";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Management - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit management entry",
};

export default async function EditManagementPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const management = await getManagementById(id);
	if (!management) notFound();

	const initial = {
		name: management.name,
		position: management.position,
		image: management.image ?? "",
		order: management.order,
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Management" />
			<ManagementForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
