"use client";
import AttributeValueGroupEmptyState from "./AttributeValueGroupEmptyState";
import AttributeValueGroupListTable from "./AttributeValueGroupListTable";
import AttributeValueGroupTopbar from "./AttributeValueGroupTopbar";

type Item = { id: string; name: string; name_en: string; createdAt: Date };

export default function AttributeValueGroupListContainer({
	items,
	initialSearch = "",
}: {
	items: Item[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<AttributeValueGroupTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<AttributeValueGroupListTable items={items} />
			) : (
				<AttributeValueGroupEmptyState />
			)}
		</>
	);
}
