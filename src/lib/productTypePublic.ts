import { prisma } from "@/libs/prismaDb";
import { handleTableMissing } from "@/libs/prismaError";
import type { ProductTypeRow } from "@/actions/productType";

export async function getProductTypesPublic(): Promise<ProductTypeRow[]> {
	try {
		return (await prisma.productType.findMany({
			orderBy: { createdAt: "asc" },
		})) as ProductTypeRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductTypeRow[]);
	}
}

export async function getProductTypeByIdPublic(id: string): Promise<ProductTypeRow | null> {
	try {
		return (await prisma.productType.findUnique({ where: { id } })) as ProductTypeRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}
