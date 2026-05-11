"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import type { Prisma } from "@prisma/client";

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
	linkType: "PAGE" | "CUSTOM" | "PRODUCT_TYPES";
	parentId?: string | null;
	order?: number;
	newTab?: boolean;
};

type PublicMenuItem = {
	id: number;
	title: string;
	path?: string;
	newTab?: boolean;
	submenu?: { id: number; title: string; path: string; newTab?: boolean }[];
};

/** Public: build nav menu tree (no auth) */
export async function getMenuForPublic(
	lang: "mn" | "en" = "en"
): Promise<PublicMenuItem[]> {
	try {
		const [items, productTypes] = await Promise.all([
			prisma.menuItem.findMany({
				orderBy: [{ order: "asc" }, { createdAt: "asc" }],
			}),
			prisma.productType.findMany({ orderBy: { createdAt: "asc" } }),
		]);

		const menuItems = items as MenuItemRow[];

		const byParent = new Map<string | null, MenuItemRow[]>();
		byParent.set(null, []);
		for (const item of menuItems) {
			const list = byParent.get(item.parentId) ?? [];
			list.push(item);
			byParent.set(item.parentId, list);
		}

		const resolveTitle = (row: MenuItemRow) =>
			(lang === "en" ? row.title_en ?? row.title : row.title).trim() ||
			row.title;

		const resolveHref = (row: MenuItemRow) =>
			row.linkType === "PAGE" ? `/${row.path.replace(/^\//, "")}` : row.path;

		const toMenu = (row: MenuItemRow, idx: number): PublicMenuItem => {
			// PRODUCT_TYPES: auto-generate submenu from DB product types
			if (row.linkType === "PRODUCT_TYPES") {
				const submenu = productTypes.map((pt, i) => ({
					id: idx * 1000 + i + 1,
					title: lang === "mn" ? pt.name : pt.name_en,
					path: `/products/${pt.id}`,
				}));
				return {
					id: idx,
					title: resolveTitle(row),
					path: "/products",
					newTab: false,
					submenu: submenu.length > 0 ? submenu : undefined,
				};
			}

			// Regular items: use DB children as submenu
			const children = (byParent.get(row.id) ?? [])
				.sort(
					(a, b) =>
						a.order - b.order || a.createdAt.getTime() - b.createdAt.getTime()
				)
				.map((c, i) => ({
					id: idx * 1000 + i,
					title: resolveTitle(c),
					path: resolveHref(c),
					newTab: c.newTab,
				}));
			if (children.length > 0) {
				return {
					id: idx,
					title: resolveTitle(row),
					path: resolveHref(row),
					newTab: row.newTab,
					submenu: children,
				};
			}
			return {
				id: idx,
				title: resolveTitle(row),
				path: resolveHref(row),
				newTab: row.newTab,
			};
		};

		const roots = (byParent.get(null) ?? []).sort(
			(a, b) =>
				a.order - b.order || a.createdAt.getTime() - b.createdAt.getTime()
		);
		return roots.map((r, i) => toMenu(r, i));
	} catch (error) {
		return handleTableMissing(error, [] as PublicMenuItem[]);
	}
}

/** Admin: get all menu items flat */
export async function getMenuItems() {
	await isAuthorized();
	try {
		return (await prisma.menuItem.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		})) as MenuItemRow[];
	} catch (error) {
		return handleTableMissing(error, [] as MenuItemRow[]);
	}
}

/** Admin: get root items for parent selector */
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
		return (await prisma.menuItem.findUnique({
			where: { id },
		})) as MenuItemRow | null;
	} catch {
		return null;
	}
}

export async function createMenuItem(data: MenuItemInput) {
	await isAuthorized();
	return prisma.menuItem.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en?.trim() ?? null,
			path: data.path.trim(),
			linkType: data.linkType,
			parentId: data.parentId?.trim() || null,
			order: data.order ?? 0,
			newTab: data.newTab ?? false,
		},
	});
}

export async function updateMenuItem(id: string, data: Partial<MenuItemInput>) {
	await isAuthorized();
	return prisma.menuItem.update({
		where: { id },
		data: {
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && {
				title_en: data.title_en?.trim() ?? null,
			}),
			...(data.path !== undefined && { path: data.path.trim() }),
			...(data.linkType !== undefined && { linkType: data.linkType }),
			...(data.parentId !== undefined && {
				parentId: data.parentId?.trim() || null,
			}),
			...(data.order !== undefined && { order: data.order }),
			...(data.newTab !== undefined && { newTab: data.newTab }),
		} as Prisma.MenuItemUpdateInput,
	});
}

export async function deleteMenuItem(id: string) {
	await isAuthorized();
	return prisma.menuItem.delete({ where: { id } });
}

/** Admin: reorder menu items by id array */
export async function reorderMenuItems(orderedIds: string[]) {
	await isAuthorized();
	await Promise.all(
		orderedIds.map((id, index) =>
			prisma.menuItem.update({ where: { id }, data: { order: index } })
		)
	);
}
