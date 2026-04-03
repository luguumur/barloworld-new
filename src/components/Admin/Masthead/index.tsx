"use client";
import MastheadEmptyState from "./MastheadEmptyState";
import MastheadListTable from "./MastheadListTable";
import MastheadTopbar from "./MastheadTopbar";

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
}: {
	mastheads: Masthead[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<MastheadTopbar initialSearch={initialSearch} />
			</div>
			{mastheads?.length ? (
				<MastheadListTable mastheads={mastheads} />
			) : (
				<MastheadEmptyState />
			)}
		</>
	);
}
