"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type AttributeRow = {
	id: string;
	name: string;
	name_en: string;
	data_type: string;
	createdAt: Date;
	updatedAt: Date;
};

export async function getAttributes(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.attribute.findMany({
			orderBy: { createdAt: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as AttributeRow[];
	} catch (error) {
		return handleTableMissing(error, [] as AttributeRow[]);
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
