"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

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
	try {
		return (await prisma.news.findUnique({
			where: { id },
			include: { category: true },
		})) as NewsRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getNews(search?: string, categoryId?: string) {
	await isAuthorized();
	try {
		return (await prisma.news.findMany({
			orderBy: { createdAt: "desc" },
			include: { category: true },
			where: {
				...(categoryId?.trim() && { categoryId: categoryId.trim() }),
				...(search?.trim() && {
					OR: [
						{ title: { contains: search.trim(), mode: "insensitive" } },
						{ title_en: { contains: search.trim(), mode: "insensitive" } },
						{ subtitle: { contains: search.trim(), mode: "insensitive" } },
						{ subtitle_en: { contains: search.trim(), mode: "insensitive" } },
					],
				}),
			},
		})) as NewsRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NewsRow[]);
	}
}

export async function createNews(data: NewsInput) {
	await isAuthorized();
	return prisma.news.create({
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
	return prisma.news.update({
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
	return prisma.news.delete({ where: { id } });
}

export async function getNewsPublic(limit = 6) {
	try {
		return (await prisma.news.findMany({
			orderBy: { createdAt: "desc" },
			take: limit,
			include: { category: true },
		})) as NewsRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NewsRow[]);
	}
}
