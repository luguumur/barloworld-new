"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type NewsCategoryRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getNewsCategories(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.newsCategory.findMany({
			orderBy: { createdAt: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as NewsCategoryRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NewsCategoryRow[]);
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
