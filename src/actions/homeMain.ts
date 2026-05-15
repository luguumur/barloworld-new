"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

// ── HomeContent (single record) ─────────────────────────────────────────────

export type HomeContentRow = {
	id: string;
	titleBefore: string;
	titleBefore_en: string;
	titleMain: string;
	titleMain_en: string;
	description: string;
	description_en: string;
	btnText: string;
	btnText_en: string;
	btnUrl: string;
};

export type HomeContentInput = Omit<HomeContentRow, "id">;

export async function getHomeContent() {
	try {
		const rows = await prisma.homeContent.findMany({ take: 1 });
		return (rows[0] ?? null) as HomeContentRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function upsertHomeContent(data: HomeContentInput) {
	await isAuthorized();
	const existing = await prisma.homeContent.findMany({ take: 1 });
	if (existing[0]) {
		return prisma.homeContent.update({
			where: { id: existing[0].id },
			data,
		});
	}
	return prisma.homeContent.create({ data });
}

// ── HomeCard ─────────────────────────────────────────────────────────────────

export type HomeCardRow = {
	id: string;
	title: string;
	title_en: string;
	image: string;
	url: string;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export type HomeCardInput = {
	title: string;
	title_en: string;
	image: string;
	url: string;
	order?: number;
};

export async function getHomeCards() {
	try {
		return (await prisma.homeCard.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		})) as HomeCardRow[];
	} catch (error) {
		return handleTableMissing(error, [] as HomeCardRow[]);
	}
}

export async function getHomeCardById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.homeCard.findUnique({
			where: { id },
		})) as HomeCardRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createHomeCard(data: HomeCardInput) {
	await isAuthorized();
	return prisma.homeCard.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			image: data.image.trim(),
			url: data.url.trim(),
			order: data.order ?? 0,
		},
	});
}

export async function updateHomeCard(id: string, data: Partial<HomeCardInput>) {
	await isAuthorized();
	return prisma.homeCard.update({
		where: { id },
		data: {
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && { title_en: data.title_en.trim() }),
			...(data.image !== undefined && { image: data.image.trim() }),
			...(data.url !== undefined && { url: data.url.trim() }),
			...(data.order !== undefined && { order: data.order }),
		},
	});
}

export async function reorderHomeCards(orderedIds: string[]) {
	await isAuthorized();
	if (orderedIds.length === 0) return;
	const whenClauses = orderedIds.map(
		(id, i) => Prisma.sql`WHEN ${id} THEN ${i}`
	);
	const inList = orderedIds.map((id) => Prisma.sql`${id}`);
	await prisma.$executeRaw`
		UPDATE home_cards
		SET "order" = CASE id ${Prisma.join(whenClauses, " ")} ELSE "order" END
		WHERE id IN (${Prisma.join(inList)})
	`;
}

export async function deleteHomeCard(id: string) {
	await isAuthorized();
	return prisma.homeCard.delete({ where: { id } });
}
