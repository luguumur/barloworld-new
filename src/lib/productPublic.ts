import { prisma } from "@/libs/prismaDb";
import { handleTableMissing } from "@/libs/prismaError";
import type { ProductRow } from "@/actions/product";

export async function getProductsPublic(opts?: {
	categoryId?: string;
	productTypes?: string;
}): Promise<ProductRow[]> {
	try {
		return (await prisma.product.findMany({
			orderBy: [{ product_order: "asc" }, { createdAt: "desc" }],
			include: {
				category: true,
				attributeValues: { include: { attribute: true, group: true } },
				images: { orderBy: { createdAt: "asc" } },
			},
			where: {
				status: "ACTIVE",
				...(opts?.categoryId?.trim() && { categoryId: opts.categoryId.trim() }),
				...(opts?.productTypes?.trim() && { product_types: opts.productTypes.trim() }),
			},
		})) as unknown as ProductRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductRow[]);
	}
}

export async function getProductByIdPublic(id: string): Promise<ProductRow | null> {
	try {
		return (await prisma.product.findUnique({
			where: { id },
			include: {
				category: true,
				attributeValues: { include: { attribute: true, group: true } },
				images: { orderBy: { createdAt: "asc" } },
			},
		})) as unknown as ProductRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}
