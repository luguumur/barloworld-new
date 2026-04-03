import Card from "@/components/Common/Dashboard/Card";

export default function TestimonialEmptyState() {
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
								d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
								fill="currentColor"
							/>
						</svg>
					</div>
					<h2 className="mb-3.5 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
						No testimonials yet
					</h2>
					<p className="text-sm tracking-[-.14px] text-body dark:text-gray-5">
						Add your first testimonial using the button above
					</p>
				</div>
			</Card>
		</div>
	);
}
