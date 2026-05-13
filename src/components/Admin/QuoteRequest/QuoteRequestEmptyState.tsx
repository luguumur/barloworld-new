import Card from "@/components/Common/Dashboard/Card";

export default function QuoteRequestEmptyState() {
	return (
		<div>
			<Card>
				<div className='mx-auto w-full max-w-[510px] py-20 text-center'>
					<div className='mb-6 flex justify-center'>
						<svg
							width='80'
							height='80'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='text-body dark:text-gray-5'
						>
							<path
								d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					<h2 className='mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white'>
						No quote requests yet
					</h2>
					<p className='text-sm tracking-[-.14px] text-body dark:text-gray-5'>
						Quote requests submitted via the website will appear here
					</p>
				</div>
			</Card>
		</div>
	);
}
