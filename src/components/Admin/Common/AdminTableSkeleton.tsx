export default function AdminTableSkeleton({
	rows = 8,
	cols = 4,
	hasImage = false,
	pageTitle,
}: {
	rows?: number;
	cols?: number;
	hasImage?: boolean;
	pageTitle?: string;
}) {
	return (
		<div>
			{/* Breadcrumb skeleton */}
			<div className='mb-7.5 items-center justify-between md:flex'>
				{pageTitle ? (
					<h2 className='mb-4 text-lg font-bold text-dark dark:text-white md:mb-0'>
						{pageTitle}
					</h2>
				) : (
					<div className='mb-4 h-7 w-40 animate-pulse rounded bg-gray-2 dark:bg-white/10 md:mb-0' />
				)}
				<div className='flex items-center gap-2'>
					<div className='h-4 w-10 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
					<span className='text-sm text-body dark:text-gray-5'>/</span>
					<div className='h-4 w-24 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
				</div>
			</div>

			{/* Topbar skeleton */}
			<div className='mb-5 flex items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark'>
				<div className='h-10 w-32 animate-pulse rounded-lg bg-gray-2 dark:bg-white/10' />
				<div className='flex items-center gap-3'>
					<div className='h-11 w-36 animate-pulse rounded-lg bg-gray-2 dark:bg-white/10' />
					<div className='h-11 w-44 animate-pulse rounded-lg bg-gray-2 dark:bg-white/10' />
				</div>
			</div>

			{/* Table skeleton */}
			<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
				{/* Header */}
				<div className='flex items-center gap-4 border-b border-stroke px-6 py-4 dark:border-dark-3'>
					{hasImage && (
						<div className='h-4 w-12 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
					)}
					{Array.from({ length: cols }).map((_, i) => (
						<div
							key={i}
							className={`h-4 animate-pulse rounded bg-gray-2 dark:bg-white/10 ${
								i === 0 ? "w-40 flex-1" : i === cols - 1 ? "w-16" : "w-24"
							}`}
						/>
					))}
				</div>

				{/* Rows */}
				{Array.from({ length: rows }).map((_, i) => (
					<div
						key={i}
						className='flex items-center gap-4 border-b border-stroke px-6 py-4 last:border-0 dark:border-dark-3'
						style={{ opacity: 1 - i * (0.6 / rows) }}
					>
						{hasImage && (
							<div className='h-12 w-12 flex-shrink-0 animate-pulse rounded-lg bg-gray-2 dark:bg-white/10' />
						)}
						<div className='flex flex-1 flex-col gap-2'>
							<div className='h-4 w-3/5 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
							<div className='h-3 w-2/5 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
						</div>
						{Array.from({ length: cols - 1 }).map((_, j) => (
							<div
								key={j}
								className={`h-4 animate-pulse rounded bg-gray-2 dark:bg-white/10 ${
									j === cols - 2 ? "w-16" : "w-24"
								}`}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
