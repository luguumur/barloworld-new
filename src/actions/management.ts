"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

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
		return (await prisma.management.findUnique({
			where: { id },
		})) as ManagementRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getManagements(opts?: {
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
						position: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.management.findMany({
				orderBy: [{ order: "asc" }, { createdAt: "asc" }],
				where,
				skip,
				take: pageSize,
			}),
			prisma.management.count({ where }),
		]);
		return { items: items as ManagementRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as ManagementRow[],
			total: 0,
			page: 1,
		});
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

export async function updateManagement(
	id: string,
	data: Partial<ManagementInput>
) {
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
	if (orderedIds.length === 0) return;
	const whenClauses = orderedIds.map(
		(id, i) => Prisma.sql`WHEN ${id} THEN ${i}`
	);
	const inList = orderedIds.map((id) => Prisma.sql`${id}`);
	await prisma.$executeRaw`
		UPDATE managements
		SET "order" = CASE id ${Prisma.join(whenClauses, " ")} ELSE "order" END
		WHERE id IN (${Prisma.join(inList)})
	`;
}
