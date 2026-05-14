"use client";
import MagazineEmptyState from "./MagazineEmptyState";
import MagazineListTable from "./MagazineListTable";
import MagazineTopbar from "./MagazineTopbar";
import { MagazineRow } from "@/actions/magazine";

export default function MagazineListContainer({
	magazines,
	initialSearch = "",
}: {
	magazines: MagazineRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<MagazineTopbar initialSearch={initialSearch} />
			</div>
			{magazines?.length ? (
				<MagazineListTable magazines={magazines} />
			) : (
				<MagazineEmptyState />
			)}
		</>
	);
}
