"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

// Use typed access until TS picks up regenerated Prisma client (npx prisma generate)
const db = prisma as typeof prisma & {
	newsCategory: {
		findMany: (args?: { orderBy?: { createdAt: "asc" | "desc" } }) => Promise<
			Array<{
				id: string;
				name: string;
				name_en: string;
				createdAt: Date;
				updatedAt: Date;
			}>
		>;
		create: (args: {
			data: { name: string; name_en: string };
		}) => Promise<unknown>;
		update: (args: {
			where: { id: string };
			data: { name: string; name_en: string };
		}) => Promise<unknown>;
		delete: (args: { where: { id: string } }) => Promise<unknown>;
	};
};

export type NewsCategoryRow = {
	id: string;
	name: string;
	name_en: string;
	created_at: Date;
	updated_at: Date;
};

export async function getNewsCategories(search?: string) {
	await isAuthorized();

	try {
		const categories = await db.newsCategory.findMany({
			orderBy: { createdAt: "asc" },
		});

		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return categories.filter(
				(c) =>
					c.name.toLowerCase().includes(q) ||
					c.name_en.toLowerCase().includes(q)
			);
		}

		return categories;
	} catch (error) {
		// Table may not exist yet — run: npx prisma db push  or  npx prisma migrate deploy
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

export async function createNewsCategory(data: {
	name: string;
	name_en: string;
}) {
	await isAuthorized();

	return await db.newsCategory.create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
		},
	});
}

export async function updateNewsCategory(
	id: string,
	data: { name: string; name_en: string }
) {
	await isAuthorized();

	return await db.newsCategory.update({
		where: { id },
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
		},
	});
}

export async function deleteNewsCategory(id: string) {
	await isAuthorized();

	return await db.newsCategory.delete({
		where: { id },
	});
}
