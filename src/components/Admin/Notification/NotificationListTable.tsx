"use client";
import { useState } from "react";
import NotificationAction from "./NotificationAction";
import NotificationDetailDrawer from "./NotificationDetailDrawer";
import { NotificationRow } from "@/actions/notification";

function timeAgo(date: Date): string {
	const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
}

export default function NotificationListTable({
	notifications,
}: {
	notifications: NotificationRow[];
}) {
	const [selected, setSelected] = useState<NotificationRow | null>(null);

	return (
		<>
			<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
				<table className='w-full'>
					<thead>
						<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
							<th className='w-6 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5' />
							<th className='min-w-[200px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
								Subject
							</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell'>
								Sender
							</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
								Received
							</th>
							<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{notifications.map((n) => (
							<tr
								key={n.id}
								onClick={() => setSelected(n)}
								className={`cursor-pointer border-b border-stroke transition-colors last-of-type:border-b-0 hover:bg-gray-1 dark:border-stroke-dark dark:hover:bg-white/5 ${
									!n.isRead ? "bg-primary/5 dark:bg-primary/10" : ""
								}`}
							>
								<td className='p-4 pl-4 sm:pl-7.5'>
									{!n.isRead && (
										<span className='block h-2.5 w-2.5 rounded-full bg-primary' />
									)}
								</td>
								<td className='p-4 text-left'>
									<p className='line-clamp-1 font-medium text-dark dark:text-white'>
										{n.title}
									</p>
									<p className='mt-0.5 line-clamp-2 text-sm text-body dark:text-gray-5'>
										{n.message}
									</p>
									<span className='block text-sm text-body/70 xl:hidden'>
										{n.senderName || n.senderEmail || "—"}
									</span>
									<span
										className='block text-sm text-body/70 md:hidden'
										suppressHydrationWarning
									>
										{timeAgo(n.createdAt)}
									</span>
									<span className='block lsm:hidden'>
										<NotificationAction notification={n} />
									</span>
								</td>
								<td className='hidden max-w-[180px] p-4 text-left text-sm text-body dark:text-gray-5 xl:table-cell'>
									<p className='truncate'>{n.senderName || "—"}</p>
									<p className='truncate text-xs'>{n.senderEmail || ""}</p>
									<p className='truncate text-xs'>{n.senderPhone || ""}</p>
								</td>
								<td
									className='hidden whitespace-nowrap p-4 text-left text-sm text-body dark:text-gray-5 md:table-cell'
									suppressHydrationWarning
								>
									{timeAgo(n.createdAt)}
								</td>
								<td
									className='hidden p-4 text-right lsm:table-cell sm:pr-7.5'
									onClick={(e) => e.stopPropagation()}
								>
									<NotificationAction notification={n} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<NotificationDetailDrawer
				notification={selected}
				onClose={() => setSelected(null)}
			/>
		</>
	);
}
