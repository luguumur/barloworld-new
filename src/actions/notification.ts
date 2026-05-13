"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type NotificationRow = {
	id: string;
	title: string;
	message: string;
	senderName: string | null;
	senderEmail: string | null;
	senderPhone: string | null;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type NotificationInput = {
	title: string;
	message: string;
	senderName?: string | null;
	senderEmail?: string | null;
	senderPhone?: string | null;
};

/** Public — no auth required. Used by the client inquiry form. */
export async function createNotificationPublic(data: NotificationInput) {
	try {
		return await prisma.notification.create({
			data: {
				title: data.title.trim(),
				message: data.message.trim(),
				senderName: data.senderName?.trim() ?? null,
				senderEmail: data.senderEmail?.trim() ?? null,
				senderPhone: data.senderPhone?.trim() ?? null,
			},
		});
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function getNotifications(search?: string) {
	await isAuthorized();
	try {
		return await prisma.notification.findMany({
			orderBy: { createdAt: "desc" },
			where: search?.trim()
				? {
						OR: [
							{ title: { contains: search.trim(), mode: "insensitive" } },
							{ message: { contains: search.trim(), mode: "insensitive" } },
							{ senderName: { contains: search.trim(), mode: "insensitive" } },
							{ senderEmail: { contains: search.trim(), mode: "insensitive" } },
						],
					}
				: undefined,
		}) as NotificationRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NotificationRow[]);
	}
}

export async function getUnreadCount() {
	await isAuthorized();
	try {
		return await prisma.notification.count({ where: { isRead: false } });
	} catch (error) {
		return handleTableMissing(error, 0);
	}
}

export async function getRecentNotifications(limit = 5) {
	await isAuthorized();
	try {
		return await prisma.notification.findMany({
			orderBy: { createdAt: "desc" },
			take: limit,
		}) as NotificationRow[];
	} catch (error) {
		return handleTableMissing(error, [] as NotificationRow[]);
	}
}

export async function markAsRead(id: string) {
	await isAuthorized();
	return prisma.notification.update({ where: { id }, data: { isRead: true } });
}

export async function markAllAsRead() {
	await isAuthorized();
	return prisma.notification.updateMany({
		where: { isRead: false },
		data: { isRead: true },
	});
}

export async function deleteNotification(id: string) {
	await isAuthorized();
	return prisma.notification.delete({ where: { id } });
}
