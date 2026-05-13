"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { revalidateTag } from "next/cache";
import { unstable_cache } from "next/cache";

export type TranslationRow = {
	id: string;
	key: string;
	value_mn: string;
	value_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TranslationInput = {
	key: string;
	value_mn: string;
	value_en: string;
};

export async function getTranslationById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.translation.findUnique({
			where: { id },
		})) as TranslationRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getTranslations(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.translation.findMany({
			orderBy: { key: "asc" },
			where: search?.trim()
				? {
						OR: [
							{ key: { contains: search.trim(), mode: "insensitive" } },
							{ value_mn: { contains: search.trim(), mode: "insensitive" } },
							{ value_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as TranslationRow[];
	} catch (error) {
		return handleTableMissing(error, [] as TranslationRow[]);
	}
}

export async function createTranslation(data: TranslationInput) {
	await isAuthorized();
	const result = await prisma.translation.create({
		data: {
			key: data.key.trim(),
			value_mn: data.value_mn.trim(),
			value_en: data.value_en.trim(),
		},
	});
	revalidateTag("translations");
	return result;
}

export async function updateTranslation(
	id: string,
	data: Partial<TranslationInput>
) {
	await isAuthorized();
	const result = await prisma.translation.update({
		where: { id },
		data: {
			...(data.key !== undefined && { key: data.key.trim() }),
			...(data.value_mn !== undefined && { value_mn: data.value_mn.trim() }),
			...(data.value_en !== undefined && { value_en: data.value_en.trim() }),
		},
	});
	revalidateTag("translations");
	return result;
}

export async function deleteTranslation(id: string) {
	await isAuthorized();
	const result = await prisma.translation.delete({ where: { id } });
	revalidateTag("translations");
	return result;
}

/** Public: all translations for i18n — cached, revalidated on any mutation */
export const getTranslationsPublic = unstable_cache(
	async (): Promise<TranslationRow[]> => {
		try {
			return (await prisma.translation.findMany({
				orderBy: { key: "asc" },
			})) as TranslationRow[];
		} catch (error) {
			return handleTableMissing(error, [] as TranslationRow[]);
		}
	},
	["translations-public"],
	{ tags: ["translations"], revalidate: 3600 }
);
