import MastheadListContainer from "@/components/Admin/Masthead";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getMastheads } from "@/actions/masthead";
import { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";

export const metadata: Metadata = {
	title: `Mastheads - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage mastheads",
};

export const revalidate = 0;

export default async function MastheadsPage({
	searchParams,
}: {
	searchParams: { search?: string; page?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
	const rawSize = parseInt(
		(await cookies()).get(ADMIN_PAGE_SIZE_COOKIE)?.value ?? "",
		10
	);
	const pageSize: PageSizeOption = (
		PAGE_SIZE_OPTIONS as readonly number[]
	).includes(rawSize)
		? (rawSize as PageSizeOption)
		: DEFAULT_PAGE_SIZE;
	const { items: mastheads, total } = await getMastheads({
		search,
		page,
		pageSize,
	});
	const totalPages = Math.ceil(total / pageSize);

	return (
		<>
			<Breadcrumb pageTitle='Mastheads' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<MastheadListContainer
					mastheads={mastheads}
					initialSearch={search ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
