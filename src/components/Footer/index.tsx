import Image from "next/image";
import Link from "next/link";

const footerLinks = [
	{
		heading: "Equipment",
		links: [
			{ label: "New Equipment", href: "/products" },
			{ label: "Used Equipment", href: "/products" },
			{ label: "Rental", href: "/products" },
			{ label: "Work Tools / Attachments", href: "/products" },
			{ label: "Power Systems", href: "/products" },
		],
	},
	{
		heading: "Parts & Service",
		links: [
			{ label: "Genuine Cat Parts", href: "/products" },
			{ label: "Shop Services", href: "/support" },
			{ label: "Field Service", href: "/support" },
			{ label: "Preventive Maintenance", href: "/support" },
			{ label: "Equipment Rebuilds", href: "/support" },
		],
	},
	{
		heading: "Company",
		links: [
			{ label: "About Us", href: "/support" },
			{ label: "Management Team", href: "/support" },
			{ label: "News & Blog", href: "/blog" },
			{ label: "Testimonials", href: "/support" },
			{ label: "Careers", href: "/support" },
		],
	},
	{
		heading: "Contact",
		links: [
			{ label: "Contact Us", href: "/support" },
			{ label: "Find a Location", href: "/support" },
			{ label: "Request a Quote", href: "/support" },
			{ label: "Support", href: "/support" },
		],
	},
];

const socialLinks = [
	{
		label: "Facebook",
		href: "#",
		icon: (
			<svg
				className='h-5 w-5 fill-current'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
			</svg>
		),
	},
	{
		label: "LinkedIn",
		href: "#",
		icon: (
			<svg
				className='h-5 w-5 fill-current'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
			</svg>
		),
	},
	{
		label: "YouTube",
		href: "#",
		icon: (
			<svg
				className='h-5 w-5 fill-current'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
			</svg>
		),
	},
];

const Footer = () => {
	return (
		<footer className='relative overflow-hidden bg-[#0f172a] text-gray-5'>
			{/* Main footer grid */}
			<div className='mx-auto max-w-[1170px] px-4 py-14 sm:px-8 xl:px-0'>
				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-12'>
					{/* Brand column */}
					<div className='lg:col-span-1'>
						<Link href='/'>
							<Image
								src='/images/logo/belogo.webp'
								alt='Barloworld Mongolia'
								width={160}
								height={40}
								className='mb-5'
							/>
						</Link>
						<p className='mb-5 text-sm leading-relaxed text-gray-5'>
							Authorized Caterpillar® dealer in Mongolia. Serving mining,
							construction, and energy sectors nationwide.
						</p>
						<div className='flex items-center gap-3'>
							{socialLinks.map((s) => (
								<a
									key={s.label}
									href={s.href}
									aria-label={s.label}
									className='flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-5 transition hover:bg-primary hover:text-black'
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Link columns */}
					{footerLinks.map((col) => (
						<div key={col.heading}>
							<h3 className='mb-4 font-satoshi text-sm font-bold uppercase tracking-wider text-white'>
								{col.heading}
							</h3>
							<ul className='flex flex-col gap-2.5'>
								{col.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm transition hover:text-primary'
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Contact strip */}
				<div className='bg-white/3 mt-10 flex flex-wrap items-center gap-6 rounded-lg border border-white/5 px-6 py-4'>
					<div className='flex items-center gap-2 text-sm'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='h-4 w-4 shrink-0 text-primary'
						>
							<path
								fillRule='evenodd'
								d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
								clipRule='evenodd'
							/>
						</svg>
						<a href='tel:++976 7018-7588' className='hover:text-primary'>
							+976 7018-7588
						</a>
					</div>
					<div className='flex items-center gap-2 text-sm'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='h-4 w-4 shrink-0 text-primary'
						>
							<path d='M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z' />
							<path d='M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z' />
						</svg>
						<a href='mailto:info@barloworld.mn' className='hover:text-primary'>
							info@barloworld.mn
						</a>
					</div>
					<div className='ml-auto'>
						<Link
							href='/support'
							className='inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 font-satoshi text-sm font-bold text-black transition hover:bg-primary-dark'
						>
							Contact Us
						</Link>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='border-t border-white/5 py-5'>
				<div className='mx-auto flex max-w-[1170px] flex-wrap items-center justify-between gap-4 px-4 sm:px-8 xl:px-0'>
					<p className='text-xs text-gray-6'>
						© {new Date().getFullYear()} Barloworld Mongolia LLC. All Rights
						Reserved.
					</p>
					<div className='flex items-center gap-4 text-xs text-gray-6'>
						<Link href='/support' className='hover:text-primary'>
							Privacy Policy
						</Link>
						<span className='text-white/20'>|</span>
						<Link href='/support' className='hover:text-primary'>
							Terms & Conditions
						</Link>
						<span className='text-white/20'>|</span>
						<Link href='/support' className='hover:text-primary'>
							Sitemap
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
