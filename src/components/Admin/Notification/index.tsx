"use client";
import NotificationEmptyState from "./NotificationEmptyState";
import NotificationListTable from "./NotificationListTable";
import NotificationTopbar from "./NotificationTopbar";
import { NotificationRow } from "@/actions/notification";

export default function NotificationListContainer({
	notifications,
	initialSearch = "",
}: {
	notifications: NotificationRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<NotificationTopbar initialSearch={initialSearch} />
			</div>
			{notifications?.length ? (
				<NotificationListTable notifications={notifications} />
			) : (
				<NotificationEmptyState />
			)}
		</>
	);
}
