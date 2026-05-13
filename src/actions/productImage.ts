"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type ProductImageRow = {
	id: string;
	productId: string;
	path: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getProductImages(
	productId: string
): Promise<ProductImageRow[]> {
	await isAuthorized();
	try {
		return (await prisma.productImage.findMany({
			where: { productId },
			orderBy: { createdAt: "asc" },
		})) as ProductImageRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductImageRow[]);
	}
}

export async function addProductImage(
	productId: string,
	path: string
): Promise<ProductImageRow> {
	await isAuthorized();
	return prisma.productImage.create({
		data: { productId, path },
	}) as unknown as ProductImageRow;
}

export async function deleteProductImage(id: string): Promise<void> {
	await isAuthorized();
	await prisma.productImage.delete({ where: { id } });
}
