import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import DealForm from "@/components/Admin/Deal/DealForm";
import { getDealById } from "@/actions/deal";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Deal - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit deal or special",
};

export default async function EditDealPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const deal = await getDealById(id);
	if (!deal) notFound();

	const initial = {
		title: deal.title,
		title_en: deal.title_en,
		subtitle: deal.subtitle ?? "",
		subtitle_en: deal.subtitle_en ?? "",
		description: deal.description,
		description_en: deal.description_en,
		status: deal.status,
		img_path: deal.img_path ?? "",
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Deal" />
			<DealForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
