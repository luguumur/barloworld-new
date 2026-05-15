"use client";
import QuoteRequestEmptyState from "./QuoteRequestEmptyState";
import QuoteRequestListTable from "./QuoteRequestListTable";
import QuoteRequestTopbar from "./QuoteRequestTopbar";
import { QuoteRequestRow } from "@/actions/quoteRequest";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

export default function QuoteRequestListContainer({
	quotes,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	quotes: QuoteRequestRow[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<QuoteRequestTopbar initialSearch={initialSearch} />
			</div>
			{quotes?.length ? (
				<>
					<QuoteRequestListTable quotes={quotes} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='quote requests'
					/>
				</>
			) : (
				<QuoteRequestEmptyState />
			)}
		</>
	);
}
