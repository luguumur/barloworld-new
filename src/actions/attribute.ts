"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as unknown as {
	attribute: {
		findMany: (args?: { orderBy?: { createdAt: "asc" } }) => Promise<AttributeRow[]>;
		findUnique: (args: { where: { id: string } }) => Promise<AttributeRow | null>;
		create: (args: {
			data: { name: string; name_en: string; data_type: string };
		}) => Promise<AttributeRow>;
		update: (args: {
			where: { id: string };
			data: { name: string; name_en: string; data_type: string };
		}) => Promise<AttributeRow>;
		delete: (args: { where: { id: string } }) => Promise<AttributeRow>;
	};
};

export type AttributeRow = {
	id: string;
	name: string;
	name_en: string;
	data_type: string;
	createdAt: Date;
	updatedAt: Date;
};

function getDelegate() {
	return db.attribute;
}

export async function getAttributes(search?: string) {
	await isAuthorized();
	try {
		const list = await getDelegate().findMany({
			orderBy: { createdAt: "asc" },
		});
		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(a) =>
					a.name.toLowerCase().includes(q) ||
					a.name_en.toLowerCase().includes(q)
			);
		}
		return list;
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return [];
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return [];
		}
		throw error;
	}
}

export async function getAttributeById(id: string) {
	await isAuthorized();
	try {
		return await getDelegate().findUnique({ where: { id } });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		throw error;
	}
}

export async function createAttribute(data: {
	name: string;
	name_en: string;
	data_type: string;
}) {
	await isAuthorized();
	return await getDelegate().create({
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
	return await getDelegate().update({
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
	return await getDelegate().delete({ where: { id } });
}
