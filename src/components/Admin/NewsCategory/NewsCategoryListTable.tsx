"use client";
import NewsCategoryAction from "./NewsCategoryAction";

type Category = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function NewsCategoryListTable({
	categories,
	onEdit,
}: {
	categories: Category[];
	onEdit: (category: Category) => void;
}) {
	return (
		<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
			<table className='w-full'>
				<thead>
					<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
						<th className='min-w-[150px] px-4 py-5 text-left font-satoshi text-sm font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
							Name (MN)
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-sm font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell'>
							Name (EN)
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-sm font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Created
						</th>
						<th className='hidden px-4 py-5 text-right font-satoshi text-sm font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category) => (
						<tr
							key={category.id}
							className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
						>
							<td className='p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:pl-7.5'>
								{category.name}
								<span className='block xl:hidden'>EN: {category.name_en}</span>
								<span className='block md:hidden'>
									Created: {new Date(category.createdAt).toLocaleDateString()}
								</span>
								<span className='block lsm:hidden'>
									<NewsCategoryAction category={category} onEdit={onEdit} />
								</span>
							</td>
							<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 xl:table-cell'>
								{category.name_en}
							</td>
							<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
								{new Date(category.createdAt).toLocaleDateString()}
							</td>
							<td className='hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
								<NewsCategoryAction category={category} onEdit={onEdit} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
