"use client";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Sidebar from "@/components/Common/Dashboard/Sidebar";
import Header from "@/components/Common/Dashboard/Header";
import {
	adminSidebarData,
	adminSidebarOtherData,
} from "@/staticData/sidebarData";

export default function AdminLayoutClient({
	children,
	allowedPaths,
}: {
	children: React.ReactNode;
	allowedPaths: string[] | null; // null = full access (ADMIN)
}) {
	const [openSidebar, setOpenSidebar] = useState(false);

	const filterItems = (items: typeof adminSidebarData) => {
		if (allowedPaths === null) return items;
		return items.filter(
			(item) =>
				item.path === "/admin" ||
				item.path === "/admin/account-settings" ||
				allowedPaths.some(
					(p) => item.path === p || item.path?.startsWith(p + "/")
				)
		);
	};

	const visibleMain = filterItems(adminSidebarData);
	const visibleOthers = filterItems(adminSidebarOtherData);

	return (
		<main className='min-h-screen bg-gray-2 font-inter dark:bg-[#151F34] [&_.font-satoshi]:font-inter'>
			<aside
				className={`fixed left-0 top-0 z-[999] h-screen w-[290px] overflow-y-auto bg-white duration-300 dark:bg-gray-dark ${
					openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<Sidebar sidebarData={visibleMain} sidebarOthersData={visibleOthers} />
			</aside>
			<div
				onClick={() => setOpenSidebar(false)}
				className={`fixed inset-0 z-[99] h-screen w-full bg-dark/80 lg:hidden ${
					openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			/>
			<section className='lg:ml-[290px]'>
				<Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
				<div className='p-5 pt-12 md:p-10'>{children}</div>
			</section>
		</main>
	);
}
