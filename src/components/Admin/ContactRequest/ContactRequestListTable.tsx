"use client";
import { useState } from "react";
import ContactRequestAction from "./ContactRequestAction";
import ContactRequestDetailDrawer from "./ContactRequestDetailDrawer";
import { ContactRequestRow } from "@/actions/contactRequest";

export default function ContactRequestListTable({
	contacts,
}: {
	contacts: ContactRequestRow[];
}) {
	const [selected, setSelected] = useState<ContactRequestRow | null>(null);

	return (
		<>
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
								Subject
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
						{contacts.map((c) => (
							<tr
								key={c.id}
								onClick={() => setSelected(c)}
								className={`cursor-pointer border-b border-stroke transition-colors last-of-type:border-b-0 hover:bg-gray-1 dark:border-stroke-dark dark:hover:bg-white/5 ${
									c.status === "NEW" ? "bg-primary/5 dark:bg-primary/10" : ""
								}`}
							>
								<td className='p-4 text-left sm:pl-7.5'>
									<p className='font-medium text-dark dark:text-white'>
										{c.name}
									</p>
									<span className='block text-sm text-body/70 md:hidden'>
										{c.email}
									</span>
									<span className='block lsm:hidden'>
										<ContactRequestAction contact={c} />
									</span>
								</td>
								<td className='hidden p-4 text-left md:table-cell'>
									<p className='text-sm text-dark dark:text-white'>{c.email}</p>
									<p className='text-sm text-body dark:text-gray-5'>
										{c.phoneNumber}
									</p>
								</td>
								<td className='hidden max-w-[200px] p-4 text-left xl:table-cell'>
									<p className='line-clamp-1 text-sm text-dark dark:text-white'>
										{c.subject || "—"}
									</p>
									{c.message && (
										<p className='line-clamp-2 text-xs text-body dark:text-gray-5'>
											{c.message}
										</p>
									)}
								</td>
								<td className='hidden whitespace-nowrap p-4 text-left text-sm text-body dark:text-gray-5 lg:table-cell'>
									{new Date(c.createdAt).toLocaleDateString()}
								</td>
								<td
									className='hidden p-4 text-right lsm:table-cell sm:pr-7.5'
									onClick={(e) => e.stopPropagation()}
								>
									<ContactRequestAction contact={c} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ContactRequestDetailDrawer
				contact={selected}
				onClose={() => setSelected(null)}
			/>
		</>
	);
}
