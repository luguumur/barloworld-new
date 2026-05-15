"use client";
import ContactRequestEmptyState from "./ContactRequestEmptyState";
import ContactRequestListTable from "./ContactRequestListTable";
import ContactRequestTopbar from "./ContactRequestTopbar";
import { ContactRequestRow } from "@/actions/contactRequest";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

export default function ContactRequestListContainer({
	contacts,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	contacts: ContactRequestRow[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<ContactRequestTopbar initialSearch={initialSearch} />
			</div>
			{contacts?.length ? (
				<>
					<ContactRequestListTable contacts={contacts} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='contact requests'
					/>
				</>
			) : (
				<ContactRequestEmptyState />
			)}
		</>
	);
}
