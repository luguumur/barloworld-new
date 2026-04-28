"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type AttributeValueGroupRow = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getAttributeValueGroups(search?: string) {
	await isAuthorized();
	try {
		return await prisma.attributeValueGroup.findMany({
			orderBy: { createdAt: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as AttributeValueGroupRow[];
	} catch (error) {
		return handleTableMissing(error, [] as AttributeValueGroupRow[]);
	}
}

export async function getAttributeValueGroupById(id: string) {
	await isAuthorized();
	try {
		return await prisma.attributeValueGroup.findUnique({ where: { id } }) as AttributeValueGroupRow | null;
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
