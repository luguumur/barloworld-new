"use client";
import { useEffect, useRef } from "react";
import { markAsRead } from "@/actions/notification";
import { NotificationRow } from "@/actions/notification";
import { useRouter } from "next/navigation";

type Props = {
	notification: NotificationRow | null;
	onClose: () => void;
};

export default function NotificationDetailDrawer({ notification, onClose }: Props) {
	const router = useRouter();
	const drawerRef = useRef<HTMLDivElement>(null);
	const open = !!notification;

	// mark as read when opened
	useEffect(() => {
		if (notification && !notification.isRead) {
			markAsRead(notification.id).then(() => router.refresh());
		}
	}, [notification?.id]);

	// close on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
				onClose();
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, onClose]);

	// close on Escape
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [onClose]);

	return (
		<div
			className={`fixed inset-0 z-99999 flex justify-end transition-all duration-300 ${
				open ? "visible" : "invisible"
			}`}
		>
			{/* backdrop */}
			<div
				className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
					open ? "opacity-100" : "opacity-0"
				}`}
			/>

			{/* drawer */}
			<div
				ref={drawerRef}
				className={`relative flex h-full w-full max-w-[480px] flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-dark ${
					open ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* header */}
				<div className='flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-stroke-dark'>
					<div className='flex items-center gap-3'>
						<h2 className='font-satoshi text-lg font-semibold text-dark dark:text-white'>
							Notification Detail
						</h2>
						{notification && !notification.isRead && (
							<span className='rounded-full bg-primary px-2 py-0.5 text-xs text-white'>
								New
							</span>
						)}
					</div>
					<button
						onClick={onClose}
						className='flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-2 dark:hover:bg-white/10'
					>
						<svg width='16' height='16' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M11.0082 10.5L14.7915 6.71666C15.0665 6.44166 15.0665 5.98333 14.7915 5.70833C14.5165 5.43333 14.0582 5.43333 13.7832 5.70833L9.99987 9.49166L6.21654 5.70833C5.9332 5.43333 5.47487 5.43333 5.2082 5.70833C4.9332 5.98333 4.9332 6.44166 5.2082 6.71666L8.99154 10.5L5.2082 14.2833C4.9332 14.5583 4.9332 15.0167 5.2082 15.2917C5.4832 15.5667 5.94154 15.5667 6.21654 15.2917L9.99987 11.5083L13.7832 15.2917C14.0582 15.5667 14.5165 15.5667 14.7915 15.2917C15.0665 15.0167 15.0665 14.5583 14.7915 14.2833L11.0082 10.5Z'
							/>
						</svg>
					</button>
				</div>

				{/* body */}
				<div className='flex-1 overflow-y-auto px-6 py-6'>
					{notification && (
						<>
							<h3 className='mb-4 font-satoshi text-xl font-bold text-dark dark:text-white'>
								{notification.title}
							</h3>

							{/* sender info */}
							<div className='mb-6 rounded-lg border border-stroke bg-gray-1 p-4 dark:border-stroke-dark dark:bg-white/5'>
								<p className='mb-2 text-xs font-medium uppercase tracking-wider text-body dark:text-gray-5'>
									From
								</p>
								{notification.senderName && (
									<p className='font-medium text-dark dark:text-white'>
										{notification.senderName}
									</p>
								)}
								{notification.senderEmail && (
									<a
										href={`mailto:${notification.senderEmail}`}
										className='text-sm text-primary hover:underline'
									>
										{notification.senderEmail}
									</a>
								)}
								{notification.senderPhone && (
									<p className='mt-1 text-sm text-body dark:text-gray-5'>
										<a href={`tel:${notification.senderPhone}`} className='hover:underline'>
											{notification.senderPhone}
										</a>
									</p>
								)}
								{!notification.senderName && !notification.senderEmail && !notification.senderPhone && (
									<p className='text-sm text-body dark:text-gray-5'>Anonymous</p>
								)}
							</div>

							{/* message */}
							<div className='mb-6'>
								<p className='mb-2 text-xs font-medium uppercase tracking-wider text-body dark:text-gray-5'>
									Message
								</p>
								<p className='whitespace-pre-wrap text-sm leading-relaxed text-dark dark:text-white'>
									{notification.message}
								</p>
							</div>

							{/* meta */}
							<p className='text-xs text-body dark:text-gray-5'>
								Received:{" "}
								{new Date(notification.createdAt).toLocaleString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</>
					)}
				</div>

				{/* footer */}
				{notification?.senderEmail && (
					<div className='border-t border-stroke px-6 py-4 dark:border-stroke-dark'>
						<a
							href={`mailto:${notification.senderEmail}`}
							className='flex h-11 w-full items-center justify-center rounded-lg bg-primary font-medium text-white hover:bg-primary-dark'
						>
							Reply via Email
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
