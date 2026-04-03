import Card from "@/components/Common/Dashboard/Card";

export default function ManagementEmptyState() {
	return (
		<div>
			<Card>
				<div className="mx-auto w-full max-w-[510px] py-20 text-center">
					<div className="mb-6 flex justify-center">
						<svg
							width="80"
							height="80"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="text-body dark:text-gray-5"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 4a4 4 0 00-4 4v1a4 4 0 008 0V8a4 4 0 00-4-4zm-6 8a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6zm4 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No management entries yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add name, position, image and order using the button above
					</p>
				</div>
			</Card>
		</div>
	);
}
