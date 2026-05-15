"use client";
import MastheadEmptyState from "./MastheadEmptyState";
import MastheadListTable from "./MastheadListTable";
import MastheadTopbar from "./MastheadTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Masthead = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	url: string | null;
	imageurl: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function MastheadListContainer({
	mastheads,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	mastheads: Masthead[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<MastheadTopbar initialSearch={initialSearch} />
			</div>
			{mastheads?.length ? (
				<>
					<MastheadListTable mastheads={mastheads} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='mastheads'
					/>
				</>
			) : (
				<MastheadEmptyState />
			)}
		</>
	);
}
