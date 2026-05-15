"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

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

export async function getNews(opts?: {
	search?: string;
	categoryId?: string;
	page?: number;
	pageSize?: number;
}) {
	await isAuthorized();
	const page = Math.max(1, opts?.page ?? 1);
	const pageSize = opts?.pageSize ?? DEFAULT_PAGE_SIZE;
	const skip = (page - 1) * pageSize;
	const where = {
		...(opts?.categoryId?.trim() && { categoryId: opts.categoryId.trim() }),
		...(opts?.search?.trim() && {
			OR: [
				{
					title: { contains: opts.search.trim(), mode: "insensitive" as const },
				},
				{
					title_en: {
						contains: opts.search.trim(),
						mode: "insensitive" as const,
					},
				},
				{
					subtitle: {
						contains: opts.search.trim(),
						mode: "insensitive" as const,
					},
				},
				{
					subtitle_en: {
						contains: opts.search.trim(),
						mode: "insensitive" as const,
					},
				},
			],
		}),
	};
	try {
		const [items, total] = await Promise.all([
			prisma.news.findMany({
				orderBy: { createdAt: "desc" },
				include: { category: true },
				where,
				skip,
				take: pageSize,
			}),
			prisma.news.count({ where }),
		]);
		return { items: items as NewsRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as NewsRow[],
			total: 0,
			page: 1,
		});
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

/** Public — no auth. Pass limit=0 for all. */
export async function getNewsPublic(limit = 6, categoryId?: string) {
	try {
		return (await prisma.news.findMany({
			orderBy: { createdAt: "desc" },
			...(limit > 0 ? { take: limit } : {}),
			where: categoryId ? { categoryId } : undefined,
			include: { category: true },
		})) as NewsRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NewsRow[]);
	}
}

export async function getNewsByIdPublic(id: string) {
	try {
		return (await prisma.news.findUnique({
			where: { id },
			include: { category: true },
		})) as NewsRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}
