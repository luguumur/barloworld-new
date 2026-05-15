"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

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

export async function getProductTypes(opts?: {
	search?: string;
	page?: number;
	pageSize?: number;
}) {
	await isAuthorized();
	const page = Math.max(1, opts?.page ?? 1);
	const pageSize = opts?.pageSize ?? DEFAULT_PAGE_SIZE;
	const skip = (page - 1) * pageSize;
	const where = opts?.search?.trim()
		? {
				OR: [
					{
						name: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						name_en: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.productType.findMany({
				orderBy: { createdAt: "asc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.productType.count({ where }),
		]);
		return { items: items as ProductTypeRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as ProductTypeRow[],
			total: 0,
			page: 1,
		});
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
