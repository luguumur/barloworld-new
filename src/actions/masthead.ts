"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	masthead: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" | "desc" };
		}) => Promise<MastheadRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<MastheadRow | null>;
		create: (args: { data: MastheadInput }) => Promise<MastheadRow>;
		update: (args: {
			where: { id: string };
			data: Partial<MastheadInput>;
		}) => Promise<MastheadRow>;
		delete: (args: { where: { id: string } }) => Promise<MastheadRow>;
	};
};

function getMastheadDelegate():
	| {
			findMany: (args?: { orderBy?: { createdAt: "asc" | "desc" } }) => Promise<MastheadRow[]>;
			findUnique: (args: { where: { id: string } }) => Promise<MastheadRow | null>;
			create: (args: { data: MastheadInput }) => Promise<MastheadRow>;
			update: (args: { where: { id: string }; data: Partial<MastheadInput> }) => Promise<MastheadRow>;
			delete: (args: { where: { id: string } }) => Promise<MastheadRow>;
	  }
	| undefined {
	return db.masthead;
}

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
	const delegate = getMastheadDelegate();
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

export async function getMastheads(search?: string) {
	await isAuthorized();
	const delegate = getMastheadDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: { createdAt: "desc" },
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(m) =>
					m.title.toLowerCase().includes(q) ||
					m.title_en.toLowerCase().includes(q) ||
					(m.subtitle && m.subtitle.toLowerCase().includes(q)) ||
					(m.subtitle_en && m.subtitle_en.toLowerCase().includes(q))
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

export async function createMasthead(data: MastheadInput) {
	await isAuthorized();
	const delegate = getMastheadDelegate();
	if (!delegate) throw new Error("Prisma client missing Masthead model. Run: npx prisma generate and restart the dev server.");
	return await delegate.create({
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
	const delegate = getMastheadDelegate();
	if (!delegate) throw new Error("Prisma client missing Masthead model. Run: npx prisma generate and restart the dev server.");
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
			...(data.url !== undefined && { url: data.url?.trim() || null }),
			...(data.imageurl !== undefined && {
				imageurl: data.imageurl?.trim() || null,
			}),
		},
	});
}

export async function deleteMasthead(id: string) {
	await isAuthorized();
	const delegate = getMastheadDelegate();
	if (!delegate) throw new Error("Prisma client missing Masthead model. Run: npx prisma generate and restart the dev server.");
	return await delegate.delete({
		where: { id },
	});
}
