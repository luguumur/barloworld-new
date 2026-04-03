"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	magazine: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" | "desc" };
		}) => Promise<MagazineRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<MagazineRow | null>;
		create: (args: { data: MagazineInput }) => Promise<MagazineRow>;
		update: (args: {
			where: { id: string };
			data: Partial<MagazineInput>;
		}) => Promise<MagazineRow>;
		delete: (args: { where: { id: string } }) => Promise<MagazineRow>;
	};
};

function getMagazineDelegate():
	| {
			findMany: (args?: { orderBy?: { createdAt: "asc" | "desc" } }) => Promise<MagazineRow[]>;
			findUnique: (args: { where: { id: string } }) => Promise<MagazineRow | null>;
			create: (args: { data: MagazineInput }) => Promise<MagazineRow>;
			update: (args: { where: { id: string }; data: Partial<MagazineInput> }) => Promise<MagazineRow>;
			delete: (args: { where: { id: string } }) => Promise<MagazineRow>;
	  }
	| undefined {
	return db.magazine;
}

export type MagazineRow = {
	id: string;
	title: string;
	title_en: string;
	image: string | null;
	url: string | null;
	date: string | null;
	number: string | null;
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
	const delegate = getMagazineDelegate();
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

export async function getMagazines(search?: string) {
	await isAuthorized();
	const delegate = getMagazineDelegate();
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
					(m.number && m.number.toLowerCase().includes(q)) ||
					(m.date && m.date.toLowerCase().includes(q))
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

export async function createMagazine(data: MagazineInput) {
	await isAuthorized();
	const delegate = getMagazineDelegate();
	if (!delegate) throw new Error("Prisma client missing Magazine model. Run: npx prisma generate and restart the dev server.");
	return await delegate.create({
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
	const delegate = getMagazineDelegate();
	if (!delegate) throw new Error("Prisma client missing Magazine model. Run: npx prisma generate and restart the dev server.");
	return await delegate.update({
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
	const delegate = getMagazineDelegate();
	if (!delegate) throw new Error("Prisma client missing Magazine model. Run: npx prisma generate and restart the dev server.");
	return await delegate.delete({
		where: { id },
	});
}
