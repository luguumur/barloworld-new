"use client";
import QuoteRequestAction from "./QuoteRequestAction";
import { QuoteRequestRow } from "@/actions/quoteRequest";

const STATUS_COLOR: Record<string, string> = {
	NEW: "bg-primary/10 text-primary",
	READ: "bg-yellow-100 text-yellow-700",
	DONE: "bg-green-100 text-green-700",
};

export default function QuoteRequestListTable({
	quotes,
}: {
	quotes: QuoteRequestRow[];
}) {
	return (
		<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
			<table className='w-full'>
				<thead>
					<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
						<th className='min-w-[160px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
							Name
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Contact
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell'>
							Equipment
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lg:table-cell'>
							Date
						</th>
						<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
							Status
						</th>
					</tr>
				</thead>
				<tbody>
					{quotes.map((q) => (
						<tr
							key={q.id}
							className={`border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark ${
								q.status === "NEW" ? "bg-primary/5 dark:bg-primary/10" : ""
							}`}
						>
							<td className='p-4 text-left sm:pl-7.5'>
								<p className='font-medium text-dark dark:text-white'>
									{q.firstName} {q.lastName}
								</p>
								{q.title && (
									<p className='text-xs text-body dark:text-gray-5'>{q.title}</p>
								)}
								{q.contactState && (
									<p className='text-xs text-body dark:text-gray-5'>
										{q.contactState}
									</p>
								)}
								<span className='block lsm:hidden'>
									<QuoteRequestAction quote={q} />
								</span>
							</td>
							<td className='hidden p-4 text-left md:table-cell'>
								<p className='text-sm text-dark dark:text-white'>{q.email}</p>
								<p className='text-sm text-body dark:text-gray-5'>
									{q.phoneNumber}
								</p>
							</td>
							<td className='hidden max-w-[200px] p-4 text-left xl:table-cell'>
								<p className='line-clamp-2 text-sm text-dark dark:text-white'>
									{q.productName}
								</p>
								{q.message && (
									<p className='line-clamp-2 text-xs text-body dark:text-gray-5'>
										{q.message}
									</p>
								)}
							</td>
							<td className='hidden whitespace-nowrap p-4 text-left text-sm text-body dark:text-gray-5 lg:table-cell'>
								{new Date(q.createdAt).toLocaleDateString()}
							</td>
							<td className='hidden p-4 text-right lsm:table-cell sm:pr-7.5'>
								<QuoteRequestAction quote={q} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
