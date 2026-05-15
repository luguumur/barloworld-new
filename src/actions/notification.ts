"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

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

export async function getNotifications(opts?: {
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
						message: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						senderName: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
					{
						senderEmail: {
							contains: opts.search.trim(),
							mode: "insensitive" as const,
						},
					},
				],
			}
		: undefined;
	try {
		const [items, total] = await Promise.all([
			prisma.notification.findMany({
				orderBy: { createdAt: "desc" },
				where,
				skip,
				take: pageSize,
			}),
			prisma.notification.count({ where }),
		]);
		return { items: items as NotificationRow[], total, page };
	} catch (error) {
		return handleTableMissing(error, {
			items: [] as NotificationRow[],
			total: 0,
			page: 1,
		});
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
		return (await prisma.notification.findMany({
			orderBy: { createdAt: "desc" },
			take: limit,
		})) as NotificationRow[];
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
