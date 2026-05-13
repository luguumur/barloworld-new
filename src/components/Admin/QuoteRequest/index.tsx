"use client";
import QuoteRequestEmptyState from "./QuoteRequestEmptyState";
import QuoteRequestListTable from "./QuoteRequestListTable";
import QuoteRequestTopbar from "./QuoteRequestTopbar";
import { QuoteRequestRow } from "@/actions/quoteRequest";

export default function QuoteRequestListContainer({
	quotes,
	initialSearch = "",
}: {
	quotes: QuoteRequestRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<QuoteRequestTopbar initialSearch={initialSearch} />
			</div>
			{quotes?.length ? (
				<QuoteRequestListTable quotes={quotes} />
			) : (
				<QuoteRequestEmptyState />
			)}
		</>
	);
}
