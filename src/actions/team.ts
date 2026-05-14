"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type TeamRow = {
	id: string;
	name: string;
	name_en: string;
	pos: string;
	pos_en: string;
	image: string | null;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export type TeamInput = {
	name: string;
	name_en: string;
	pos: string;
	pos_en: string;
	image?: string | null;
	order?: number;
};

export async function getTeamById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.team.findUnique({ where: { id } })) as TeamRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getTeams(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.team.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ name_en: { contains: search.trim(), mode: "insensitive" } },
							{ pos: { contains: search.trim(), mode: "insensitive" } },
							{ pos_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as TeamRow[];
	} catch (error) {
		return handleTableMissing(error, [] as TeamRow[]);
	}
}

/** Public — no auth required */
export async function getTeamsPublic() {
	try {
		return (await prisma.team.findMany({
			orderBy: [{ order: "asc" }, { createdAt: "asc" }],
		})) as TeamRow[];
	} catch (error) {
		return handleTableMissing(error, [] as TeamRow[]);
	}
}

export async function createTeam(data: TeamInput) {
	await isAuthorized();
	return prisma.team.create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			pos: data.pos.trim(),
			pos_en: data.pos_en.trim(),
			image: data.image?.trim() || null,
			order: data.order ?? 0,
		},
	});
}

export async function updateTeam(id: string, data: Partial<TeamInput>) {
	await isAuthorized();
	return prisma.team.update({
		where: { id },
		data: {
			...(data.name !== undefined && { name: data.name.trim() }),
			...(data.name_en !== undefined && { name_en: data.name_en.trim() }),
			...(data.pos !== undefined && { pos: data.pos.trim() }),
			...(data.pos_en !== undefined && { pos_en: data.pos_en.trim() }),
			...(data.image !== undefined && { image: data.image?.trim() || null }),
			...(data.order !== undefined && { order: data.order }),
		},
	});
}

export async function deleteTeam(id: string) {
	await isAuthorized();
	return prisma.team.delete({ where: { id } });
}

export async function reorderTeams(orderedIds: string[]) {
	await isAuthorized();
	if (orderedIds.length === 0) return;
	const whenClauses = orderedIds.map((id, i) => Prisma.sql`WHEN ${id} THEN ${i}`);
	const inList = orderedIds.map((id) => Prisma.sql`${id}`);
	await prisma.$executeRaw`
		UPDATE teams
		SET "order" = CASE id ${Prisma.join(whenClauses, " ")} ELSE "order" END
		WHERE id IN (${Prisma.join(inList)})
	`;
}
