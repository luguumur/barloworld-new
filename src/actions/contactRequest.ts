"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { createNotificationPublic } from "./notification";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type ContactRequestRow = {
	id: string;
	name: string;
	subject: string | null;
	phoneNumber: string;
	email: string;
	message: string | null;
	status: string;
	createdAt: Date;
	updatedAt: Date;
};

export type ContactRequestInput = {
	name: string;
	subject?: string | null;
	phoneNumber: string;
	email: string;
	message?: string | null;
};

/** Public — no auth required */
export async function createContactRequestPublic(data: ContactRequestInput) {
	try {
		const contact = await prisma.contactRequest.create({
			data: {
				name: data.name.trim(),
				subject: data.subject?.trim() ?? null,
				phoneNumber: data.phoneNumber.trim(),
				email: data.email.trim(),
				message: data.message?.trim() ?? null,
			},
		});

		await createNotificationPublic({
			title: `Contact: ${data.subject?.trim() || "New message"}`,
			message: data.message?.trim() || `From ${data.name.trim()}`,
			senderName: data.name.trim(),
			senderEmail: data.email.trim(),
			senderPhone: data.phoneNumber.trim(),
		});

		return contact;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getContactRequests(opts?: {
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
						email: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						subject: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						phoneNumber: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.contactRequest.findMany({
				orderBy: { createdAt: "desc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.contactRequest.count({ where }),
		]);
		return { items: items as ContactRequestRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as ContactRequestRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function updateContactRequestStatus(id: string, status: string) {
	await isAuthorized();
	return prisma.contactRequest.update({ where: { id }, data: { status } });
}

export async function deleteContactRequest(id: string) {
	await isAuthorized();
	return prisma.contactRequest.delete({ where: { id } });
}
