export default function Loading() {
	return (
		<div>
			{/* Stat cards */}
			<div className='mb-11 grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'
					>
						<div className='mb-6 h-[58px] w-[58px] animate-pulse rounded-full bg-gray-2 dark:bg-white/10' />
						<div className='mb-2 h-7 w-20 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
						<div className='h-4 w-32 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
					</div>
				))}
			</div>

			{/* Overview cards */}
			<div className='mb-7.5'>
				<div className='mb-2 h-6 w-28 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
				<div className='h-4 w-64 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
			</div>
			<div className='grid gap-7.5 md:grid-cols-2 xl:grid-cols-3'>
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'
					>
						<div className='mb-4 flex items-center justify-between'>
							<div className='h-5 w-40 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
							<div className='h-5 w-16 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
						</div>
						{Array.from({ length: 5 }).map((_, j) => (
							<div
								key={j}
								className='flex justify-between border-b border-stroke py-3 dark:border-dark-3'
							>
								<div className='h-4 w-32 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
								<div className='h-4 w-10 animate-pulse rounded bg-gray-2 dark:bg-white/10' />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
