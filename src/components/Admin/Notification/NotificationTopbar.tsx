"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { markAllAsRead } from "@/actions/notification";
import toast from "react-hot-toast";

export default function NotificationTopbar({
	initialSearch = "",
}: {
	initialSearch?: string;
}) {
	const [search, setSearch] = useState(initialSearch);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleMarkAllRead = async () => {
		setLoading(true);
		try {
			await markAllAsRead();
			toast.success("All notifications marked as read");
			router.refresh();
		} catch {
			toast.error("Failed to mark all as read");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark md:flex'>
			<div className='mb-4 flex flex-wrap items-center gap-3 md:mb-0'>
				<button
					onClick={handleMarkAllRead}
					disabled={loading}
					className='flex h-10 items-center justify-center gap-2 rounded-lg border border-stroke bg-gray px-4 text-sm font-medium text-dark hover:bg-gray/60 disabled:opacity-50 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
				>
					Mark all as read
				</button>
			</div>
			<div className='flex flex-wrap items-center gap-3'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						router.push(
							`/admin/notifications?search=${encodeURIComponent(search)}`
						);
					}}
				>
					<div className='relative'>
						<input
							type='search'
							placeholder='Search notifications'
							className='h-11 w-full rounded-lg border border-stroke bg-gray-1 pl-11 pr-4.5 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:focus:border-transparent'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
