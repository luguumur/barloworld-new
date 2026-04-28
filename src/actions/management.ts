"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type ManagementRow = {
	id: string;
	name: string;
	position: string;
	image: string | null;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export type ManagementInput = {
	name: string;
	position: string;
	image?: string | null;
	order?: number;
};

export async function getManagementById(id: string) {
	await isAuthorized();
	try {
		return await prisma.management.findUnique({ where: { id } }) as ManagementRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getManagements(search?: string) {
	await isAuthorized();
	try {
		return await prisma.management.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ position: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as ManagementRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ManagementRow[]);
	}
}

export async function createManagement(data: ManagementInput) {
	await isAuthorized();
	return prisma.management.create({
		data: {
			name: data.name.trim(),
			position: data.position.trim(),
			image: data.image?.trim() || null,
			order: data.order ?? 0,
		},
	});
}

export async function updateManagement(id: string, data: Partial<ManagementInput>) {
	await isAuthorized();
	return prisma.management.update({
		where: { id },
		data: {
			...(data.name !== undefined && { name: data.name.trim() }),
			...(data.position !== undefined && { position: data.position.trim() }),
			...(data.image !== undefined && { image: data.image?.trim() || null }),
			...(data.order !== undefined && { order: data.order }),
		},
	});
}

export async function deleteManagement(id: string) {
	await isAuthorized();
	return prisma.management.delete({ where: { id } });
}

export async function reorderManagements(orderedIds: string[]) {
	await isAuthorized();
	await Promise.all(
		orderedIds.map((id, index) =>
			prisma.management.update({ where: { id }, data: { order: index } })
		)
	);
}
