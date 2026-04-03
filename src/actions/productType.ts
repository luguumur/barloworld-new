"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	productType: {
		findMany: (args?: { orderBy?: { createdAt: "asc" } }) => Promise<ProductTypeRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<ProductTypeRow | null>;
		create: (args: { data: { name: string; name_en: string } }) => Promise<ProductTypeRow>;
		update: (args: {
			where: { id: string };
			data: { name: string; name_en: string };
		}) => Promise<ProductTypeRow>;
		delete: (args: { where: { id: string } }) => Promise<ProductTypeRow>;
	};
};

export type ProductTypeRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

function getDelegate() {
	return db.productType;
}

export async function getProductTypes(search?: string) {
	await isAuthorized();
	try {
		const list = await getDelegate().findMany({
			orderBy: { createdAt: "asc" },
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(t) =>
					t.name.toLowerCase().includes(q) ||
					t.name_en.toLowerCase().includes(q)
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

export async function getProductTypeById(id: string) {
	await isAuthorized();
	try {
		return await getDelegate().findUnique({ where: { id } });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		throw error;
	}
}

export async function createProductType(data: { name: string; name_en: string }) {
	await isAuthorized();
	return await getDelegate().create({
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function updateProductType(
	id: string,
	data: { name: string; name_en: string }
) {
	await isAuthorized();
	return await getDelegate().update({
		where: { id },
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function deleteProductType(id: string) {
	await isAuthorized();
	return await getDelegate().delete({ where: { id } });
}
