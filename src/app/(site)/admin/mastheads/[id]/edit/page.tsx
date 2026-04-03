import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MastheadForm from "@/components/Admin/Masthead/MastheadForm";
import { getMastheadById } from "@/actions/masthead";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Masthead - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit masthead",
};

export default async function EditMastheadPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const masthead = await getMastheadById(id);
	if (!masthead) notFound();

	const initial = {
		title: masthead.title,
		title_en: masthead.title_en,
		subtitle: masthead.subtitle ?? "",
		subtitle_en: masthead.subtitle_en ?? "",
		description: masthead.description,
		description_en: masthead.description_en,
		url: masthead.url ?? "",
		imageurl: masthead.imageurl ?? "",
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Masthead" />
			<MastheadForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
