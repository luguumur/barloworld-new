import DataStatsCard from "@/components/Admin/Dashboard/DataStatsCard";
import {
	RecentContactRequestsTable,
	RecentQuoteRequestsTable,
} from "@/components/Admin/Dashboard/RecentRequestsTable";
import { ContentSummaryCard } from "@/components/Admin/Dashboard/ContentSummaryCard";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import {
	getDashboardStats,
	getRecentContactRequests,
	getRecentQuoteRequests,
} from "@/actions/dashboard";
import type { DataStats } from "@/staticData/statsData";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Dashboard - ${process.env.SITE_NAME}`,
	description: `Dashboard Description`,
};

export const revalidate = 0;

function trendPercent(
	thisMonth: number,
	lastMonth: number
): { percents: string; isIncrease: boolean } {
	if (lastMonth === 0)
		return {
			percents: thisMonth > 0 ? "+100%" : "0%",
			isIncrease: thisMonth > 0,
		};
	const diff = ((thisMonth - lastMonth) / lastMonth) * 100;
	return {
		percents: `${diff >= 0 ? "+" : ""}${diff.toFixed(0)}%`,
		isIncrease: diff >= 0,
	};
}

export default async function AdminDashboard() {
	const [stats, recentContacts, recentQuotes] = await Promise.all([
		getDashboardStats(),
		getRecentContactRequests(5),
		getRecentQuoteRequests(5),
	]);

	const contactTrend = trendPercent(
		stats.contactRequests.thisMonth,
		stats.contactRequests.lastMonth
	);
	const quoteTrend = trendPercent(
		stats.quoteRequests.thisMonth,
		stats.quoteRequests.lastMonth
	);

	const dataStats: DataStats[] = [
		{
			id: 1,
			content: "Active Products",
			value: String(stats.products.active),
			isIncrease: true,
			percents: `${stats.products.total} total`,
			color: "#3FD97F",
			icon: (
				<svg
					width='26'
					height='26'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M12 12V16M10 14H14'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			),
		},
		{
			id: 2,
			content: "New Contact Requests",
			value: String(stats.contactRequests.newCount),
			isIncrease: contactTrend.isIncrease,
			percents: contactTrend.percents,
			color: "#FF9C55",
			icon: (
				<svg
					width='26'
					height='26'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
		{
			id: 3,
			content: "New Quote Requests",
			value: String(stats.quoteRequests.newCount),
			isIncrease: quoteTrend.isIncrease,
			percents: quoteTrend.percents,
			color: "#8155FF",
			icon: (
				<svg
					width='26'
					height='26'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M14 2V8H20M16 13H8M16 17H8M10 9H8'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
		{
			id: 4,
			content: "News Articles",
			value: String(stats.news.total),
			isIncrease: true,
			percents: `${stats.deals.active} active deals`,
			color: "#18BFFF",
			icon: (
				<svg
					width='26'
					height='26'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M19 20H5C3.9 20 3 19.1 3 18V6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20Z'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M3 9H21M9 20V9'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
	];

	const contentItems = [
		{ label: "Products", count: stats.products.total, href: "/admin/product" },
		{
			label: "Active Deals",
			count: stats.deals.active,
			href: "/admin/deals-specials",
		},
		{
			label: "Magazines",
			count: stats.magazines.total,
			href: "/admin/magazine",
		},
		{ label: "Team Members", count: stats.team.total, href: "/admin/team" },
		{ label: "News Articles", count: stats.news.total, href: "/admin/news" },
	];

	return (
		<>
			{/* <Breadcrumb pageTitle='Dashboard' /> */}

			<div className='mb-11 grid grid-cols-1 gap-7.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4'>
				{dataStats.map((data) => (
					<DataStatsCard key={data.id} data={data} />
				))}
			</div>

			<div>
				<div className='mb-7.5'>
					<h3 className='mb-2 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white'>
						Overview
					</h3>
					<p className='font-satoshi font-medium tracking-[-.2px] text-body dark:text-gray-4'>
						Recent customer activity and content summary.
					</p>
				</div>

				<div className='grid gap-7.5 md:grid-cols-2 xl:grid-cols-3'>
					<RecentContactRequestsTable rows={recentContacts} />
					<RecentQuoteRequestsTable rows={recentQuotes} />
					<ContentSummaryCard items={contentItems} />
				</div>
			</div>
		</>
	);
}
