"use client";
import ProductCategoryEmptyState from "./ProductCategoryEmptyState";
import ProductCategoryListTable from "./ProductCategoryListTable";
import ProductCategoryTopbar from "./ProductCategoryTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Item = {
	id: string;
	name: string;
	name_en: string;
	types: string;
	img_path: string | null;
	createdAt: Date;
};
type TypeOption = { id: string; name: string };

export default function ProductCategoryListContainer({
	items,
	productTypes,
	initialSearch = "",
	initialType = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	items: Item[];
	productTypes: TypeOption[];
	initialSearch?: string;
	initialType?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<ProductCategoryTopbar
					initialSearch={initialSearch}
					initialType={initialType}
					productTypes={productTypes}
				/>
			</div>
			{items?.length ? (
				<>
					<ProductCategoryListTable items={items} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='categories'
					/>
				</>
			) : (
				<ProductCategoryEmptyState />
			)}
		</>
	);
}
