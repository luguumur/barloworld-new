"use client";
import NotificationEmptyState from "./NotificationEmptyState";
import NotificationListTable from "./NotificationListTable";
import NotificationTopbar from "./NotificationTopbar";
import { NotificationRow } from "@/actions/notification";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

export default function NotificationListContainer({
	notifications,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	notifications: NotificationRow[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<NotificationTopbar initialSearch={initialSearch} />
			</div>
			{notifications?.length ? (
				<>
					<NotificationListTable notifications={notifications} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='notifications'
					/>
				</>
			) : (
				<NotificationEmptyState />
			)}
		</>
	);
}
