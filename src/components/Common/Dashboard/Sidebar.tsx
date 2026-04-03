"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Chevron = ({ open }: { open: boolean }) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		className={`shrink-0 transition-transform duration-200 ${
			open ? "rotate-180" : ""
		}`}
		aria-hidden
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.95339 5.67461C3.1331 5.46495 3.44875 5.44067 3.65841 5.62038L7.99968 9.34147L12.341 5.62038C12.5506 5.44067 12.8663 5.46495 13.046 5.67461C13.2257 5.88428 13.2014 6.19993 12.9917 6.37964L8.32508 10.3796C8.13783 10.5401 7.86153 10.5401 7.67429 10.3796L3.00762 6.37964C2.79796 6.19993 2.77368 5.88428 2.95339 5.67461Z'
			fill='currentColor'
		/>
	</svg>
);

export default function Sidebar({
	sidebarOthersData,
	sidebarData,
	sidebarRef,
}: any) {
	const pathname = usePathname();
	const [openSections, setOpenSections] = useState({
		main: true,
		others: true,
	});

	return (
		<>
			<div
				ref={sidebarRef}
				className='h-full border-r border-stroke px-6 py-6 dark:border-stroke-dark'
			>
				<Link href='/' className='mb-5 inline-block'>
					<Image
						src={"/images/logo/belogo.webp"}
						alt='logo'
						className='block dark:hidden'
						width={193}
						height={34}
					/>
					<Image
						src={"/images/logo/belogo.webp"}
						alt='logo'
						className='hidden dark:block'
						width={293}
						height={34}
					/>
				</Link>
				<div className='mb-6'>
					<div
						className={`grid transition-[grid-template-rows] duration-200 ease-out ${
							openSections.main ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
						}`}
					>
						<ul className='overflow-hidden'>
							{sidebarData &&
								sidebarData?.map((item: any, key: number) => (
									<li
										key={key}
										className='ring-foreground-muted border-default group-hover:border-foreground-muted group flex cursor-pointer items-center space-x-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1'
									>
										<Link
											href={`${item?.path}`}
											className={`flex w-full items-center gap-3 rounded-lg py-1 pr-3 font-satoshi text-sm duration-300 ${
												pathname === `${item.path}`
													? "bg-primary-2 font-semibold text-black dark:bg-white dark:text-white"
													: "font-medium text-dark-5 hover:text-black dark:text-gray-5 dark:hover:bg-white dark:hover:text-white"
											}`}
										>
											<span className='h-5 w-5 shrink-0'>{item?.icon}</span>
											<span className='text-foreground-light group-hover:text-foreground min-w-0 flex-1 truncate text-sm transition'>
												{item?.title}
											</span>
										</Link>
									</li>
								))}
						</ul>
					</div>
					<div
						className={`grid transition-[grid-template-rows] duration-200 ease-out ${
							openSections.others ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
						}`}
					>
						<ul className='space-y-0 overflow-hidden'>
							{sidebarOthersData?.map((item: any) => (
								<li key={item?.id}>
									<Link
										href={`${item?.path}`}
										className={`flex w-full items-center gap-3 rounded-lg py-3 font-satoshi text-sm duration-300 ${
											pathname === `${item.path}`
												? "bg-primary bg-opacity-10 text-primary dark:bg-white dark:bg-opacity-10 dark:text-white"
												: "text-dark hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:text-gray-5 dark:hover:bg-white dark:hover:bg-opacity-10 dark:hover:text-white"
										}`}
									>
										<span className='h-[20px] w-[20px]'>{item?.icon}</span>
										{item?.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
