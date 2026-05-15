"use client";
import AttributeValueGroupEmptyState from "./AttributeValueGroupEmptyState";
import AttributeValueGroupListTable from "./AttributeValueGroupListTable";
import AttributeValueGroupTopbar from "./AttributeValueGroupTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Item = { id: string; name: string; name_en: string; createdAt: Date };

export default function AttributeValueGroupListContainer({
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
				<AttributeValueGroupTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<>
					<AttributeValueGroupListTable items={items} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='value groups'
					/>
				</>
			) : (
				<AttributeValueGroupEmptyState />
			)}
		</>
	);
}
