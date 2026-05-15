"use client";
import AttributeEmptyState from "./AttributeEmptyState";
import AttributeListTable from "./AttributeListTable";
import AttributeTopbar from "./AttributeTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Item = {
	id: string;
	name: string;
	name_en: string;
	data_type: string;
	createdAt: Date;
};

export default function AttributeListContainer({
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
				<AttributeTopbar initialSearch={initialSearch} />
			</div>
			{items?.length ? (
				<>
					<AttributeListTable items={items} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='attributes'
					/>
				</>
			) : (
				<AttributeEmptyState />
			)}
		</>
	);
}
