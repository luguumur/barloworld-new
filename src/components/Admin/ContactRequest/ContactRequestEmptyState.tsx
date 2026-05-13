import Card from "@/components/Common/Dashboard/Card";

export default function ContactRequestEmptyState() {
	return (
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
							d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<h2 className='mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white'>
					No contact requests yet
				</h2>
				<p className='text-sm tracking-[-.14px] text-body dark:text-gray-5'>
					Messages submitted via the contact form will appear here
				</p>
			</div>
		</Card>
	);
}
