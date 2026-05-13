"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type ProductTypeRow = {
	id: string;
	name: string;
	name_en: string;
	img_path?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type ProductTypeInput = {
	name: string;
	name_en: string;
	img_path?: string | null;
};

export async function getProductTypes(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.productType.findMany({
			orderBy: { createdAt: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as ProductTypeRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductTypeRow[]);
	}
}

export async function getProductTypeById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.productType.findUnique({
			where: { id },
		})) as ProductTypeRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createProductType(data: ProductTypeInput) {
	await isAuthorized();
	return prisma.productType.create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			img_path: data.img_path ?? null,
		},
	});
}

export async function updateProductType(id: string, data: ProductTypeInput) {
	await isAuthorized();
	return prisma.productType.update({
		where: { id },
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			img_path: data.img_path ?? null,
		},
	});
}

export async function deleteProductType(id: string) {
	await isAuthorized();
	return prisma.productType.delete({ where: { id } });
}
