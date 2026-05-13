import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import QuoteRequestListContainer from "@/components/Admin/QuoteRequest";
import { getQuoteRequests } from "@/actions/quoteRequest";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Quote Requests - ${process.env.SITE_NAME}`,
	description: "Manage quote requests",
};

export default async function QuoteRequestsPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const { search } = await searchParams;
	const quotes = await getQuoteRequests(search);

	return (
		<>
			<Breadcrumb pageTitle='Quote Requests' />
			<QuoteRequestListContainer
				quotes={quotes}
				initialSearch={search ?? ""}
			/>
		</>
	);
}
