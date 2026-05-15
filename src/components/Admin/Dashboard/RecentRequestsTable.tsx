import Link from "next/link";
import type {
	RecentContactRequest,
	RecentQuoteRequest,
} from "@/actions/dashboard";

const STATUS_STYLES: Record<string, string> = {
	NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
	IN_PROGRESS:
		"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
	RESOLVED:
		"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
	CLOSED: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
};

function StatusBadge({ status }: { status: string }) {
	return (
		<span
			className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
				STATUS_STYLES[status] ?? STATUS_STYLES.CLOSED
			}`}
		>
			{status}
		</span>
	);
}

function formatDate(date: Date) {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function RecentContactRequestsTable({
	rows,
}: {
	rows: RecentContactRequest[];
}) {
	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='font-satoshi text-base font-bold text-dark dark:text-white'>
					Recent Contact Requests
				</h3>
				<Link
					href='/admin/contact-request'
					className='font-satoshi text-sm font-medium text-primary hover:underline'
				>
					View all
				</Link>
			</div>

			{rows.length === 0 ? (
				<p className='py-8 text-center font-satoshi text-sm text-body dark:text-gray-4'>
					No requests yet.
				</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='w-full text-left'>
						<thead>
							<tr className='border-b border-stroke dark:border-dark-3'>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Name
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Subject
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Date
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Status
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-stroke dark:divide-dark-3'>
							{rows.map((r) => (
								<tr key={r.id}>
									<td className='py-3 font-satoshi text-sm font-medium text-dark dark:text-white'>
										<div>{r.name}</div>
										<div className='text-xs text-body dark:text-gray-4'>
											{r.email}
										</div>
									</td>
									<td className='py-3 font-satoshi text-sm text-body dark:text-gray-4'>
										{r.subject ?? "—"}
									</td>
									<td className='whitespace-nowrap py-3 font-satoshi text-sm text-body dark:text-gray-4'>
										{formatDate(r.createdAt)}
									</td>
									<td className='py-3'>
										<StatusBadge status={r.status} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export function RecentQuoteRequestsTable({
	rows,
}: {
	rows: RecentQuoteRequest[];
}) {
	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='font-satoshi text-base font-bold text-dark dark:text-white'>
					Recent Quote Requests
				</h3>
				<Link
					href='/admin/quote-request'
					className='font-satoshi text-sm font-medium text-primary hover:underline'
				>
					View all
				</Link>
			</div>

			{rows.length === 0 ? (
				<p className='py-8 text-center font-satoshi text-sm text-body dark:text-gray-4'>
					No requests yet.
				</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='w-full text-left'>
						<thead>
							<tr className='border-b border-stroke dark:border-dark-3'>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Name
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Product
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Date
								</th>
								<th className='pb-3 font-satoshi text-xs font-semibold uppercase text-body dark:text-gray-4'>
									Status
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-stroke dark:divide-dark-3'>
							{rows.map((r) => (
								<tr key={r.id}>
									<td className='py-3 font-satoshi text-sm font-medium text-dark dark:text-white'>
										<div>
											{r.firstName} {r.lastName}
										</div>
										<div className='text-xs text-body dark:text-gray-4'>
											{r.email}
										</div>
									</td>
									<td className='py-3 font-satoshi text-sm text-body dark:text-gray-4'>
										{r.productName}
									</td>
									<td className='whitespace-nowrap py-3 font-satoshi text-sm text-body dark:text-gray-4'>
										{formatDate(r.createdAt)}
									</td>
									<td className='py-3'>
										<StatusBadge status={r.status} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
