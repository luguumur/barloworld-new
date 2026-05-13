"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateContactRequestStatus, ContactRequestRow } from "@/actions/contactRequest";

type Props = {
	contact: ContactRequestRow | null;
	onClose: () => void;
};

export default function ContactRequestDetailDrawer({ contact, onClose }: Props) {
	const router = useRouter();
	const drawerRef = useRef<HTMLDivElement>(null);
	const open = !!contact;

	// auto-mark as READ when opened
	const contactId = contact?.id;
	const status = contact?.status;
	useEffect(() => {
		if (contactId && status === "NEW") {
			updateContactRequestStatus(contactId, "READ").then(() => router.refresh());
		}
	}, [contactId, status, router]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
				onClose();
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, onClose]);

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
			<div
				className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
					open ? "opacity-100" : "opacity-0"
				}`}
			/>

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
							Contact Request
						</h2>
						{contact?.status === "NEW" && (
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
								d='M11.008 10.5l3.784-3.784c.275-.275.275-.733 0-1.008-.275-.275-.733-.275-1.008 0L10 9.492 6.216 5.708c-.275-.275-.733-.275-1.008 0-.275.275-.275.733 0 1.008L8.992 10.5 5.208 14.284c-.275.275-.275.733 0 1.008.275.275.733.275 1.008 0L10 11.508l3.784 3.784c.275.275.733.275 1.008 0 .275-.275.275-.733 0-1.008L11.008 10.5z'
							/>
						</svg>
					</button>
				</div>

				{/* body */}
				<div className='flex-1 overflow-y-auto px-6 py-6'>
					{contact && (
						<>
							{contact.subject && (
								<h3 className='mb-4 font-satoshi text-xl font-bold text-dark dark:text-white'>
									{contact.subject}
								</h3>
							)}

							{/* sender info */}
							<div className='mb-6 rounded-lg border border-stroke bg-gray-1 p-4 dark:border-stroke-dark dark:bg-white/5'>
								<p className='mb-2 text-xs font-medium uppercase tracking-wider text-body dark:text-gray-5'>
									From
								</p>
								<p className='font-medium text-dark dark:text-white'>
									{contact.name}
								</p>
								<a
									href={`mailto:${contact.email}`}
									className='text-sm text-primary hover:underline'
								>
									{contact.email}
								</a>
								<p className='mt-1 text-sm text-body dark:text-gray-5'>
									<a href={`tel:${contact.phoneNumber}`} className='hover:underline'>
										{contact.phoneNumber}
									</a>
								</p>
							</div>

							{/* message */}
							{contact.message && (
								<div className='mb-6'>
									<p className='mb-2 text-xs font-medium uppercase tracking-wider text-body dark:text-gray-5'>
										Message
									</p>
									<p className='whitespace-pre-wrap text-sm leading-relaxed text-dark dark:text-white'>
										{contact.message}
									</p>
								</div>
							)}

							<p className='text-xs text-body dark:text-gray-5'>
								Received:{" "}
								{new Date(contact.createdAt).toLocaleString("en-US", {
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
				{contact?.email && (
					<div className='border-t border-stroke px-6 py-4 dark:border-stroke-dark'>
						<a
							href={`mailto:${contact.email}`}
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
