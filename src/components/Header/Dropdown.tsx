"use client";

import { Menu } from "@/types/menu";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const TriggerChevron = ({ open }: { open: boolean }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		fill='currentColor'
		className={`ml-1.5 shrink-0 self-center transition-transform duration-200 ${
			open ? "rotate-180" : ""
		} xl:group-hover:translate-y-[2px] xl:group-hover:rotate-180`}
		viewBox='0 0 9 9'
	>
		<path d='m4.6725 6.635-2.655-2.667a.445.445 0 0 1 -.123-.304.4331.4331 0 0 1 .427-.439h.006a.447.447 0 0 1 .316.135l2.357 2.365 2.356-2.365a.458.458 0 0 1 .316-.135.433.433 0 0 1 .433.433v.006a.4189.4189 0 0 1 -.123.3l-2.655 2.671a.4451.4451 0 0 1 -.327.14.464.464 0 0 1 -.328-.14z' />
	</svg>
);

const Dropdown = ({
	item,
	setNavbarOpen,
}: {
	stickyMenu?: boolean;
	item: Menu;
	setNavbarOpen: (open: boolean) => void;
}) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const isActive = item.submenu?.some((s) => s.path === pathname);
	const count = item.submenu?.length ?? 0;
	const cols = count > 8 ? 3 : count > 4 ? 2 : 1;

	const triggerClass = `flex items-center gap-1 rounded-md px-[14px] py-[5px] font-noto text-sm font-medium transition
		${
			isActive
				? "text-primary"
				: "text-[#2c2c2c] hover:text-primary dark:text-gray-5 dark:hover:text-white"
		}`;

	return (
		<li
			className={`group relative z-[9999] after:absolute
			after:bottom-0 after:left-0 after:z-[10000] after:h-[5px] after:w-full after:origin-center after:scale-x-0 after:rounded-t-[4px]
			after:bg-primary after:transition-transform after:duration-200 after:content-[''] xl:py-5
			xl:hover:after:scale-x-100
			${open ? "after:scale-x-100" : ""}
		`}
		>
			{/* ── Trigger ── */}
			{item.path ? (
				<Link
					href={item.path}
					target={item.newTab ? "_blank" : undefined}
					rel={item.newTab ? "noopener noreferrer" : undefined}
					className={triggerClass}
				>
					{item.title}
					<TriggerChevron open={open} />
				</Link>
			) : (
				<button onClick={() => setOpen(!open)} className={triggerClass}>
					{item.title}
					<TriggerChevron open={open} />
				</button>
			)}

			{/* ── Mobile panel ── */}
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

			{/* ── Desktop mega-menu (CSS group-hover) ── */}
			<div
				className='invisible absolute left-0 top-full z-[9999] hidden  opacity-0 shadow-2xl transition-all duration-200 ease-out
					xl:block xl:group-hover:visible xl:group-hover:translate-y-0 xl:group-hover:opacity-100'
				style={{
					minWidth: cols === 3 ? "640px" : cols === 2 ? "480px" : "280px",
				}}
			>
				{/* Links grid */}
				<div
					className={`grid bg-white dark:bg-dark ${
						cols === 3
							? "grid-cols-3"
							: cols === 2
								? "grid-cols-2"
								: "grid-cols-1"
					}`}
				>
					{item.submenu?.map((sub, i) => (
						<Link
							key={i}
							href={sub.path}
							target={sub.newTab ? "_blank" : undefined}
							rel={sub.newTab ? "noopener noreferrer" : undefined}
							onClick={() => {
								setOpen(false);
								setNavbarOpen(false);
							}}
							className={`group/link flex items-center gap-3 border-b border-r border-gray-3 px-5 py-3.5 text-sm font-medium transition-all dark:border-dark-2 ${
								pathname === sub.path
									? "bg-primary/5 text-primary"
									: "text-dark hover:bg-primary/5 hover:text-primary dark:text-gray-5 dark:hover:text-white"
							}`}
						>
							{sub.title}
							<svg
								className='ml-auto h-3 w-3 shrink-0 translate-x-0 opacity-0 transition-all duration-150 group-hover/link:translate-x-0.5 group-hover/link:opacity-100'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								viewBox='0 0 24 24'
							>
								<path
									d='M9 18l6-6-6-6'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Link>
					))}
				</div>
			</div>
		</li>
	);
};

export default Dropdown;
