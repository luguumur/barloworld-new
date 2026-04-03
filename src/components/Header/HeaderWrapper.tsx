"use client";
import Header from ".";
import { usePathname } from "next/navigation";
import { Menu } from "@/types/menu";

type MenuItemPublic = {
	id: number;
	title: string;
	path?: string;
	newTab?: boolean;
	submenu?: { id: number; title: string; path: string; newTab?: boolean }[];
};

export const HeaderWrapper = ({ menu }: { menu?: MenuItemPublic[] }) => {
	const pathname = usePathname();

	return (
		<>
			{!pathname.startsWith("/admin") && !pathname.startsWith("/user") && (
				<Header menu={menu as Menu[] | undefined} />
			)}
		</>
	);
};
