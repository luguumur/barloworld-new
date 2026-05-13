"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type PageRow = {
	id: string;
	slug: string;
	title: string;
	title_en: string;
	description: string | null;
	description_en: string | null;
	content: string;
	content_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export type PageInput = {
	slug: string;
	title: string;
	title_en: string;
	description?: string | null;
	description_en?: string | null;
	content: string;
	content_en: string;
};

function normalizeSlug(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-_/]/g, "") // allow / for nested slugs like parts/undercarriage
		.replace(/\/+/g, "/") // collapse duplicate slashes
		.replace(/^\/|\/$/g, ""); // strip leading/trailing slashes
}

export async function getPageById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.page.findUnique({ where: { id } })) as PageRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

/** Public: get page by slug (no auth) */
export async function getPageBySlug(slug: string) {
	try {
		return (await prisma.page.findUnique({
			where: { slug: slug.toLowerCase().trim() },
		})) as PageRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

/** Public: all slugs for generateStaticParams */
export async function getAllPageSlugs(): Promise<string[]> {
	try {
		const pages = await prisma.page.findMany({
			select: { slug: true },
			orderBy: { createdAt: "desc" },
		});
		return pages.map((p) => p.slug);
	} catch (error) {
		return handleTableMissing(error, [] as string[]);
	}
}

export async function getPages(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.page.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ slug: { contains: search.trim(), mode: "insensitive" } },
							{ title: { contains: search.trim(), mode: "insensitive" } },
							{ title_en: { contains: search.trim(), mode: "insensitive" } },
							{ description: { contains: search.trim(), mode: "insensitive" } },
							{
								description_en: {
									contains: search.trim(),
									mode: "insensitive",
								},
							},
						],
					}
				: undefined,
		})) as PageRow[];
	} catch (error) {
		return handleTableMissing(error, [] as PageRow[]);
	}
}

export async function createPage(data: PageInput) {
	await isAuthorized();
	return prisma.page.create({
		data: {
			slug: normalizeSlug(data.slug) || "page",
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			description: data.description?.trim() ?? null,
			description_en: data.description_en?.trim() ?? null,
			content: data.content.trim(),
			content_en: data.content_en.trim(),
		},
	});
}

export async function updatePage(id: string, data: Partial<PageInput>) {
	await isAuthorized();
	return prisma.page.update({
		where: { id },
		data: {
			...(data.slug !== undefined && {
				slug: normalizeSlug(data.slug) || undefined,
			}),
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && { title_en: data.title_en.trim() }),
			...(data.description !== undefined && {
				description: data.description?.trim() ?? null,
			}),
			...(data.description_en !== undefined && {
				description_en: data.description_en?.trim() ?? null,
			}),
			...(data.content !== undefined && { content: data.content.trim() }),
			...(data.content_en !== undefined && {
				content_en: data.content_en.trim(),
			}),
		},
	});
}

export async function deletePage(id: string) {
	await isAuthorized();
	return prisma.page.delete({ where: { id } });
}
