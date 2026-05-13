"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

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

export async function getProductCategories(types?: string, search?: string) {
	await isAuthorized();
	try {
		return (await prisma.productCategory.findMany({
			orderBy: { createdAt: "asc" },
			where: {
				...(types?.trim() && { types: types.trim() }),
				...(search?.trim() && {
					OR: [
						{ name: { contains: search.trim(), mode: "insensitive" } },
						{ name_en: { contains: search.trim(), mode: "insensitive" } },
					],
				}),
			},
		})) as ProductCategoryRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductCategoryRow[]);
	}
}

export async function getProductCategoryById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.productCategory.findUnique({
			where: { id },
		})) as ProductCategoryRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createProductCategory(data: ProductCategoryInput) {
	await isAuthorized();
	return prisma.productCategory.create({
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
	return prisma.productCategory.update({
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
	return prisma.productCategory.delete({ where: { id } });
}
