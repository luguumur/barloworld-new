"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { createNotificationPublic } from "./notification";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type QuoteRequestRow = {
	id: string;
	firstName: string;
	lastName: string;
	title: string | null;
	contactState: string | null;
	phoneNumber: string;
	email: string;
	productName: string;
	message: string | null;
	status: string;
	createdAt: Date;
	updatedAt: Date;
};

export type QuoteRequestInput = {
	firstName: string;
	lastName: string;
	title?: string | null;
	contactState?: string | null;
	phoneNumber: string;
	email: string;
	productName: string;
	message?: string | null;
};

/** Public — no auth required */
export async function createQuoteRequestPublic(data: QuoteRequestInput) {
	try {
		const quote = await prisma.quoteRequest.create({
			data: {
				firstName: data.firstName.trim(),
				lastName: data.lastName.trim(),
				title: data.title?.trim() ?? null,
				contactState: data.contactState?.trim() ?? null,
				phoneNumber: data.phoneNumber.trim(),
				email: data.email.trim(),
				productName: data.productName.trim(),
				message: data.message?.trim() ?? null,
			},
		});

		// also create a bell notification for admin
		await createNotificationPublic({
			title: `Quote request: ${data.productName.trim()}`,
			message: `${data.firstName.trim()} ${data.lastName.trim()} — ${data.email.trim()}`,
			senderName: `${data.firstName.trim()} ${data.lastName.trim()}`,
			senderEmail: data.email.trim(),
			senderPhone: data.phoneNumber.trim(),
		});

		return quote;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getQuoteRequests(opts?: {
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
						firstName: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						lastName: {
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
						productName: {
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
			prisma.quoteRequest.findMany({
				orderBy: { createdAt: "desc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.quoteRequest.count({ where }),
		]);
		return { items: items as QuoteRequestRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as QuoteRequestRow[],
			total: 0,
			page: 1,
		});
	}
}

export async function updateQuoteRequestStatus(id: string, status: string) {
	await isAuthorized();
	return prisma.quoteRequest.update({ where: { id }, data: { status } });
}

export async function deleteQuoteRequest(id: string) {
	await isAuthorized();
	return prisma.quoteRequest.delete({ where: { id } });
}
