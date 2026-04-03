"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	news: {
		findMany: (args: {
			orderBy: { createdAt: "desc" };
			include?: { category: true };
		}) => Promise<NewsRow[]>;
		findUnique: (args: {
			where: { id: string };
			include?: { category: true };
		}) => Promise<NewsRow | null>;
		create: (args: { data: NewsInput }) => Promise<NewsRow>;
		update: (args: {
			where: { id: string };
			data: Partial<NewsInput>;
		}) => Promise<NewsRow>;
		delete: (args: { where: { id: string } }) => Promise<NewsRow>;
	};
};

function getNewsDelegate():
	| {
			findMany: (args: { orderBy: { createdAt: "desc" }; include?: { category: true } }) => Promise<NewsRow[]>;
			findUnique: (args: { where: { id: string }; include?: { category: true } }) => Promise<NewsRow | null>;
			create: (args: { data: NewsInput }) => Promise<NewsRow>;
			update: (args: { where: { id: string }; data: Partial<NewsInput> }) => Promise<NewsRow>;
			delete: (args: { where: { id: string } }) => Promise<NewsRow>;
	  }
	| undefined {
	return db.news;
}

export type NewsRow = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	thumbnail: string | null;
	content: string;
	content_en: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	category?: {
		id: string;
		name: string;
		name_en: string;
		createdAt: Date;
		updatedAt: Date;
	};
};

export type NewsInput = {
	title: string;
	title_en: string;
	subtitle?: string | null;
	subtitle_en?: string | null;
	thumbnail?: string | null;
	content: string;
	content_en: string;
	categoryId: string;
};

export async function getNewsById(id: string) {
	await isAuthorized();
	const delegate = getNewsDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({
			where: { id },
			include: { category: true },
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

export async function getNews(search?: string, categoryId?: string) {
	await isAuthorized();
	const delegate = getNewsDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: { createdAt: "desc" },
			include: { category: true },
		});
		let filtered = list;
		if (categoryId?.trim()) {
			filtered = filtered.filter((n) => n.categoryId === categoryId.trim());
		}
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			filtered = filtered.filter(
				(n) =>
					n.title.toLowerCase().includes(q) ||
					n.title_en.toLowerCase().includes(q) ||
					(n.subtitle && n.subtitle.toLowerCase().includes(q)) ||
					(n.subtitle_en && n.subtitle_en.toLowerCase().includes(q))
			);
		}
		return filtered;
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

export async function createNews(data: NewsInput) {
	await isAuthorized();
	const delegate = getNewsDelegate();
	if (!delegate) throw new Error("Prisma client missing News model. Run: npx prisma generate and restart the dev server.");
	return await delegate.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			subtitle: data.subtitle?.trim() ?? null,
			subtitle_en: data.subtitle_en?.trim() ?? null,
			thumbnail: data.thumbnail?.trim() || null,
			content: data.content.trim(),
			content_en: data.content_en.trim(),
			categoryId: data.categoryId.trim(),
		},
	});
}

export async function updateNews(id: string, data: Partial<NewsInput>) {
	await isAuthorized();
	const delegate = getNewsDelegate();
	if (!delegate) throw new Error("Prisma client missing News model. Run: npx prisma generate and restart the dev server.");
	return await delegate.update({
		where: { id },
		data: {
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && { title_en: data.title_en.trim() }),
			...(data.subtitle !== undefined && {
				subtitle: data.subtitle?.trim() ?? null,
			}),
			...(data.subtitle_en !== undefined && {
				subtitle_en: data.subtitle_en?.trim() ?? null,
			}),
			...(data.thumbnail !== undefined && {
				thumbnail: data.thumbnail?.trim() || null,
			}),
			...(data.content !== undefined && { content: data.content.trim() }),
			...(data.content_en !== undefined && {
				content_en: data.content_en.trim(),
			}),
			...(data.categoryId !== undefined && {
				categoryId: data.categoryId.trim(),
			}),
		},
	});
}

export async function deleteNews(id: string) {
	await isAuthorized();
	const delegate = getNewsDelegate();
	if (!delegate) throw new Error("Prisma client missing News model. Run: npx prisma generate and restart the dev server.");
	return await delegate.delete({
		where: { id },
	});
}
