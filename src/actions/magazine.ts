"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

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

export async function getMagazines(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.magazine.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "desc" }],
			where: search?.trim()
				? {
						OR: [
							{ title: { contains: search.trim(), mode: "insensitive" } },
							{ title_en: { contains: search.trim(), mode: "insensitive" } },
							{ number: { contains: search.trim(), mode: "insensitive" } },
							{ date: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as MagazineRow[];
	} catch (error) {
		return handleTableMissing(error, [] as MagazineRow[]);
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
	await Promise.all(
		orderedIds.map((id, index) =>
			prisma.magazine.update({ where: { id }, data: { order: index } })
		)
	);
}
