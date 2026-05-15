"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type TestimonialRow = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	videoUrl: string | null;
	imageUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type TestimonialInput = {
	title: string;
	title_en: string;
	subtitle?: string | null;
	subtitle_en?: string | null;
	description: string;
	description_en: string;
	videoUrl?: string | null;
	imageUrl?: string | null;
};

export async function getTestimonialById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.testimonial.findUnique({
			where: { id },
		})) as TestimonialRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getTestimonials(opts?: {
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
						title: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						title_en: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						subtitle: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						subtitle_en: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.testimonial.findMany({
				orderBy: { createdAt: "desc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.testimonial.count({ where }),
		]);
		return { items: items as TestimonialRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as TestimonialRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function createTestimonial(data: TestimonialInput) {
	await isAuthorized();
	return prisma.testimonial.create({
		data: {
			title: data.title.trim(),
			title_en: data.title_en.trim(),
			subtitle: data.subtitle?.trim() ?? null,
			subtitle_en: data.subtitle_en?.trim() ?? null,
			description: data.description.trim(),
			description_en: data.description_en.trim(),
			videoUrl: data.videoUrl?.trim() || null,
			imageUrl: data.imageUrl?.trim() || null,
		},
	});
}

export async function updateTestimonial(
	id: string,
	data: Partial<TestimonialInput>
) {
	await isAuthorized();
	return prisma.testimonial.update({
		where: { id },
		data: {
			...(data.title !== undefined && { title: data.title.trim() }),
			...(data.title_en !== undefined && { title_en: data.title_en.trim() }),
			...(data.subtitle !== undefined && {
				subtitle: data.subtitle?.trim() ?? null,
			}),
			...(data.subtitle_en !== undefined && {
				subtitle_en: data.subtitle_en?.trim() ?? null,
			}),
			...(data.description !== undefined && {
				description: data.description.trim(),
			}),
			...(data.description_en !== undefined && {
				description_en: data.description_en.trim(),
			}),
			...(data.videoUrl !== undefined && {
				videoUrl: data.videoUrl?.trim() || null,
			}),
			...(data.imageUrl !== undefined && {
				imageUrl: data.imageUrl?.trim() || null,
			}),
		},
	});
}

export async function deleteTestimonial(id: string) {
	await isAuthorized();
	return prisma.testimonial.delete({ where: { id } });
}

/** Public: testimonials — no auth required. Pass limit=0 for all. */
export async function getTestimonialsPublic(limit = 6) {
	try {
		return (await prisma.testimonial.findMany({
			orderBy: { createdAt: "desc" },
			...(limit > 0 ? { take: limit } : {}),
		})) as TestimonialRow[];
	} catch (error) {
		return handleTableMissing(error, [] as TestimonialRow[]);
	}
}
