import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
	return (
		<nav className='flex items-center gap-2 text-sm text-gray-5'>
			{items.map((item, i) => (
				<span key={i} className='flex items-center gap-2'>
					{i > 0 && <span className='text-gray-4'>/</span>}
					{item.href ? (
						<Link
							href={item.href}
							className='font-medium transition-colors hover:text-primary'
						>
							{item.label}
						</Link>
					) : (
						<span className='font-semibold text-dark dark:text-white'>
							{item.label}
						</span>
					)}
				</span>
			))}
		</nav>
	);
}
