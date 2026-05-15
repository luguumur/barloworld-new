"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

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

export async function getProductCategories(opts?: {
	types?: string;
	search?: string;
	page?: number;
	pageSize?: number;
}) {
	await isAuthorized();
	const page = Math.max(1, opts?.page ?? 1);
	const pageSize = opts?.pageSize ?? DEFAULT_PAGE_SIZE;
	const skip = (page - 1) * pageSize;
	const where = {
		...(opts?.types?.trim() && { types: opts.types.trim() }),
		...(opts?.search?.trim() && {
			OR: [
				{
					name: { contains: opts.search.trim(), mode: "insensitive" as const },
				},
				{
					name_en: {
						contains: opts.search.trim(),
						mode: "insensitive" as const,
					},
				},
			],
		}),
	};
	try {
		const [items, total] = await Promise.all([
			prisma.productCategory.findMany({
				orderBy: { createdAt: "asc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.productCategory.count({ where }),
		]);
		return { items: items as ProductCategoryRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as ProductCategoryRow[],
			total: 0,
			page: 1,
		});
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
