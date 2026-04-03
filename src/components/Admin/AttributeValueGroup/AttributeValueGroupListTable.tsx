"use client";
import AttributeValueGroupAction from "./AttributeValueGroupAction";

type Item = { id: string; name: string; name_en: string; createdAt: Date };

export default function AttributeValueGroupListTable({ items }: { items: Item[] }) {
	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			<table className="w-full">
				<thead>
					<tr className="border-b border-stroke dark:border-stroke-dark">
						<th className="px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5">
							Name (MN)
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell">
							Name (EN)
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell">
							Created
						</th>
						<th className="px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id} className="border-b border-stroke last:border-0 dark:border-stroke-dark">
							<td className="p-4 text-body dark:text-gray-5 sm:pl-7.5">
								<span className="font-medium">{item.name}</span>
								<span className="block md:hidden text-sm text-body/80">{item.name_en}</span>
								<span className="block sm:hidden"><AttributeValueGroupAction item={item} /></span>
							</td>
							<td className="hidden p-4 text-body dark:text-gray-5 md:table-cell">{item.name_en}</td>
							<td className="hidden p-4 text-body dark:text-gray-5 sm:table-cell">
								{new Date(item.createdAt).toLocaleDateString()}
							</td>
							<td className="hidden p-4 text-right sm:table-cell sm:pr-7.5">
								<AttributeValueGroupAction item={item} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
