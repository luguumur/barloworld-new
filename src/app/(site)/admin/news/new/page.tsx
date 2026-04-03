import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import NewsForm from "@/components/Admin/News/NewsForm";
import { getNewsCategories } from "@/actions/newsCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New News - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new news article",
};

export default async function NewNewsPage() {
	const categories = await getNewsCategories();
	const categoryOptions = categories.map((c) => ({
		id: c.id,
		name: c.name,
		name_en: c.name_en,
	}));

	return (
		<>
			<Breadcrumb pageTitle="New News" />
			<NewsForm mode="create" categories={categoryOptions} />
		</>
	);
}
