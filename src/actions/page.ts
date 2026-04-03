"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	page: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" | "desc" };
		}) => Promise<PageRow[]>;
		findUnique: (args: {
			where: { id: string } | { slug: string };
		}) => Promise<PageRow | null>;
		create: (args: { data: PageInput }) => Promise<PageRow>;
		update: (args: {
			where: { id: string };
			data: Partial<PageInput>;
		}) => Promise<PageRow>;
		delete: (args: { where: { id: string } }) => Promise<PageRow>;
	};
};

export type PageRow = {
	id: string;
	slug: string;
	title: string;
	title_en: string;
	description: string | null;
	description_en: string | null;
	content: string;
	content_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export type PageInput = {
	slug: string;
	title: string;
	title_en: string;
	description?: string | null;
	description_en?: string | null;
	content: string;
	content_en: string;
};

function getPageDelegate() {
	return db.page;
}

/** For admin: get single page by id */
export async function getPageById(id: string) {
	await isAuthorized();
	const delegate = getPageDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({
			where: { id },
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return null;
		}
		throw error;
	}
}

/** For public [slug] route: get page by slug (no auth) */
export async function getPageBySlug(slug: string) {
	const delegate = getPageDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({
			where: { slug: slug.toLowerCase().trim() },
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return null;
		}
		throw error;
	}
}

/** All slugs for generateStaticParams (no auth, for public route) */
export async function getAllPageSlugs(): Promise<string[]> {
	const delegate = getPageDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: { createdAt: "desc" },
			select: { slug: true },
		});
		return list.map((p) => p.slug);
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return [];
		}
		return [];
	}
}

export async function getPages(search?: string) {
	await isAuthorized();
	const delegate = getPageDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: { createdAt: "desc" },
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(p) =>
					p.slug.toLowerCase().includes(q) ||
					p.title.toLowerCase().includes(q) ||
					p.title_en.toLowerCase().includes(q) ||
					(p.description && p.description.toLowerCase().includes(q)) ||
					(p.description_en && p.description_en.toLowerCase().includes(q))
			);
		}
		return list;
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return [];
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return [];
		}
		throw error;
	}
}

function normalizeSlug(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-_]/g, "");
}

export async function createPage(data: PageInput) {
	await isAuthorized();
	const delegate = getPageDelegate();
	if (!delegate)
		throw new Error(
			"Prisma client missing Page model. Run: npx prisma generate && npx prisma migrate dev"
		);
	const slug = normalizeSlug(data.slug) || "page";
	return await delegate.create({
		data: {
			slug,
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			description: data.description?.trim() ?? null,
			description_en: data.description_en?.trim() ?? null,
			content: data.content.trim(),
			content_en: data.content_en.trim(),
		},
	});
}

export async function updatePage(id: string, data: Partial<PageInput>) {
	await isAuthorized();
	const delegate = getPageDelegate();
	if (!delegate)
		throw new Error(
			"Prisma client missing Page model. Run: npx prisma generate && npx prisma migrate dev"
		);
	const payload: Record<string, unknown> = {};
	if (data.slug !== undefined) payload.slug = normalizeSlug(data.slug) || undefined;
	if (data.title !== undefined) payload.title = data.title.trim();
	if (data.title_en !== undefined) payload.title_en = data.title_en.trim();
	if (data.description !== undefined)
		payload.description = data.description?.trim() ?? null;
	if (data.description_en !== undefined)
		payload.description_en = data.description_en?.trim() ?? null;
	if (data.content !== undefined) payload.content = data.content.trim();
	if (data.content_en !== undefined) payload.content_en = data.content_en.trim();
	return await delegate.update({
		where: { id },
		data: payload as Partial<PageInput>,
	});
}

export async function deletePage(id: string) {
	await isAuthorized();
	const delegate = getPageDelegate();
	if (!delegate)
		throw new Error(
			"Prisma client missing Page model. Run: npx prisma generate && npx prisma migrate dev"
		);
	return await delegate.delete({
		where: { id },
	});
}
