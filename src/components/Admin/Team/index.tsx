"use client";
import TeamEmptyState from "./TeamEmptyState";
import TeamListTable from "./TeamListTable";
import TeamTopbar from "./TeamTopbar";
import { TeamRow } from "@/actions/team";

export default function TeamListContainer({
	teams,
	initialSearch = "",
}: {
	teams: TeamRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<TeamTopbar initialSearch={initialSearch} />
			</div>
			{teams?.length ? (
				<TeamListTable teams={teams} />
			) : (
				<TeamEmptyState />
			)}
		</>
	);
}
