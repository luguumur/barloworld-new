"use client";
import MenuEmptyState from "./MenuEmptyState";
import MenuListTable from "./MenuListTable";
import MenuTopbar from "./MenuTopbar";

type MenuItem = {
	id: string;
	title: string;
	title_en: string | null;
	path: string;
	linkType: string;
	parentId: string | null;
	order: number;
	newTab: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export default function MenuListContainer({ items }: { items: MenuItem[] }) {
	return (
		<>
			<div className="mb-5">
				<MenuTopbar />
			</div>
			{items?.length ? (
				<MenuListTable items={items} />
			) : (
				<MenuEmptyState />
			)}
		</>
	);
}
