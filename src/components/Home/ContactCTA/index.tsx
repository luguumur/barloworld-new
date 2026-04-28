import Link from "next/link";

export default function ContactCTA() {
	return (
		<section className='bg-[#1e293b] py-16'>
			<div className='mx-auto max-w-[1170px] px-4 text-center sm:px-8 xl:px-0'>
				<h2 className='mb-3 font-satoshi text-3xl font-black -tracking-[0.5px] text-white sm:text-4xl'>
					Ready to Get Started?
				</h2>
				<p className='mx-auto mb-8 max-w-xl text-base text-white/70'>
					Talk to our equipment specialists about your project needs. We&rsquo;ll help
					you find the right machine, service plan, or rental solution.
				</p>
				<div className='flex flex-wrap items-center justify-center gap-4'>
					<Link
						href='/support'
						className='inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-satoshi font-bold text-black transition hover:bg-primary-dark'
					>
						CONTACT US
					</Link>
					<Link
						href='/products'
						className='inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 font-satoshi font-bold text-white transition hover:border-primary hover:text-primary'
					>
						VIEW INVENTORY
					</Link>
				</div>
			</div>
		</section>
	);
}
