import Card from "@/components/Common/Dashboard/Card";

export default function NotificationEmptyState() {
	return (
		<div>
			<Card>
				<div className='mx-auto w-full max-w-[510px] py-20 text-center'>
					<div className='mb-6 flex justify-center'>
						<svg
							width='80'
							height='80'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='text-body dark:text-gray-5'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M9.99999 1.04167C6.43315 1.04167 3.54166 3.93317 3.54166 7.50001V8.08676C3.54166 8.66753 3.36975 9.2353 3.0476 9.71853L2.09043 11.1543C0.979516 12.8207 1.82761 15.0857 3.75977 15.6126C4.38944 15.7843 5.02444 15.9296 5.66311 16.0484L5.66469 16.0527C6.30552 17.7626 8.01828 18.9583 9.99994 18.9583C11.9816 18.9583 13.6944 17.7626 14.3352 16.0527L14.3368 16.0484C14.9755 15.9296 15.6105 15.7844 16.2402 15.6126C18.1724 15.0857 19.0205 12.8207 17.9096 11.1543L16.9524 9.71853C16.6302 9.2353 16.4583 8.66753 16.4583 8.08676V7.50001C16.4583 3.93317 13.5668 1.04167 9.99999 1.04167ZM12.8137 16.2808C10.9445 16.5041 9.05533 16.5041 7.1862 16.2808C7.77866 17.1321 8.80914 17.7083 9.99994 17.7083C11.1907 17.7083 12.2212 17.1321 12.8137 16.2808Z'
								fill='currentColor'
							/>
						</svg>
					</div>
					<h2 className='mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white'>
						No notifications yet
					</h2>
					<p className='text-sm tracking-[-.14px] text-body dark:text-gray-5'>
						Client inquiries submitted via the contact form will appear here
					</p>
				</div>
			</Card>
		</div>
	);
}
