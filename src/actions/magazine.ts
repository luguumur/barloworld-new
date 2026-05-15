"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type MagazineRow = {
	id: string;
	title: string;
	title_en: string;
	image: string | null;
	url: string | null;
	date: string | null;
	number: string | null;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export type MagazineInput = {
	title: string;
	title_en: string;
	image?: string | null;
	url?: string | null;
	date?: string | null;
	number?: string | null;
};

export async function getMagazineById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.magazine.findUnique({
			where: { id },
		})) as MagazineRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getMagazines(opts?: {
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
						number: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						date: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.magazine.findMany({
				orderBy: [{ order: "asc" }, { createdAt: "desc" }],
				where,
				skip,
				take: pageSize,
			}),
			prisma.magazine.count({ where }),
		]);
		return { items: items as MagazineRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as MagazineRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function createMagazine(data: MagazineInput) {
	await isAuthorized();
	return prisma.magazine.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			image: data.image?.trim() || null,
			url: data.url?.trim() || null,
			date: data.date?.trim() || null,
			number: data.number?.trim() || null,
		},
	});
}

export async function updateMagazine(id: string, data: Partial<MagazineInput>) {
	await isAuthorized();
	return prisma.magazine.update({
		where: { id },
		data: {
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && { title_en: data.title_en.trim() }),
			...(data.image !== undefined && { image: data.image?.trim() || null }),
			...(data.url !== undefined && { url: data.url?.trim() || null }),
			...(data.date !== undefined && { date: data.date?.trim() || null }),
			...(data.number !== undefined && { number: data.number?.trim() || null }),
		},
	});
}

export async function deleteMagazine(id: string) {
	await isAuthorized();
	return prisma.magazine.delete({ where: { id } });
}

/** Public — no auth required */
export async function getMagazinesPublic() {
	try {
		return (await prisma.magazine.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "desc" }],
		})) as MagazineRow[];
	} catch (error) {
		return handleTableMissing(error, [] as MagazineRow[]);
	}
}

export async function reorderMagazines(orderedIds: string[]) {
	await isAuthorized();
	if (orderedIds.length === 0) return;
	const whenClauses = orderedIds.map(
		(id, i) => Prisma.sql`WHEN ${id} THEN ${i}`
	);
	const inList = orderedIds.map((id) => Prisma.sql`${id}`);
	await prisma.$executeRaw`
		UPDATE "Magazine"
		SET "order" = CASE id ${Prisma.join(whenClauses, " ")} ELSE "order" END
		WHERE id IN (${Prisma.join(inList)})
	`;
}
