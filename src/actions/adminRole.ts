"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type AdminRoleRow = {
	id: string;
	name: string;
	label: string;
	color: string;
	permissions: string[];
	createdAt: Date;
	updatedAt: Date;
};

export async function getAdminRoles(): Promise<AdminRoleRow[]> {
	await isAuthorized();
	try {
		return (await prisma.adminRole.findMany({
			orderBy: { createdAt: "asc" },
		})) as AdminRoleRow[];
	} catch (e) {
		return handleTableMissing(e, []);
	}
}

export async function getAdminRoleByName(name: string): Promise<AdminRoleRow | null> {
	try {
		return (await prisma.adminRole.findUnique({ where: { name } })) as AdminRoleRow | null;
	} catch (e) {
		return handleTableMissing(e, null);
	}
}

export async function createAdminRole(data: {
	name: string;
	label: string;
	color?: string;
	permissions: string[];
}): Promise<AdminRoleRow> {
	await isAuthorized();
	return prisma.adminRole.create({
		data: {
			name: data.name.toUpperCase().trim(),
			label: data.label.trim(),
			color: data.color ?? "#6366f1",
			permissions: data.permissions,
		},
	}) as unknown as AdminRoleRow;
}

export async function updateAdminRole(
	id: string,
	data: { label?: string; color?: string; permissions?: string[] }
): Promise<AdminRoleRow> {
	await isAuthorized();
	return prisma.adminRole.update({
		where: { id },
		data: {
			...(data.label !== undefined && { label: data.label.trim() }),
			...(data.color !== undefined && { color: data.color }),
			...(data.permissions !== undefined && { permissions: data.permissions }),
		},
	}) as unknown as AdminRoleRow;
}

export async function deleteAdminRole(id: string) {
	await isAuthorized();
	return prisma.adminRole.delete({ where: { id } });
}
