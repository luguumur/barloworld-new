"use client";
import AttributeEmptyState from "./AttributeEmptyState";
import AttributeListTable from "./AttributeListTable";
import AttributeTopbar from "./AttributeTopbar";

type Item = { id: string; name: string; name_en: string; data_type: string; createdAt: Date };

export default function AttributeListContainer({
	items,
	initialSearch = "",
}: {
	items: Item[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<AttributeTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<AttributeListTable items={items} />
			) : (
				<AttributeEmptyState />
			)}
		</>
	);
}
