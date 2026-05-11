"use client";

import type { DealRow } from "@/actions/deal";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useCallback, useMemo, useState } from "react";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("//") || raw.startsWith("/"))
		return raw.startsWith("//") ? `https:${raw}` : raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function DealCard({ deal, lang }: { deal: DealRow; lang: "mn" | "en" }) {
	const title = lang === "mn" ? deal.title : deal.title_en;
	const subtitle = lang === "mn" ? deal.subtitle : deal.subtitle_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);
	const cta = lang === "mn" ? "ДЭЛГЭРЭНГҮЙ" : "VIEW DEAL";
	const subtitleText = subtitle?.trim() ?? "";

	return (
		<div className='home-deals-item-box clearfix'>
			<div className='home-deals-image'>
				{img ? (
					<Image
						src={img}
						alt={title || cta}
						width={759}
						height={367}
						className='img-responsive h-auto w-full'
						sizes='(min-width: 1025px) 42vw, 100vw'
						unoptimized
					/>
				) : (
					<div
						className='flex min-h-[200px] w-full items-center justify-center bg-[#f0f0f0]'
						role='img'
						aria-label={title || "Deal"}
					>
						<span className='text-4xl font-black uppercase text-[#ffcd11] opacity-35'>
							CAT
						</span>
					</div>
				)}
			</div>
			<div className='home-deals-content'>
				<h3>{title}</h3>
				{subtitleText ? (
					<p className='mb-1 font-satoshi text-sm font-semibold leading-snug'>
						{subtitleText}
					</p>
				) : null}
				<p>{description}</p>
				<Link href='/deals-specials/' className='btn btn-primary'>
					{cta}
				</Link>
			</div>
		</div>
	);
}

export default function HomeDealsSlider({
	deals,
	lang,
}: {
	deals: DealRow[];
	lang: "mn" | "en";
}) {
	const count = deals.length;
	const [index, setIndex] = useState(0);

	const go = useCallback(
		(dir: -1 | 1) => {
			setIndex((i) => (i + dir + count) % count);
		},
		[count]
	);

	const trackStyle = useMemo(
		() =>
			({
				opacity: 1,
				width: `${count * 100}%`,
				transform: `translateX(-${(100 / count) * index}%)`,
				transition: "transform 0.45s ease-out",
				willChange: "transform",
			}) satisfies CSSProperties,
		[count, index]
	);

	if (!count) return null;

	const single = count <= 1;

	return (
		<div className='home-deals-box js-home-deals-slider slick-initialized slick-slider'>
			<button
				type='button'
				data-role='none'
				className={`slick-prev slick-arrow${single ? " slick-disabled" : ""}`}
				aria-label='Previous'
				role='button'
				disabled={single}
				onClick={() => go(-1)}
			>
				Previous
			</button>

			<div aria-live='polite' className='slick-list draggable'>
				<div
					className='slick-track'
					style={trackStyle}
					role='listbox'
					aria-label='Deals and specials'
				>
					{deals.map((deal, i) => {
						const active = i === index;
						return (
							<div
								key={deal.id}
								className={`home-deals-item slick-slide${
									active ? " slick-current slick-active" : ""
								}`}
								data-slick-index={i}
								aria-hidden={!active}
								style={{
									width: `${100 / count}%`,
									flexShrink: 0,
									position: "relative",
								}}
								role='option'
								tabIndex={active ? 0 : -1}
								aria-selected={active}
							>
								<DealCard deal={deal} lang={lang} />
							</div>
						);
					})}
				</div>
			</div>

			<button
				type='button'
				data-role='none'
				className={`slick-next slick-arrow${single ? " slick-disabled" : ""}`}
				aria-label='Next'
				role='button'
				disabled={single}
				onClick={() => go(1)}
			>
				Next
			</button>
		</div>
	);
}
