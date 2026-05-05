import Image from "next/image";
import Link from "next/link";
import type { ProductRow } from "@/actions/product";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

type Props = {
	product: ProductRow;
	lang?: "mn" | "en";
};

export default function ProductDetail({ product, lang = "en" }: Props) {
	const name = lang === "mn" ? product.name : product.name_en;
	const description =
		lang === "mn" ? product.description : product.description_en;
	const img = resolveImg(product.img_path);
	const brochureUrl = resolveImg(product.brochure_path);

	const grouped = product.attributeValues?.reduce<
		Record<string, { groupName: string; attrs: typeof product.attributeValues }>
	>((acc, av) => {
		const gid = av!.groupId;
		if (!acc[gid])
			acc[gid] = {
				groupName: lang === "mn" ? av!.group.name : av!.group.name_en,
				attrs: [],
			};
		acc[gid].attrs!.push(av);
		return acc;
	}, {});

	return (
		<div className='container mx-auto px-4 py-10 sm:px-8 xl:px-0'>
			<div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
				{/* Left: Image */}
				<div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-2 shadow-md dark:bg-dark-2'>
					{img ? (
						<Image
							src={img}
							alt={name}
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 50vw'
							unoptimized
						/>
					) : (
						<div className='flex h-full items-center justify-center'>
							<span className='font-satoshi text-7xl font-black text-primary opacity-20'>
								CAT
							</span>
						</div>
					)}
				</div>

				{/* Right: Info */}
				<div className='flex flex-col'>
					<h1 className='mb-4 font-satoshi text-3xl font-black uppercase tracking-wide text-dark dark:text-white'>
						{name}
					</h1>

					{product.category && (
						<p className='mb-2 text-sm font-semibold uppercase tracking-widest text-primary'>
							{lang === "mn" ? product.category.name : product.category.name_en}
						</p>
					)}

					<div className='mb-6 h-1 w-16 bg-primary' />

					<p className='mb-8 whitespace-pre-line leading-relaxed text-body dark:text-gray-5'>
						{description}
					</p>

					{/* CTAs */}
					<div className='mb-8 flex flex-wrap gap-3'>
						<Link
							href='/support'
							className='inline-flex items-center gap-2 rounded bg-primary px-6 py-3 font-satoshi text-sm font-bold uppercase tracking-wide text-dark transition-colors hover:bg-primary-dark'
						>
							Request a Quote
						</Link>
						{brochureUrl && (
							<a
								href={brochureUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 rounded border-2 border-primary px-6 py-3 font-satoshi text-sm font-bold uppercase tracking-wide text-dark transition-colors hover:bg-primary hover:text-dark dark:text-white'
							>
								Download Brochure
							</a>
						)}
					</div>

					{/* Video */}
					{product.video_link && (
						<a
							href={product.video_link}
							target='_blank'
							rel='noopener noreferrer'
							className='mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline'
						>
							▶ Watch Video
						</a>
					)}
				</div>
			</div>

			{/* Attributes */}
			{grouped && Object.keys(grouped).length > 0 && (
				<div className='mt-14'>
					<h2 className='mb-6 font-satoshi text-2xl font-black uppercase tracking-wide text-dark dark:text-white'>
						Specifications
					</h2>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						{Object.entries(grouped).map(([gid, { groupName, attrs }]) => (
							<div
								key={gid}
								className='overflow-hidden rounded-lg border border-gray-3 dark:border-dark-2'
							>
								<div className='bg-dark px-4 py-3'>
									<h3 className='font-satoshi text-sm font-bold uppercase tracking-wider text-white'>
										{groupName}
									</h3>
								</div>
								<table className='w-full text-sm'>
									<tbody>
										{attrs!.map((av, i) => (
											<tr
												key={av!.id}
												className={
													i % 2 === 0
														? "bg-white dark:bg-dark"
														: "bg-gray-1 dark:bg-dark-2"
												}
											>
												<td className='w-1/2 px-4 py-2.5 font-medium text-dark dark:text-white'>
													{lang === "mn"
														? av!.attribute.name
														: av!.attribute.name_en}
												</td>
												<td className='px-4 py-2.5 text-body dark:text-gray-5'>
													{av!.string_value ?? "—"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Contact CTA banner */}
			<div className='mt-14 flex flex-col items-center justify-between gap-6 rounded-xl bg-dark p-8 sm:flex-row'>
				<div>
					<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-primary'>
						Ready to buy?
					</p>
					<h3 className='font-satoshi text-xl font-black text-white'>
						Contact our team for pricing and availability
					</h3>
				</div>
				<Link
					href='/support'
					className='shrink-0 rounded bg-primary px-8 py-3 font-satoshi text-sm font-bold uppercase tracking-wide text-dark transition-colors hover:bg-primary-dark'
				>
					Contact Us
				</Link>
			</div>
		</div>
	);
}
