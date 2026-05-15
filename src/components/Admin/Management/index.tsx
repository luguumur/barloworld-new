"use client";
import ManagementEmptyState from "./ManagementEmptyState";
import ManagementListTable from "./ManagementListTable";
import ManagementTopbar from "./ManagementTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Management = {
	id: string;
	name: string;
	position: string;
	image: string | null;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export default function ManagementListContainer({
	managements,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	managements: Management[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<ManagementTopbar initialSearch={initialSearch} />
			</div>
			{managements?.length ? (
				<>
					<ManagementListTable managements={managements} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='managers'
					/>
				</>
			) : (
				<ManagementEmptyState />
			)}
		</>
	);
}
