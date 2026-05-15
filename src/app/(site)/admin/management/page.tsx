import ManagementListContainer from "@/components/Admin/Management";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getManagements } from "@/actions/management";
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
	title: `Management - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage management (name, position, image, order)",
};

export const revalidate = 0;

export default async function ManagementPage({
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
	const { items: managements, total } = await getManagements({
		search,
		page,
		pageSize,
	});
	const totalPages = Math.ceil(total / pageSize);

	return (
		<>
			<Breadcrumb pageTitle='Management' />
			<Suspense
				fallback={
					<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
						Loading…
					</div>
				}
			>
				<ManagementListContainer
					managements={managements}
					initialSearch={search ?? ""}
					page={page}
					totalPages={totalPages}
					total={total}
				/>
			</Suspense>
		</>
	);
}
