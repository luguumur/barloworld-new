"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type DealRow = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	status: string;
	img_path: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type DealInput = {
	title: string;
	title_en: string;
	subtitle?: string | null;
	subtitle_en?: string | null;
	description: string;
	description_en: string;
	status?: string;
	img_path?: string | null;
};

export async function getDealById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.deal.findUnique({ where: { id } })) as DealRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getDeals(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.deal.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ title: { contains: search.trim(), mode: "insensitive" } },
							{ title_en: { contains: search.trim(), mode: "insensitive" } },
							{ subtitle: { contains: search.trim(), mode: "insensitive" } },
							{ subtitle_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as DealRow[];
	} catch (error) {
		return handleTableMissing(error, [] as DealRow[]);
	}
}

export async function createDeal(data: DealInput) {
	await isAuthorized();
	return prisma.deal.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			subtitle: data.subtitle?.trim() ?? null,
			subtitle_en: data.subtitle_en?.trim() ?? null,
			description: data.description.trim(),
			description_en: data.description_en.trim(),
			status: data.status?.trim() || "ACTIVE",
			img_path: data.img_path?.trim() || null,
		},
	});
}

export async function updateDeal(id: string, data: Partial<DealInput>) {
	await isAuthorized();
	return prisma.deal.update({
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
			...(data.description !== undefined && {
				description: data.description.trim(),
			}),
			...(data.description_en !== undefined && {
				description_en: data.description_en.trim(),
			}),
			...(data.status !== undefined && {
				status: data.status.trim() || "ACTIVE",
			}),
			...(data.img_path !== undefined && {
				img_path: data.img_path?.trim() || null,
			}),
		},
	});
}

export async function deleteDeal(id: string) {
	await isAuthorized();
	return prisma.deal.delete({ where: { id } });
}

/** Public: active deals for homepage — no auth required */
export async function getDealsPublic(limit = 6) {
	try {
		return (await prisma.deal.findMany({
			where: { status: "ACTIVE" },
			orderBy: { createdAt: "desc" },
			take: limit,
		})) as DealRow[];
	} catch (error) {
		return handleTableMissing(error, [] as DealRow[]);
	}
}
