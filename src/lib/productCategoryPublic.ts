import { prisma } from "@/libs/prismaDb";
import { handleTableMissing } from "@/libs/prismaError";
import type { ProductCategoryRow } from "@/actions/productCategory";

export async function getProductCategoriesPublic(
	types?: string
): Promise<ProductCategoryRow[]> {
	try {
		return (await prisma.productCategory.findMany({
			orderBy: { createdAt: "asc" },
			where: types?.trim() ? { types: types.trim() } : undefined,
		})) as ProductCategoryRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductCategoryRow[]);
	}
}

export async function getProductCategoryByIdPublic(
	id: string
): Promise<ProductCategoryRow | null> {
	try {
		return (await prisma.productCategory.findUnique({
			where: { id },
		})) as ProductCategoryRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}
