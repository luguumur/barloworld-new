import Card from "@/components/Common/Dashboard/Card";

export default function DealEmptyState() {
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
								d="M7 5a2 2 0 012-2h6a2 2 0 012 2v2.586l2.293-2.293a1 1 0 111.414 1.414L17.414 9H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h1.586L4.293 6.293a1 1 0 111.414-1.414L7 7.586V5zm10 4v10H7V9h10zM5 11v6h14v-6H5z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No deals yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add your first deal or special using the button above
					</p>
				</div>
			</Card>
		</div>
	);
}
