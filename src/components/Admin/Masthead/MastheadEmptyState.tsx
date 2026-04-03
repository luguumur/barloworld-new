import Card from "@/components/Common/Dashboard/Card";

export default function MastheadEmptyState() {
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
								d="M4 4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm14 0H6v16h12V4zM8 8h8v2H8V8zm0 4h8v2H8v-2z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No mastheads yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add your first masthead using the button above
					</p>
				</div>
			</Card>
		</div>
	);
}
