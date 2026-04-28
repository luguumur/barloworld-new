import Link from "next/link";

const categories = [
	{
		title: "New Equipment",
		title_mn: "Шинэ тоног төхөөрөмж",
		href: "/products",
		bg: "bg-[#1e293b]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<rect x='4' y='28' width='40' height='12' rx='3' fill='#feca34' />
				<rect x='8' y='16' width='24' height='14' rx='2' fill='#feca34' opacity='.7' />
				<circle cx='13' cy='40' r='5' fill='#0f172a' stroke='#feca34' strokeWidth='2' />
				<circle cx='35' cy='40' r='5' fill='#0f172a' stroke='#feca34' strokeWidth='2' />
			</svg>
		),
	},
	{
		title: "Used Equipment",
		title_mn: "Хуучин тоног төхөөрөмж",
		href: "/products",
		bg: "bg-[#292524]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<rect x='4' y='28' width='40' height='12' rx='3' fill='#feca34' opacity='.6' />
				<rect x='8' y='16' width='24' height='14' rx='2' fill='#feca34' opacity='.4' />
				<circle cx='13' cy='40' r='5' fill='#0f172a' stroke='#feca34' strokeWidth='2' opacity='.8' />
				<circle cx='35' cy='40' r='5' fill='#0f172a' stroke='#feca34' strokeWidth='2' opacity='.8' />
				<path d='M30 10 L38 10 L35 18 L27 18 Z' fill='#feca34' opacity='.5' />
			</svg>
		),
	},
	{
		title: "Rental",
		title_mn: "Түрээс",
		href: "/products",
		bg: "bg-[#1c1917]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<rect x='6' y='20' width='36' height='20' rx='3' fill='#feca34' />
				<rect x='10' y='12' width='20' height='10' rx='2' fill='#feca34' opacity='.6' />
				<circle cx='14' cy='40' r='4' fill='#0f172a' stroke='#feca34' strokeWidth='2' />
				<circle cx='34' cy='40' r='4' fill='#0f172a' stroke='#feca34' strokeWidth='2' />
				<path d='M32 8 L42 8 L42 20 L32 20 Z' fill='#feca34' opacity='.4' />
			</svg>
		),
	},
	{
		title: "Parts",
		title_mn: "Сэлбэг хэрэгсэл",
		href: "/products",
		bg: "bg-[#0f172a]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<circle cx='24' cy='24' r='10' stroke='#feca34' strokeWidth='3' fill='none' />
				<circle cx='24' cy='24' r='4' fill='#feca34' />
				<rect x='22' y='6' width='4' height='8' rx='1' fill='#feca34' />
				<rect x='22' y='34' width='4' height='8' rx='1' fill='#feca34' />
				<rect x='6' y='22' width='8' height='4' rx='1' fill='#feca34' />
				<rect x='34' y='22' width='8' height='4' rx='1' fill='#feca34' />
			</svg>
		),
	},
	{
		title: "Service",
		title_mn: "Үйлчилгээ",
		href: "/support",
		bg: "bg-[#1e1b4b]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<path d='M24 6 C14 6 6 14 6 24 C6 34 14 42 24 42 C34 42 42 34 42 24 C42 14 34 6 24 6Z' stroke='#feca34' strokeWidth='2.5' fill='none' />
				<path d='M16 28 L20 20 L24 28 L28 16 L32 24' stroke='#feca34' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' fill='none' />
			</svg>
		),
	},
	{
		title: "Power Systems",
		title_mn: "Цахилгаан системүүд",
		href: "/products",
		bg: "bg-[#14532d]",
		icon: (
			<svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-12 w-12'>
				<path d='M26 6 L14 26 H24 L22 42 L34 22 H24 L26 6Z' fill='#feca34' />
			</svg>
		),
	},
];

export default function EquipmentCategories() {
	return (
		<section className='bg-white py-12 dark:bg-dark'>
			<div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				<div className='mb-8 flex items-end justify-between'>
					<div>
						<p className='mb-1 text-sm font-semibold uppercase tracking-widest text-primary'>
							Бидний санал болгох
						</p>
						<h2 className='font-satoshi text-2xl font-black -tracking-[0.5px] text-dark dark:text-white sm:text-3xl'>
							What We Offer
						</h2>
					</div>
					<Link
						href='/products'
						className='hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:flex'
					>
						View all products →
					</Link>
				</div>

				<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
					{categories.map((cat) => (
						<Link
							key={cat.title}
							href={cat.href}
							className={`group flex flex-col items-center gap-4 rounded-lg ${cat.bg} px-4 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
						>
							<div className='transition-transform duration-200 group-hover:scale-110'>
								{cat.icon}
							</div>
							<div>
								<p className='font-satoshi text-sm font-bold leading-tight text-white'>
									{cat.title}
								</p>
								<p className='mt-0.5 text-xs text-white/50'>{cat.title_mn}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
