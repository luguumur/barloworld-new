import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import PageForm from "@/components/Admin/Page/PageForm";
import { getPageById } from "@/actions/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Page - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit custom page",
};

export default async function EditPagePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const page = await getPageById(id);
	if (!page) notFound();

	const initial = {
		slug: page.slug,
		title: page.title,
		title_en: page.title_en,
		description: page.description ?? "",
		description_en: page.description_en ?? "",
		content: page.content,
		content_en: page.content_en,
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Page" />
			<PageForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
