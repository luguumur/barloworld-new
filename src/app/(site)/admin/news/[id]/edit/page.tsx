import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import NewsForm from "@/components/Admin/News/NewsForm";
import { getNewsById } from "@/actions/news";
import { getNewsCategories } from "@/actions/newsCategory";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit News - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit news article",
};

export default async function EditNewsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [news, categories] = await Promise.all([
		getNewsById(id),
		getNewsCategories(),
	]);
	if (!news) notFound();

	const categoryOptions = categories.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
	}));

	const initial = {
		title: news.title,
		title_en: news.title_en,
		subtitle: news.subtitle ?? "",
		subtitle_en: news.subtitle_en ?? "",
		thumbnail: news.thumbnail ?? "",
		content: news.content,
		content_en: news.content_en,
		categoryId: news.categoryId,
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit News" />
			<NewsForm
				mode="edit"
				editId={id}
				initial={initial}
				categories={categoryOptions}
			/>
		</>
	);
}
