"use client";
import MagazineEmptyState from "./MagazineEmptyState";
import MagazineListTable from "./MagazineListTable";
import MagazineTopbar from "./MagazineTopbar";

type Magazine = {
	id: string;
	title: string;
	title_en: string;
	image: string | null;
	url: string | null;
	date: string | null;
	number: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function MagazineListContainer({
	magazines,
	initialSearch = "",
}: {
	magazines: Magazine[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
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
