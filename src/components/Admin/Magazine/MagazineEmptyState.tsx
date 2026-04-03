import Card from "@/components/Common/Dashboard/Card";

export default function MagazineEmptyState() {
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
								d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No magazines yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add your first magazine using the button above
					</p>
				</div>
			</Card>
		</div>
	);
}
