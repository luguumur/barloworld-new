"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	productCategory: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" };
			where?: { types?: string };
		}) => Promise<ProductCategoryRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<ProductCategoryRow | null>;
		create: (args: { data: ProductCategoryInput }) => Promise<ProductCategoryRow>;
		update: (args: {
			where: { id: string };
			data: Partial<ProductCategoryInput>;
		}) => Promise<ProductCategoryRow>;
		delete: (args: { where: { id: string } }) => Promise<ProductCategoryRow>;
	};
};

export type ProductCategoryRow = {
	id: string;
	name: string;
	name_en: string;
	parentId: string | null;
	img_path: string | null;
	types: string;
	createdAt: Date;
	updatedAt: Date;
};

export type ProductCategoryInput = {
	name: string;
	name_en: string;
	parentId?: string | null;
	img_path?: string | null;
	types: string;
};

function getDelegate() {
	return db.productCategory;
}

export async function getProductCategories(types?: string, search?: string) {
	await isAuthorized();
	try {
		let list = await getDelegate().findMany({
			orderBy: { createdAt: "asc" },
			...(types?.trim() && { where: { types: types.trim() } }),
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			list = list.filter(
				(c) =>
					c.name.toLowerCase().includes(q) ||
					c.name_en.toLowerCase().includes(q)
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

export async function getProductCategoryById(id: string) {
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

export async function createProductCategory(data: ProductCategoryInput) {
	await isAuthorized();
	return await getDelegate().create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			parentId: data.parentId?.trim() || null,
			img_path: data.img_path?.trim() || null,
			types: data.types.trim(),
		},
	});
}

export async function updateProductCategory(
	id: string,
	data: Partial<ProductCategoryInput>
) {
	await isAuthorized();
	return await getDelegate().update({
		where: { id },
		data: {
			...(data.name !== undefined && { name: data.name.trim() }),
			...(data.name_en !== undefined && { name_en: data.name_en.trim() }),
			...(data.parentId !== undefined && {
				parentId: data.parentId?.trim() || null,
			}),
			...(data.img_path !== undefined && {
				img_path: data.img_path?.trim() || null,
			}),
			...(data.types !== undefined && { types: data.types.trim() }),
		},
	});
}

export async function deleteProductCategory(id: string) {
	await isAuthorized();
	return await getDelegate().delete({ where: { id } });
}
