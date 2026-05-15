"use client";
import TeamEmptyState from "./TeamEmptyState";
import TeamListTable from "./TeamListTable";
import TeamTopbar from "./TeamTopbar";
import { TeamRow } from "@/actions/team";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

export default function TeamListContainer({
	teams,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	teams: TeamRow[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<TeamTopbar initialSearch={initialSearch} />
			</div>
			{teams?.length ? (
				<>
					<TeamListTable teams={teams} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='team members'
					/>
				</>
			) : (
				<TeamEmptyState />
			)}
		</>
	);
}
