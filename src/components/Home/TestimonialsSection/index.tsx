import {
	getTestimonialsPublic,
	type TestimonialRow,
} from "@/actions/testimonial";
import Image from "next/image";
import Link from "next/link";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function TestimonialCard({
	t,
	lang,
}: {
	t: TestimonialRow;
	lang: "mn" | "en";
}) {
	const title = lang === "mn" ? t.title : t.title_en;
	const subtitle = lang === "mn" ? t.subtitle : t.subtitle_en;
	const description = lang === "mn" ? t.description : t.description_en;
	const img = resolveImg(t.imageUrl);

	return (
		<div className='flex flex-col gap-4 rounded-lg border border-gray-3 bg-white p-6 shadow-testimonial dark:border-dark-2 dark:bg-dark'>
			{/* Quote mark */}
			<svg
				width='32'
				height='24'
				viewBox='0 0 32 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='shrink-0'
			>
				<path
					d='M0 24V14.4C0 10.48 1.04 7.16 3.12 4.44C5.28 1.64 8.36 0 12.36 0L14.16 2.76C11.2 3.56 9.16 5.12 8.04 7.44C7.4 8.72 7.12 10.04 7.2 11.4H14.4V24H0ZM17.6 24V14.4C17.6 10.48 18.64 7.16 20.72 4.44C22.88 1.64 25.96 0 29.96 0L31.76 2.76C28.8 3.56 26.76 5.12 25.64 7.44C25 8.72 24.72 10.04 24.8 11.4H32V24H17.6Z'
					fill='#feca34'
					fillOpacity='0.4'
				/>
			</svg>

			<p className='flex-1 text-sm leading-relaxed text-body dark:text-gray-5'>
				{description}
			</p>

			<div className='flex items-center gap-3 border-t border-gray-3 pt-4 dark:border-dark-2'>
				<div className='relative h-10 w-10 overflow-hidden rounded-full bg-gray-2 dark:bg-dark-2'>
					{img ? (
						<Image
							src={img}
							alt={title}
							fill
							className='object-cover'
							unoptimized
						/>
					) : (
						<span className='flex h-full w-full items-center justify-center font-satoshi text-sm font-bold text-primary'>
							{title.charAt(0).toUpperCase()}
						</span>
					)}
				</div>
				<div>
					<p className='font-satoshi text-sm font-bold text-dark dark:text-white'>
						{title}
					</p>
					{subtitle && (
						<p className='text-xs text-body dark:text-gray-5'>{subtitle}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default async function TestimonialsSection({
	lang = "en",
}: {
	lang?: "mn" | "en";
}) {
	const testimonials = await getTestimonialsPublic(6);

	if (!testimonials.length) return null;

	return (
		<section className='bg-gray-1 py-14 dark:bg-dark-2'>
			<div className='container mx-auto px-4 sm:px-8 xl:px-0'>
				<div className='mb-8 text-center'>
					<p className='mb-2 text-sm font-semibold uppercase tracking-widest text-primary'>
						Үйлчлүүлэгчдийн сэтгэгдэл
					</p>
					<h2 className='font-satoshi text-2xl font-black -tracking-[0.5px] text-dark dark:text-white sm:text-3xl'>
						Customer Stories & Testimonials
					</h2>
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{testimonials.map((t) => (
						<TestimonialCard key={t.id} t={t} lang={lang} />
					))}
				</div>

				<div className='mt-8 text-center'>
					<Link
						href='/support'
						className='inline-flex items-center gap-2 font-satoshi font-bold text-primary hover:underline'
					>
						Read all testimonials →
					</Link>
				</div>
			</div>
		</section>
	);
}
