"use client";
import DealEmptyState from "./DealEmptyState";
import DealListTable from "./DealListTable";
import DealTopbar from "./DealTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Deal = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	status: string;
	img_path: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function DealListContainer({
	deals,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	deals: Deal[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<DealTopbar initialSearch={initialSearch} />
			</div>
			{deals?.length ? (
				<>
					<DealListTable deals={deals} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='deals'
					/>
				</>
			) : (
				<DealEmptyState />
			)}
		</>
	);
}
