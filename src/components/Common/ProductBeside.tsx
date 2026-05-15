"use client";
import { usePathname } from "next/navigation";

export type SidebarMenuItem = {
	href: string;
	label: string;
};

export default function ProductBeside({
	title,
	menu,
}: {
	title: string;
	menu: SidebarMenuItem[];
}) {
	const pathname = usePathname();

	return (
		<div className='widget widget-sublist-pages'>
			<h5>{title}</h5>
			<nav className='sublist-pages'>
				<ul className='menu'>
					{menu.map((item) => (
						<li
							key={item.href}
							className={`menu-item menu-item-type-custom menu-item-object-custom ${
								pathname === item.href
									? "current-menu-item page_item current_page_item"
									: ""
							}`}
						>
							<a href={item.href}>{item.label}</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
