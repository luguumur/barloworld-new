"use client";
import MagazineEmptyState from "./MagazineEmptyState";
import MagazineListTable from "./MagazineListTable";
import MagazineTopbar from "./MagazineTopbar";
import { MagazineRow } from "@/actions/magazine";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

export default function MagazineListContainer({
	magazines,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	magazines: MagazineRow[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<MagazineTopbar initialSearch={initialSearch} />
			</div>
			{magazines?.length ? (
				<>
					<MagazineListTable magazines={magazines} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='magazines'
					/>
				</>
			) : (
				<MagazineEmptyState />
			)}
		</>
	);
}
