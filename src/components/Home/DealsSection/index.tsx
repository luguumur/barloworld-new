import { getDealsPublic, type DealRow } from "@/actions/deal";
import Image from "next/image";
import Link from "next/link";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function DealCard({ deal, lang }: { deal: DealRow; lang: "mn" | "en" }) {
	const title = lang === "mn" ? deal.title : deal.title_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);

	return (
		<div className='group flex flex-col overflow-hidden rounded-lg border border-gray-3 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-dark-2 dark:bg-dark'>
			<div className='relative h-48 w-full overflow-hidden bg-gray-2 dark:bg-dark-2'>
				{img ? (
					<Image
						src={img}
						alt={title}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-105'
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						unoptimized
					/>
				) : (
					<div className='flex h-full items-center justify-center'>
						<span className='text-4xl font-black text-primary opacity-30'>CAT</span>
					</div>
				)}
				<div className='absolute left-3 top-3 rounded bg-primary px-2 py-0.5 font-satoshi text-xs font-bold text-black'>
					DEAL
				</div>
			</div>

			<div className='flex flex-1 flex-col p-5'>
				<h3 className='mb-2 font-satoshi text-base font-bold leading-snug text-dark dark:text-white'>
					{title}
				</h3>
				<p className='line-clamp-2 flex-1 text-sm text-body dark:text-gray-5'>
					{description}
				</p>
				<Link
					href='/products'
					className='mt-4 inline-flex items-center gap-1.5 font-satoshi text-sm font-bold text-primary hover:underline'
				>
					VIEW DEAL →
				</Link>
			</div>
		</div>
	);
}

export default async function DealsSection({ lang = "en" }: { lang?: "mn" | "en" }) {
	const deals = await getDealsPublic(6);

	if (!deals.length) return null;

	return (
		<section className='bg-gray-1 py-14 dark:bg-dark'>
			<div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				<div className='mb-8 flex items-end justify-between'>
					<div>
						<p className='mb-1 text-sm font-semibold uppercase tracking-widest text-primary'>
							Тусгай санал
						</p>
						<h2 className='font-satoshi text-2xl font-black -tracking-[0.5px] text-dark dark:text-white sm:text-3xl'>
							Deals & Promotions
						</h2>
					</div>
					<Link
						href='/products'
						className='hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:flex'
					>
						View all deals →
					</Link>
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{deals.map((deal) => (
						<DealCard key={deal.id} deal={deal} lang={lang} />
					))}
				</div>

				<div className='mt-8 sm:hidden'>
					<Link
						href='/products'
						className='flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-3 font-satoshi font-bold text-primary'
					>
						View all deals →
					</Link>
				</div>
			</div>
		</section>
	);
}
