"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

const db = prisma as typeof prisma & {
	testimonial: {
		findMany: (args?: {
			orderBy?: { createdAt: "asc" | "desc" };
		}) => Promise<TestimonialRow[]>;
		findUnique: (args: {
			where: { id: string };
		}) => Promise<TestimonialRow | null>;
		create: (args: { data: TestimonialInput }) => Promise<TestimonialRow>;
		update: (args: {
			where: { id: string };
			data: Partial<TestimonialInput>;
		}) => Promise<TestimonialRow>;
		delete: (args: { where: { id: string } }) => Promise<TestimonialRow>;
	};
};

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
		return await db.testimonial.findUnique({
			where: { id },
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return null;
		}
		throw error;
	}
}

export async function getTestimonials(search?: string) {
	await isAuthorized();

	try {
		const list = await db.testimonial.findMany({
			orderBy: { createdAt: "desc" },
		});

		if (search?.trim()) {
			const q = search.trim().toLowerCase();
			return list.filter(
				(t) =>
					t.title.toLowerCase().includes(q) ||
					t.title_en.toLowerCase().includes(q) ||
					(t.subtitle && t.subtitle.toLowerCase().includes(q)) ||
					(t.subtitle_en && t.subtitle_en.toLowerCase().includes(q))
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

export async function createTestimonial(data: TestimonialInput) {
	await isAuthorized();

	return await db.testimonial.create({
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

export async function updateTestimonial(id: string, data: Partial<TestimonialInput>) {
	await isAuthorized();

	return await db.testimonial.update({
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

	return await db.testimonial.delete({
		where: { id },
	});
}
