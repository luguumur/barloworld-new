"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type ProductTypeRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getProductTypes(search?: string) {
	await isAuthorized();
	try {
		return await prisma.productType.findMany({
			orderBy: { createdAt: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as ProductTypeRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductTypeRow[]);
	}
}

export async function getProductTypeById(id: string) {
	await isAuthorized();
	try {
		return await prisma.productType.findUnique({ where: { id } }) as ProductTypeRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createProductType(data: { name: string; name_en: string }) {
	await isAuthorized();
	return prisma.productType.create({
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function updateProductType(
	id: string,
	data: { name: string; name_en: string }
) {
	await isAuthorized();
	return prisma.productType.update({
		where: { id },
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function deleteProductType(id: string) {
	await isAuthorized();
	return prisma.productType.delete({ where: { id } });
}
