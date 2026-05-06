"use client";

import { Menu } from "@/types/menu";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Dropdown = ({
	stickyMenu,
	item,
	setNavbarOpen,
}: {
	stickyMenu: boolean;
	item: Menu;
	setNavbarOpen: (open: boolean) => void;
}) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const isActive = item.submenu?.some((s) => s.path === pathname);

	return (
		<li className='group relative z-[9999] xl:py-5'>
			{/* ── Trigger ── */}

			<button
				onClick={() => setOpen(!open)}
				className={`flex items-center rounded-md px-[14px] py-[5px] font-noto text-sm
			font-medium text-[#2c2c2c] transition hover:bg-primary/5
			hover:text-primary dark:text-gray-5 dark:hover:text-white ${
				isActive
					? "bg-primary/10 text-primary"
					: "text-[#2c2c2c] hover:bg-primary/5 hover:text-primary dark:text-gray-5 dark:hover:text-white"
			}`}
			>
				{item.title}

				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					role='button'
					aria-expanded='true'
					height='16'
					fill='currentColor'
					className={`ml-1.5 shrink-0 self-center transition-transform duration-200 ${
						open ? "rotate-180" : ""
					} xl:group-hover:translate-y-[2px] xl:group-hover:rotate-180`}
					viewBox='0 0 9 9'
				>
					<path d='m4.6725 6.635-2.655-2.667a.445.445 0 0 1 -.123-.304.4331.4331 0 0 1 .427-.439h.006a.447.447 0 0 1 .316.135l2.357 2.365 2.356-2.365a.458.458 0 0 1 .316-.135.433.433 0 0 1 .433.433v.006a.4189.4189 0 0 1 -.123.3l-2.655 2.671a.4451.4451 0 0 1 -.327.14.464.464 0 0 1 -.328-.14z'></path>
				</svg>
			</button>
			{/* ── Mobile panel (state-driven, smooth expand) ── */}
			<div
				className={`overflow-hidden transition-all duration-200 ease-in-out xl:hidden ${
					open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<ul className='ml-4 mt-1 space-y-0.5 border-l-2 border-primary/40 pb-2 pl-3'>
					{item.submenu?.map((sub, i) => (
						<li key={i}>
							<Link
								href={sub.path}
								target={sub.newTab ? "_blank" : undefined}
								rel={sub.newTab ? "noopener noreferrer" : undefined}
								onClick={() => {
									setOpen(false);
									setNavbarOpen(false);
								}}
								className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
									pathname === sub.path
										? "bg-primary/10 font-semibold text-primary"
										: "text-dark hover:bg-primary/5 hover:text-primary dark:text-gray-5 dark:hover:text-white"
								}`}
							>
								<span
									className={`h-1.5 w-1.5 shrink-0 rounded-full ${
										pathname === sub.path ? "bg-primary" : "bg-gray-4"
									}`}
								/>
								{sub.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			{/* ── Desktop panel (CSS group-hover via .dropdown class) ── */}
			<ul
				className={`dropdown z-[9999] ${stickyMenu ? "xl:translate-y-6" : ""}`}
			>
				{/* Yellow accent bar */}
				<li
					className='mb-1.5 h-0.5 w-full rounded-full bg-primary'
					aria-hidden
				/>

				{item.submenu?.map((sub, i) => (
					<li key={i}>
						<Link
							href={sub.path}
							target={sub.newTab ? "_blank" : undefined}
							rel={sub.newTab ? "noopener noreferrer" : undefined}
							onClick={() => {
								setOpen(false);
								setNavbarOpen(false);
							}}
							className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
								pathname === sub.path
									? "bg-primary text-white"
									: "text-dark hover:bg-primary/10 hover:text-primary dark:text-gray-5 dark:hover:bg-dark-2 dark:hover:text-white"
							}`}
						>
							<span
								className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
									pathname === sub.path ? "bg-white" : "bg-primary/50"
								}`}
							/>
							{sub.title}
						</Link>
					</li>
				))}
			</ul>
		</li>
	);
};

export default Dropdown;
