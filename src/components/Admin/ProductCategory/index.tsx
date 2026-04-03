"use client";
import ProductCategoryEmptyState from "./ProductCategoryEmptyState";
import ProductCategoryListTable from "./ProductCategoryListTable";
import ProductCategoryTopbar from "./ProductCategoryTopbar";

type Item = { id: string; name: string; name_en: string; types: string; img_path: string | null; createdAt: Date };
type TypeOption = { id: string; name: string };

export default function ProductCategoryListContainer({
	items,
	productTypes,
	initialSearch = "",
	initialType = "",
}: {
	items: Item[];
	productTypes: TypeOption[];
	initialSearch?: string;
	initialType?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<ProductCategoryTopbar
					initialSearch={initialSearch}
					initialType={initialType}
					productTypes={productTypes}
				/>
			</div>
			{items?.length ? (
				<ProductCategoryListTable items={items} />
			) : (
				<ProductCategoryEmptyState />
			)}
		</>
	);
}
