"use client";
import ProductTypeEmptyState from "./ProductTypeEmptyState";
import ProductTypeListTable from "./ProductTypeListTable";
import ProductTypeTopbar from "./ProductTypeTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Item = {
	id: string;
	name: string;
	name_en: string;
	img_path?: string | null;
	createdAt: Date;
};

export default function ProductTypeListContainer({
	items,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	items: Item[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<ProductTypeTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<>
					<ProductTypeListTable items={items} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='product types'
					/>
				</>
			) : (
				<ProductTypeEmptyState />
			)}
		</>
	);
}
