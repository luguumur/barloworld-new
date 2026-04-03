"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

export type MenuItemRow = {
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

export type MenuItemInput = {
	title: string;
	title_en?: string | null;
	path: string;
	linkType: "PAGE" | "CUSTOM";
	parentId?: string | null;
	order?: number;
	newTab?: boolean;
};

/** For public header: get menu tree as Menu[] (compatible with Header) */
export async function getMenuForPublic(): Promise<
	{ id: number; title: string; path?: string; newTab?: boolean; submenu?: { id: number; title: string; path: string; newTab?: boolean }[] }[]
> {
	try {
		const delegate = (prisma as { menuItem?: { findMany: (args: unknown) => Promise<unknown[]> } }).menuItem;
		if (!delegate) return [];
		const items = (await delegate.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		})) as MenuItemRow[];
		const byParent = new Map<string | null, MenuItemRow[]>();
		byParent.set(null, []);
		for (const item of items) {
			const list = byParent.get(item.parentId) ?? [];
			list.push(item as MenuItemRow);
			byParent.set(item.parentId, list);
		}
		for (const item of items) {
			if (item.parentId && !byParent.has(item.parentId)) byParent.set(item.parentId, []);
		}
		const toMenu = (row: MenuItemRow, idx: number): { id: number; title: string; path?: string; newTab?: boolean; submenu?: { id: number; title: string; path: string; newTab?: boolean }[] } => {
			const title = (row.title_en ?? row.title).trim() || row.title;
			const href = row.linkType === "PAGE" ? `/${row.path.replace(/^\//, "")}` : row.path;
			const children = (byParent.get(row.id) ?? [])
				.sort((a, b) => a.order - b.order || a.createdAt.getTime() - b.createdAt.getTime())
				.map((c, i) => ({
					id: idx * 1000 + i,
					title: (c.title_en ?? c.title).trim() || c.title,
					path: c.linkType === "PAGE" ? `/${c.path.replace(/^\//, "")}` : c.path,
					newTab: c.newTab,
				}));
			if (children.length > 0) {
				return { id: idx, title, newTab: row.newTab, submenu: children };
			}
			return { id: idx, title, path: href, newTab: row.newTab };
		};
		const roots = (byParent.get(null) ?? []).sort(
			(a, b) => a.order - b.order || a.createdAt.getTime() - b.createdAt.getTime()
		);
		return roots.map((r, i) => toMenu(r, i));
	} catch (e) {
		if (
			(e as Prisma.PrismaClientKnownRequestError)?.code === "P2021" ||
			(String(e).includes("does not exist"))
		) {
			return [];
		}
		throw e;
	}
}

/** Admin: get all menu items (flat, for list) */
export async function getMenuItems() {
	await isAuthorized();
	try {
		return await prisma.menuItem.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		});
	} catch (e) {
		if (
			(e as Prisma.PrismaClientKnownRequestError)?.code === "P2021" ||
			(String(e).includes("does not exist"))
		) {
			return [];
		}
		throw e;
	}
}

/** Admin: get roots for parent selector */
export async function getMenuRoots() {
	await isAuthorized();
	try {
		return await prisma.menuItem.findMany({
			where: { parentId: null },
			orderBy: [{ order: "asc" }],
			select: { id: true, title: true, title_en: true },
		});
	} catch {
		return [];
	}
}

export async function getMenuItemById(id: string) {
	await isAuthorized();
	try {
		return await prisma.menuItem.findUnique({ where: { id } });
	} catch {
		return null;
	}
}

export async function createMenuItem(data: MenuItemInput) {
	await isAuthorized();
	const order = data.order ?? 0;
	return await prisma.menuItem.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en?.trim() ?? null,
			path: data.path.trim(),
			linkType: data.linkType,
			parentId: data.parentId?.trim() || null,
			order,
			newTab: data.newTab ?? false,
		},
	});
}

export async function updateMenuItem(id: string, data: Partial<MenuItemInput>) {
	await isAuthorized();
	const payload: Record<string, unknown> = {};
	if (data.title !== undefined) payload.title = data.title.trim();
	if (data.title_en !== undefined) payload.title_en = data.title_en?.trim() ?? null;
	if (data.path !== undefined) payload.path = data.path.trim();
	if (data.linkType !== undefined) payload.linkType = data.linkType;
	if (data.parentId !== undefined) payload.parentId = data.parentId?.trim() || null;
	if (data.order !== undefined) payload.order = data.order;
	if (data.newTab !== undefined) payload.newTab = data.newTab;
	return await prisma.menuItem.update({
		where: { id },
		data: payload as Prisma.MenuItemUpdateInput,
	});
}

export async function deleteMenuItem(id: string) {
	await isAuthorized();
	return await prisma.menuItem.delete({ where: { id } });
}

/** Admin: reorder menu items by id array (order = index) */
export async function reorderMenuItems(orderedIds: string[]) {
	await isAuthorized();
	await Promise.all(
		orderedIds.map((id, index) =>
			prisma.menuItem.update({
				where: { id },
				data: { order: index },
			})
		)
	);
}
