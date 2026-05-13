"use client";
import ContactRequestEmptyState from "./ContactRequestEmptyState";
import ContactRequestListTable from "./ContactRequestListTable";
import ContactRequestTopbar from "./ContactRequestTopbar";
import { ContactRequestRow } from "@/actions/contactRequest";

export default function ContactRequestListContainer({
	contacts,
	initialSearch = "",
}: {
	contacts: ContactRequestRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<ContactRequestTopbar initialSearch={initialSearch} />
			</div>
			{contacts?.length ? (
				<ContactRequestListTable contacts={contacts} />
			) : (
				<ContactRequestEmptyState />
			)}
		</>
	);
}
