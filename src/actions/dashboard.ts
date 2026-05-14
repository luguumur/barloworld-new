"use server";
import { prisma } from "@/libs/prismaDb";
import { handleTableMissing } from "@/libs/prismaError";

export type DashboardStats = {
	products: { total: number; active: number };
	contactRequests: { total: number; newCount: number; thisMonth: number; lastMonth: number };
	quoteRequests: { total: number; newCount: number; thisMonth: number; lastMonth: number };
	news: { total: number };
	deals: { total: number; active: number };
	magazines: { total: number };
	team: { total: number };
};

export type RecentContactRequest = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	subject: string | null;
	status: string;
	createdAt: Date;
};

export type RecentQuoteRequest = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	productName: string;
	status: string;
	createdAt: Date;
};

function monthRange(monthsAgo: number) {
	const now = new Date();
	const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
	const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 0, 23, 59, 59);
	return { gte: start, lte: end };
}

export async function getDashboardStats(): Promise<DashboardStats> {
	const thisMonthRange = monthRange(0);
	const lastMonthRange = monthRange(1);

	const [
		productTotal,
		productActive,
		contactTotal,
		contactNew,
		contactThisMonth,
		contactLastMonth,
		quoteTotal,
		quoteNew,
		quoteThisMonth,
		quoteLastMonth,
		newsTotal,
		dealTotal,
		dealActive,
		magazineTotal,
		teamTotal,
	] = await Promise.all([
		prisma.product.count().catch((e) => handleTableMissing(e, 0)),
		prisma.product.count({ where: { status: "ACTIVE" } }).catch((e) => handleTableMissing(e, 0)),
		prisma.contactRequest.count().catch((e) => handleTableMissing(e, 0)),
		prisma.contactRequest.count({ where: { status: "NEW" } }).catch((e) => handleTableMissing(e, 0)),
		prisma.contactRequest.count({ where: { createdAt: thisMonthRange } }).catch((e) => handleTableMissing(e, 0)),
		prisma.contactRequest.count({ where: { createdAt: lastMonthRange } }).catch((e) => handleTableMissing(e, 0)),
		prisma.quoteRequest.count().catch((e) => handleTableMissing(e, 0)),
		prisma.quoteRequest.count({ where: { status: "NEW" } }).catch((e) => handleTableMissing(e, 0)),
		prisma.quoteRequest.count({ where: { createdAt: thisMonthRange } }).catch((e) => handleTableMissing(e, 0)),
		prisma.quoteRequest.count({ where: { createdAt: lastMonthRange } }).catch((e) => handleTableMissing(e, 0)),
		prisma.news.count().catch((e) => handleTableMissing(e, 0)),
		prisma.deal.count().catch((e) => handleTableMissing(e, 0)),
		prisma.deal.count({ where: { status: "ACTIVE" } }).catch((e) => handleTableMissing(e, 0)),
		prisma.magazine.count().catch((e) => handleTableMissing(e, 0)),
		prisma.team.count().catch((e) => handleTableMissing(e, 0)),
	]);

	return {
		products: { total: productTotal, active: productActive },
		contactRequests: { total: contactTotal, newCount: contactNew, thisMonth: contactThisMonth, lastMonth: contactLastMonth },
		quoteRequests: { total: quoteTotal, newCount: quoteNew, thisMonth: quoteThisMonth, lastMonth: quoteLastMonth },
		news: { total: newsTotal },
		deals: { total: dealTotal, active: dealActive },
		magazines: { total: magazineTotal },
		team: { total: teamTotal },
	};
}

export async function getRecentContactRequests(limit = 5): Promise<RecentContactRequest[]> {
	return prisma.contactRequest
		.findMany({
			orderBy: { createdAt: "desc" },
			take: limit,
			select: { id: true, name: true, email: true, phoneNumber: true, subject: true, status: true, createdAt: true },
		})
		.catch((e) => handleTableMissing(e, []));
}

export async function getRecentQuoteRequests(limit = 5): Promise<RecentQuoteRequest[]> {
	return prisma.quoteRequest
		.findMany({
			orderBy: { createdAt: "desc" },
			take: limit,
			select: { id: true, firstName: true, lastName: true, email: true, phoneNumber: true, productName: true, status: true, createdAt: true },
		})
		.catch((e) => handleTableMissing(e, []));
}
