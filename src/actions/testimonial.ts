"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

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

export async function getTestimonials(search?: string) {
	await isAuthorized();
	try {
		return (await prisma.testimonial.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ title: { contains: search.trim(), mode: "insensitive" } },
							{ title_en: { contains: search.trim(), mode: "insensitive" } },
							{ subtitle: { contains: search.trim(), mode: "insensitive" } },
							{ subtitle_en: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		})) as TestimonialRow[];
	} catch (error) {
		return handleTableMissing(error, [] as TestimonialRow[]);
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
