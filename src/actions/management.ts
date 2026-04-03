"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	management: {
		findMany: (args?: unknown) => Promise<ManagementRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<ManagementRow | null>;
		create: (args: { data: ManagementInput }) => Promise<ManagementRow>;
		update: (args: { where: { id: string }; data: Partial<ManagementInput> }) => Promise<ManagementRow>;
		delete: (args: { where: { id: string } }) => Promise<ManagementRow>;
	};
};

function getDelegate() {
	return db.management;
}

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
	const delegate = getDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({ where: { id } });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") return null;
		if (error instanceof Error && error.message.includes("does not exist")) return null;
		throw error;
	}
}

export async function getManagements(search?: string) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) return [];
	try {
		const list = await delegate.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(m) =>
					m.name.toLowerCase().includes(q) ||
					m.position.toLowerCase().includes(q)
			);
		}
		return list;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") return [];
		if (error instanceof Error && error.message.includes("does not exist")) return [];
		throw error;
	}
}

export async function createManagement(data: ManagementInput) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Management model. Run: npx prisma generate and restart.");
	return await delegate.create({
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
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Management model. Run: npx prisma generate and restart.");
	return await delegate.update({
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
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Management model. Run: npx prisma generate and restart.");
	return await delegate.delete({ where: { id } });
}

export async function reorderManagements(orderedIds: string[]) {
	await isAuthorized();
	await Promise.all(
		orderedIds.map((id, index) =>
			prisma.management.update({
				where: { id },
				data: { order: index },
			})
		)
	);
}
