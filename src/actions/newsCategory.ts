"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type NewsCategoryRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getNewsCategories(opts?: {
	search?: string;
	page?: number;
	pageSize?: number;
}) {
	await isAuthorized();
	const page = Math.max(1, opts?.page ?? 1);
	const pageSize = opts?.pageSize ?? DEFAULT_PAGE_SIZE;
	const skip = (page - 1) * pageSize;
	const where = opts?.search?.trim()
		? {
				OR: [
					{
						name: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						name_en: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.newsCategory.findMany({
				orderBy: { createdAt: "asc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.newsCategory.count({ where }),
		]);
		return { items: items as NewsCategoryRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as NewsCategoryRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function createNewsCategory(data: {
	name: string;
	name_en: string;
}) {
	await isAuthorized();
	return prisma.newsCategory.create({
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function updateNewsCategory(
	id: string,
	data: { name: string; name_en: string }
) {
	await isAuthorized();
	return prisma.newsCategory.update({
		where: { id },
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function deleteNewsCategory(id: string) {
	await isAuthorized();
	return prisma.newsCategory.delete({ where: { id } });
}

export async function getNewsCategoriesPublic() {
	try {
		return await prisma.newsCategory.findMany({ orderBy: { name: "asc" } });
	} catch {
		return [] as {
			id: string;
			name: string;
			name_en: string;
			createdAt: Date;
			updatedAt: Date;
		}[];
	}
}
