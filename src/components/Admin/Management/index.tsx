"use client";
import ManagementEmptyState from "./ManagementEmptyState";
import ManagementListTable from "./ManagementListTable";
import ManagementTopbar from "./ManagementTopbar";

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
}: {
	managements: Management[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<ManagementTopbar initialSearch={initialSearch} />
			</div>
			{managements?.length ? (
				<ManagementListTable managements={managements} />
			) : (
				<ManagementEmptyState />
			)}
		</>
	);
}
