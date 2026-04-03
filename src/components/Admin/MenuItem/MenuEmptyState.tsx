import Card from "@/components/Common/Dashboard/Card";

export default function MenuEmptyState() {
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
								d="M4 6h16v12H4V6zm2 2v8h12V8H6zm2 2h2v4H8v-4zm4 0h2v4h-2v-4zm-6 6h8v2H6v-2zM4 4v2h16V4H4z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No menu items yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add items to the site header menu. You can link to custom pages or external URLs.
					</p>
				</div>
			</Card>
		</div>
	);
}
