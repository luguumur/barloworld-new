"use client";
import DealEmptyState from "./DealEmptyState";
import DealListTable from "./DealListTable";
import DealTopbar from "./DealTopbar";

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
}: {
	deals: Deal[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<DealTopbar initialSearch={initialSearch} />
			</div>
			{deals?.length ? (
				<DealListTable deals={deals} />
			) : (
				<DealEmptyState />
			)}
		</>
	);
}
