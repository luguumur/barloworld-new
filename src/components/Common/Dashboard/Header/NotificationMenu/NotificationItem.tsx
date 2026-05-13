import Link from "next/link";

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

type Props = {
	link: string;
	title: string;
	message: string;
	isRead: boolean;
	createdAt: Date;
};

export default function NotificationItem({
	link,
	title,
	message,
	isRead,
	createdAt,
}: Props) {
	return (
		<Link
			href={link}
			className={`mb-3 flex cursor-pointer gap-3 rounded-md px-2 py-2 hover:bg-gray dark:hover:bg-dark ${
				isRead
					? "bg-white dark:bg-gray-dark"
					: "bg-primary/5 dark:bg-primary/10"
			}`}
		>
			<div className='hidden h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-primary text-white md:flex'>
				<svg
					width='18'
					height='18'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M6.95983 16.8682C7.66073 17.7592 8.76182 18.3333 10 18.3333C11.2382 18.3333 12.3393 17.7592 13.0402 16.8682C11.022 17.1417 8.97798 17.1417 6.95983 16.8682Z'
						fill='currentColor'
					/>
					<path
						d='M15.6243 7.5V8.08675C15.6243 8.79091 15.8252 9.47931 16.2018 10.0652L17.1247 11.501C17.9676 12.8124 17.3241 14.5949 15.858 15.0096C12.0227 16.0945 7.97728 16.0945 4.14197 15.0096C2.67587 14.5949 2.03235 12.8124 2.8753 11.501L3.79816 10.0652C4.17476 9.47931 4.37573 8.79091 4.37573 8.08675V7.5C4.37573 4.27834 6.8938 1.66667 10 1.66667C13.1062 1.66667 15.6243 4.27834 15.6243 7.5Z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<div className='flex-1 overflow-hidden'>
				<p
					className={`line-clamp-1 font-satoshi text-sm text-dark dark:text-white ${
						!isRead ? "font-semibold" : ""
					}`}
				>
					{title}
				</p>
				<p className='line-clamp-1 text-xs text-body dark:text-gray-4'>
					{message}
				</p>
				<span
					className='text-xs font-medium text-body dark:text-gray-4'
					suppressHydrationWarning
				>
					{timeAgo(createdAt)}
				</span>
			</div>
			{!isRead && (
				<span className='mt-1 h-2 w-2 shrink-0 rounded-full bg-primary' />
			)}
		</Link>
	);
}
