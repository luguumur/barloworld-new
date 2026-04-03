"use client";
import PageEmptyState from "./PageEmptyState";
import PageListTable from "./PageListTable";
import PageTopbar from "./PageTopbar";

type Page = {
	id: string;
	slug: string;
	title: string;
	title_en: string;
	description: string | null;
	description_en: string | null;
	content: string;
	content_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function PageListContainer({
	pages,
	initialSearch = "",
}: {
	pages: Page[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<PageTopbar initialSearch={initialSearch} />
			</div>
			{pages?.length ? (
				<PageListTable pages={pages} />
			) : (
				<PageEmptyState />
			)}
		</>
	);
}
