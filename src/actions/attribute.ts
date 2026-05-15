"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type AttributeRow = {
	id: string;
	name: string;
	name_en: string;
	data_type: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getAttributes(opts?: {
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
			prisma.attribute.findMany({
				orderBy: { createdAt: "asc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.attribute.count({ where }),
		]);
		return { items: items as AttributeRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as AttributeRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function getAttributeById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.attribute.findUnique({
			where: { id },
		})) as AttributeRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createAttribute(data: {
	name: string;
	name_en: string;
	data_type: string;
}) {
	await isAuthorized();
	return prisma.attribute.create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			data_type: data.data_type.trim(),
		},
	});
}

export async function updateAttribute(
	id: string,
	data: { name: string; name_en: string; data_type: string }
) {
	await isAuthorized();
	return prisma.attribute.update({
		where: { id },
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			data_type: data.data_type.trim(),
		},
	});
}

export async function deleteAttribute(id: string) {
	await isAuthorized();
	return prisma.attribute.delete({ where: { id } });
}
