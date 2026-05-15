"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type MastheadRow = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	url: string | null;
	imageurl: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type MastheadInput = {
	title: string;
	title_en: string;
	subtitle?: string | null;
	subtitle_en?: string | null;
	description: string;
	description_en: string;
	url?: string | null;
	imageurl?: string | null;
};

export async function getMastheadById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.masthead.findUnique({
			where: { id },
		})) as MastheadRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getMastheads(opts?: {
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
						title: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
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
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.masthead.findMany({
				orderBy: { createdAt: "desc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.masthead.count({ where }),
		]);
		return { items: items as MastheadRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as MastheadRow[],
			total: 0,
			page: 1,
		});
	}
}

/** Public: read mastheads without admin auth */
export async function getMastheadsPublic(search?: string) {
	try {
		return (await prisma.masthead.findMany({
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
		})) as MastheadRow[];
	} catch (error) {
		return handleTableMissing(error, [] as MastheadRow[]);
	}
}

export async function createMasthead(data: MastheadInput) {
	await isAuthorized();
	return prisma.masthead.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			subtitle: data.subtitle?.trim() ?? null,
			subtitle_en: data.subtitle_en?.trim() ?? null,
			description: data.description.trim(),
			description_en: data.description_en.trim(),
			url: data.url?.trim() || null,
			imageurl: data.imageurl?.trim() || null,
		},
	});
}

export async function updateMasthead(id: string, data: Partial<MastheadInput>) {
	await isAuthorized();
	return prisma.masthead.update({
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
			...(data.url !== undefined && { url: data.url?.trim() || null }),
			...(data.imageurl !== undefined && {
				imageurl: data.imageurl?.trim() || null,
			}),
		},
	});
}

export async function deleteMasthead(id: string) {
	await isAuthorized();
	return prisma.masthead.delete({ where: { id } });
}
