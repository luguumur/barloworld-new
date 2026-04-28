import Link from "next/link";

export default function CompanyIntro() {
	return (
		<section className='bg-white py-16 dark:bg-dark'>
			<div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
					{/* Text side */}
					<div>
						<p className='mb-2 text-sm font-semibold uppercase tracking-widest text-primary'>
							Бидний тухай
						</p>
						<h2 className='mb-5 font-satoshi text-3xl font-black -tracking-[0.5px] text-dark dark:text-white sm:text-4xl'>
							The Thompson Advantage —{" "}
							<span className='text-primary'>Barlo World Mongolia</span>
						</h2>
						<div className='space-y-4 text-base leading-relaxed text-body dark:text-gray-5'>
							<p>
								Barloworld Mongolia LLC is the authorized Caterpillar® dealer
								for Mongolia, delivering world-class heavy equipment, genuine
								parts, and expert service since our establishment.
							</p>
							<p>
								From excavators and wheel loaders to generators and work tools,
								we support Mongolia&rsquo;s mining, construction, and energy
								sectors with the full force of the Cat® product line backed by
								our certified technician teams.
							</p>
							<p>
								Our nationwide branch network ensures fast parts delivery, on-site
								field service, and preventive maintenance programs tailored to
								your operation.
							</p>
						</div>

						<div className='mt-8 flex flex-wrap gap-4'>
							<Link
								href='/support'
								className='inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-satoshi font-bold text-black transition hover:bg-primary-dark'
							>
								Contact Us
							</Link>
							<Link
								href='/products'
								className='inline-flex items-center gap-2 rounded-lg border border-dark/20 px-6 py-3 font-satoshi font-bold text-dark transition hover:border-primary hover:text-primary dark:border-white/20 dark:text-white'
							>
								View Equipment →
							</Link>
						</div>
					</div>

					{/* Stats side */}
					<div className='grid grid-cols-2 gap-6'>
						{[
							{ value: "80+", label: "Years of Experience", label_mn: "Жилийн туршлага" },
							{ value: "19", label: "Branch Locations", label_mn: "Салбар байршил" },
							{ value: "500+", label: "Cat Products", label_mn: "Cat бүтээгдэхүүн" },
							{ value: "24/7", label: "Service Support", label_mn: "Үйлчилгээний дэмжлэг" },
						].map((stat) => (
							<div
								key={stat.value}
								className='rounded-lg border border-gray-3 bg-gray-1 p-6 text-center dark:border-dark-2 dark:bg-dark-2'
							>
								<div className='font-satoshi text-4xl font-black text-primary'>
									{stat.value}
								</div>
								<div className='mt-1 text-sm font-semibold text-dark dark:text-white'>
									{stat.label}
								</div>
								<div className='mt-0.5 text-xs text-body dark:text-gray-5'>
									{stat.label_mn}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
