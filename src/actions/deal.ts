"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

// Use delegate from generated client (ensure npx prisma generate was run)
const db = prisma as unknown as {
	deal: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" | "desc" };
		}) => Promise<DealRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<DealRow | null>;
		create: (args: { data: DealInput }) => Promise<DealRow>;
		update: (args: {
			where: { id: string };
			data: Partial<DealInput>;
		}) => Promise<DealRow>;
		delete: (args: { where: { id: string } }) => Promise<DealRow>;
	};
};

function getDealDelegate():
	| {
			findMany: (args?: { orderBy?: { createdAt: "asc" | "desc" } }) => Promise<DealRow[]>;
			findUnique: (args: { where: { id: string } }) => Promise<DealRow | null>;
			create: (args: { data: DealInput }) => Promise<DealRow>;
			update: (args: { where: { id: string }; data: Partial<DealInput> }) => Promise<DealRow>;
			delete: (args: { where: { id: string } }) => Promise<DealRow>;
	  }
	| undefined {
	return db.deal;
}

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
	const delegate = getDealDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({
			where: { id },
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

export async function getDeals(search?: string) {
	await isAuthorized();
	const delegate = getDealDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: { createdAt: "desc" },
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(d) =>
					d.title.toLowerCase().includes(q) ||
					d.title_en.toLowerCase().includes(q) ||
					(d.subtitle && d.subtitle.toLowerCase().includes(q)) ||
					(d.subtitle_en && d.subtitle_en.toLowerCase().includes(q))
			);
		}
		return list;
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

export async function createDeal(data: DealInput) {
	await isAuthorized();
	const delegate = getDealDelegate();
	if (!delegate) throw new Error("Prisma client missing Deal model. Run: npx prisma generate and restart the dev server.");
	return await delegate.create({
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
	const delegate = getDealDelegate();
	if (!delegate) throw new Error("Prisma client missing Deal model. Run: npx prisma generate and restart the dev server.");
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
			...(data.description !== undefined && {
				description: data.description.trim(),
			}),
			...(data.description_en !== undefined && {
				description_en: data.description_en.trim(),
			}),
			...(data.status !== undefined && { status: data.status.trim() || "ACTIVE" }),
			...(data.img_path !== undefined && {
				img_path: data.img_path?.trim() || null,
			}),
		},
	});
}

export async function deleteDeal(id: string) {
	await isAuthorized();
	const delegate = getDealDelegate();
	if (!delegate) throw new Error("Prisma client missing Deal model. Run: npx prisma generate and restart the dev server.");
	return await delegate.delete({
		where: { id },
	});
}
