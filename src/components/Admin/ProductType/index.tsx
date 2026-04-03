"use client";
import ProductTypeEmptyState from "./ProductTypeEmptyState";
import ProductTypeListTable from "./ProductTypeListTable";
import ProductTypeTopbar from "./ProductTypeTopbar";

type Item = { id: string; name: string; name_en: string; createdAt: Date };

export default function ProductTypeListContainer({
	items,
	initialSearch = "",
}: {
	items: Item[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<ProductTypeTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<ProductTypeListTable items={items} />
			) : (
				<ProductTypeEmptyState />
			)}
		</>
	);
}
