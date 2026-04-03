import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import MagazineForm from "@/components/Admin/Magazine/MagazineForm";
import { getMagazineById } from "@/actions/magazine";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Magazine - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit magazine",
};

export default async function EditMagazinePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const magazine = await getMagazineById(id);
	if (!magazine) notFound();

	const initial = {
		title: magazine.title,
		title_en: magazine.title_en,
		image: magazine.image ?? "",
		url: magazine.url ?? "",
		date: magazine.date ?? "",
		number: magazine.number ?? "",
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Magazine" />
			<MagazineForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
