"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuItemAction from "./MenuItemAction";
import { reorderMenuItems } from "@/actions/menu";
import toast from "react-hot-toast";

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

export default function MenuListTable({ items: initialItems }: { items: MenuItem[] }) {
	const router = useRouter();
	const [items, setItems] = useState<MenuItem[]>(initialItems);
	const [draggedId, setDraggedId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setItems(initialItems);
	}, [initialItems]);

	const handleDragStart = useCallback((e: React.DragEvent<HTMLTableRowElement>, id: string) => {
		setDraggedId(id);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", id);
		e.dataTransfer.setData("application/json", JSON.stringify({ id }));
		if (e.currentTarget) {
			e.currentTarget.classList.add("opacity-50");
		}
	}, []);

	const handleDragEnd = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
		setDraggedId(null);
		e.currentTarget?.classList.remove("opacity-50");
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}, []);

	const handleDrop = useCallback(
		async (e: React.DragEvent<HTMLTableRowElement>, targetId: string) => {
			e.preventDefault();
			const sourceId = e.dataTransfer.getData("text/plain");
			if (!sourceId || sourceId === targetId) return;
			const sourceIndex = items.findIndex((i) => i.id === sourceId);
			const targetIndex = items.findIndex((i) => i.id === targetId);
			if (sourceIndex === -1 || targetIndex === -1) return;
			const next = [...items];
			const [removed] = next.splice(sourceIndex, 1);
			next.splice(targetIndex, 0, removed);
			setItems(next);
			setDraggedId(null);
			(e.target as HTMLElement).closest("tr")?.classList.remove("ring-2", "ring-primary");
			const orderedIds = next.map((i) => i.id);
			setSaving(true);
			try {
				await reorderMenuItems(orderedIds);
				toast.success("Order saved");
				router.refresh();
			} catch {
				toast.error("Failed to save order");
				setItems(initialItems);
			} finally {
				setSaving(false);
			}
		},
		[items, initialItems, router]
	);

	const handleDragEnter = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
		e.preventDefault();
		if (draggedId && e.currentTarget.dataset.id !== draggedId) {
			e.currentTarget.classList.add("ring-2", "ring-primary");
		}
	}, [draggedId]);

	const handleDragLeave = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
		e.currentTarget.classList.remove("ring-2", "ring-primary");
	}, []);

	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			{saving && (
				<div className="flex items-center justify-center gap-2 border-b border-stroke py-2 text-sm text-body dark:border-stroke-dark dark:text-gray-5">
					Saving order…
				</div>
			)}
			<table className="w-full">
				<thead>
					<tr className="hidden border-b border-stroke dark:border-stroke-dark lsm:table-row">
						<th className="w-10 min-w-[40px] px-2 py-5 sm:pl-4" aria-label="Drag" />
						<th className="min-w-[80px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-2">
							Order
						</th>
						<th className="min-w-[140px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Title
						</th>
						<th className="min-w-[120px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Type
						</th>
						<th className="min-w-[160px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Path / URL
						</th>
						<th className="hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr
							key={item.id}
							data-id={item.id}
							draggable
							onDragStart={(e) => handleDragStart(e, item.id)}
							onDragEnd={handleDragEnd}
							onDragOver={handleDragOver}
							onDrop={(e) => handleDrop(e, item.id)}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
							className="border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark [&:has(.drag-handle:hover)]:bg-gray-1/50 dark:[&:has(.drag-handle:hover)]:bg-white/5"
						>
							<td className="cursor-grab active:cursor-grabbing p-2 pl-4 sm:pl-4" title="Drag to reorder">
								<span className="drag-handle inline-flex touch-none flex-col gap-0.5 text-body dark:text-gray-5">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
										<circle cx="9" cy="6" r="1.5" />
										<circle cx="15" cy="6" r="1.5" />
										<circle cx="9" cy="12" r="1.5" />
										<circle cx="15" cy="12" r="1.5" />
										<circle cx="9" cy="18" r="1.5" />
										<circle cx="15" cy="18" r="1.5" />
									</svg>
								</span>
							</td>
							<td className="p-4 text-left sm:pl-2">
								<span className="font-medium text-body dark:text-gray-5">{index + 1}</span>
								<span className="block lsm:hidden">
									<MenuItemAction item={item} />
								</span>
							</td>
							<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
								<span className="line-clamp-2">{item.title_en ?? item.title}</span>
							</td>
							<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
								{item.linkType === "PAGE" ? "Page" : "URL"}
							</td>
							<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
								{item.linkType === "PAGE" ? (
									<Link
										href={`/${item.path}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline dark:text-primary"
									>
										/{item.path}
									</Link>
								) : (
									<a
										href={item.path}
										target="_blank"
										rel="noopener noreferrer"
										className="max-w-[200px] truncate block text-primary hover:underline dark:text-primary"
									>
										{item.path}
									</a>
								)}
							</td>
							<td className="hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
								<MenuItemAction item={item} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
