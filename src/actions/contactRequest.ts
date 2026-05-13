"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { createNotificationPublic } from "./notification";

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

export async function getContactRequests(search?: string) {
	await isAuthorized();
	try {
		return await prisma.contactRequest.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ name: { contains: search.trim(), mode: "insensitive" } },
							{ email: { contains: search.trim(), mode: "insensitive" } },
							{ subject: { contains: search.trim(), mode: "insensitive" } },
							{ phoneNumber: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as ContactRequestRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ContactRequestRow[]);
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
