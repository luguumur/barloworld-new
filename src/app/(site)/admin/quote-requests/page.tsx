import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import QuoteRequestListContainer from "@/components/Admin/QuoteRequest";
import { getQuoteRequests } from "@/actions/quoteRequest";
import { cookies } from "next/headers";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Quote Requests - ${process.env.SITE_NAME}`,
	description: "Manage quote requests",
};

export default async function QuoteRequestsPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string; page?: string }>;
}) {
	const { search, page: pageParam } = await searchParams;
	const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
	const rawSize = parseInt(
		(await cookies()).get(ADMIN_PAGE_SIZE_COOKIE)?.value ?? "",
		10
	);
	const pageSize: PageSizeOption = (
		PAGE_SIZE_OPTIONS as readonly number[]
	).includes(rawSize)
		? (rawSize as PageSizeOption)
		: DEFAULT_PAGE_SIZE;
	const { items: quotes, total } = await getQuoteRequests({
		search,
		page,
		pageSize,
	});
	const totalPages = Math.ceil(total / pageSize);

	return (
		<>
			<Breadcrumb pageTitle='Quote Requests' />
			<QuoteRequestListContainer
				quotes={quotes}
				initialSearch={search ?? ""}
				page={page}
				totalPages={totalPages}
				total={total}
			/>
		</>
	);
}
