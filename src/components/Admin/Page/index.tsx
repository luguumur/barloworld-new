"use client";
import PageEmptyState from "./PageEmptyState";
import PageListTable from "./PageListTable";
import PageTopbar from "./PageTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

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
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	pages: Page[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<PageTopbar initialSearch={initialSearch} />
			</div>
			{pages?.length ? (
				<>
					<PageListTable pages={pages} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='pages'
					/>
				</>
			) : (
				<PageEmptyState />
			)}
		</>
	);
}
