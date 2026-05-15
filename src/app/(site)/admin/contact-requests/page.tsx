import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import ContactRequestListContainer from "@/components/Admin/ContactRequest";
import { getContactRequests } from "@/actions/contactRequest";
import { cookies } from "next/headers";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Contact Requests - ${process.env.SITE_NAME}`,
	description: "Manage contact requests",
};

export default async function ContactRequestsPage({
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
	const { items: contacts, total } = await getContactRequests({
		search,
		page,
		pageSize,
	});
	const totalPages = Math.ceil(total / pageSize);

	return (
		<>
			<Breadcrumb pageTitle='Contact Requests' />
			<ContactRequestListContainer
				contacts={contacts}
				initialSearch={search ?? ""}
				page={page}
				totalPages={totalPages}
				total={total}
			/>
		</>
	);
}
