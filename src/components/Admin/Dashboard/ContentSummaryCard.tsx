import Link from "next/link";

type Item = { label: string; count: number; href: string };

export function ContentSummaryCard({ items }: { items: Item[] }) {
	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
			<h3 className='mb-4 font-satoshi text-base font-bold text-dark dark:text-white'>
				Content Summary
			</h3>
			<ul className='divide-y divide-stroke dark:divide-dark-3'>
				{items.map((item) => (
					<li
						key={item.label}
						className='flex items-center justify-between py-3'
					>
						<Link
							href={item.href}
							className='font-satoshi text-sm font-medium text-body hover:text-primary dark:text-gray-4 dark:hover:text-primary'
						>
							{item.label}
						</Link>
						<span className='font-satoshi text-sm font-bold text-dark dark:text-white'>
							{item.count}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
