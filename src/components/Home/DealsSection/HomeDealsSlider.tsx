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

function stripHtml(value: string | null | undefined): string {
	return (value ?? "")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<\/p>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, '"')
		.replace(/&#39;/gi, "'")
		.replace(/\s+/g, " ")
		.trim();
}

function truncateText(value: string, maxLength: number): string {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength).trimEnd()}...`;
}

function DealCard({
	deal,
	lang,
	active,
}: {
	deal: DealRow;
	lang: "mn" | "en";
	active: boolean;
}) {
	const title = lang === "mn" ? deal.title : deal.title_en;
	const subtitle = lang === "mn" ? deal.subtitle : deal.subtitle_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);
	const cta = lang === "mn" ? "ДЭЛГЭРЭНГҮЙ" : "VIEW DEAL";
	const subtitleText = truncateText(stripHtml(subtitle), 100);
	const descriptionText = truncateText(stripHtml(description), 180);
	const titleText = title?.trim() || cta;

	return (
		<div className='home-deals-item-box clearfix max-h-[400px]'>
			<div className='home-deals-image max-h-[400px] overflow-hidden bg-[#f3f3f3] dark:bg-[#2e2e2e]'>
				{img ? (
					<Image
						src={img}
						alt={titleText}
						width={900}
						height={560}
						className='img-responsive h-full w-full'
						sizes='(min-width: 1025px) 52vw, 100vw'
						style={{
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
						unoptimized
					/>
				) : (
					<div
						className='flex h-full min-h-[240px] w-full items-center justify-center bg-[#f0f0f0] dark:bg-[#2e2e2e] lg:min-h-[460px]'
						role='img'
						aria-label={titleText}
					>
						<span className='text-4xl font-black uppercase text-[#ffcd11] opacity-35'>
							CAT
						</span>
					</div>
				)}
			</div>
			<div className='home-deals-content bg-white dark:bg-[#272727]'>
				<div className='flex flex-col justify-center'>
					<h3 className='mb-4 font-black uppercase leading-[1.05] text-[#222] dark:text-white'>
						{titleText}
					</h3>
					{subtitleText ? (
						<p className='mb-2 tracking-[0.08em] text-[#7b7b7b] dark:text-gray-400'>
							{subtitleText}
						</p>
					) : null}
				</div>
				{/* {descriptionText ? (
					<p className='max-w-[34ch] text-sm leading-6 text-[#4c4c4c] md:text-base'>
						{descriptionText}
					</p>
				) : null} */}
				<Link
					href='/deals-specials/'
					className='btn btn-primary'
					tabIndex={active ? 0 : -1}
				>
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
				width: count ? `${count * 100}%` : "100%",
				transform: `translateX(-${count ? (100 / count) * index : 0}%)`,
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
								<DealCard deal={deal} lang={lang} active={active} />
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
