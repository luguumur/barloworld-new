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
						<span className='absolute left-4.5 top-1/2 -translate-y-1/2 text-dark dark:text-white'>
							<svg
								width='18'
								height='18'
								viewBox='0 0 18 18'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g clipPath='url(#clip0_notif_search)'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z'
										fill='currentColor'
									/>
								</g>
								<defs>
									<clipPath id='clip0_notif_search'>
										<rect width='18' height='18' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
