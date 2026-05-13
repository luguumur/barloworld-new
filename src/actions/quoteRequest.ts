"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { createNotificationPublic } from "./notification";

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

export async function getQuoteRequests(search?: string) {
	await isAuthorized();
	try {
		return await prisma.quoteRequest.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ firstName: { contains: search.trim(), mode: "insensitive" } },
							{ lastName: { contains: search.trim(), mode: "insensitive" } },
							{ email: { contains: search.trim(), mode: "insensitive" } },
							{ productName: { contains: search.trim(), mode: "insensitive" } },
							{ phoneNumber: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as QuoteRequestRow[];
	} catch (error) {
		return handleTableMissing(error, [] as QuoteRequestRow[]);
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
