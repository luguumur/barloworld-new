"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type AttributeValueGroupRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getAttributeValueGroups(opts?: {
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
			prisma.attributeValueGroup.findMany({
				orderBy: { createdAt: "asc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.attributeValueGroup.count({ where }),
		]);
		return { items: items as AttributeValueGroupRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as AttributeValueGroupRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function getAttributeValueGroupById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.attributeValueGroup.findUnique({
			where: { id },
		})) as AttributeValueGroupRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createAttributeValueGroup(data: {
	name: string;
	name_en: string;
}) {
	await isAuthorized();
	return prisma.attributeValueGroup.create({
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function updateAttributeValueGroup(
	id: string,
	data: { name: string; name_en: string }
) {
	await isAuthorized();
	return prisma.attributeValueGroup.update({
		where: { id },
		data: { name: data.name.trim(), name_en: data.name_en.trim() },
	});
}

export async function deleteAttributeValueGroup(id: string) {
	await isAuthorized();
	return prisma.attributeValueGroup.delete({ where: { id } });
}
