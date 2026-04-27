"use client";

import type { SiteSearchHit } from "@/types/search";
import { resolveMastheadImageUrl } from "@/libs/resolveMastheadImageUrl";
import Image from "next/image";
import Link from "next/link";

function resolveImageSrc(raw: string | undefined): string | null {
	if (!raw?.trim()) return null;
	const t = raw.trim();
	if (
		t.startsWith("http://") ||
		t.startsWith("https://") ||
		t.startsWith("/")
	) {
		return t;
	}
	return resolveMastheadImageUrl(t);
}

export default function SearchResultRow({ hit }: { hit: SiteSearchHit }) {
	const href = hit.url?.trim() || "/";
	const resolved = resolveImageSrc(hit.imageURL);
	const showImage = Boolean(resolved && resolved.length > 1);

	return (
		<article className='group flex gap-5 sm:gap-6'>
			{showImage ? (
				<div className='relative h-[72px] w-[100px] shrink-0 overflow-hidden rounded-sm border border-stroke bg-white dark:border-stroke-dark sm:h-20 sm:w-[120px]'>
					<Image
						src={resolved!}
						alt={hit.title}
						fill
						className='object-cover transition duration-300 group-hover:scale-[1.02]'
						sizes='120px'
					/>
				</div>
			) : (
				<div className='flex h-[72px] w-[100px] shrink-0 flex-col items-center justify-center rounded-sm border border-dashed border-stroke bg-gray-2 text-center text-[10px] font-semibold uppercase leading-tight text-dark-4 dark:border-stroke-dark dark:bg-gray-dark dark:text-gray-5 sm:h-20 sm:w-[120px] sm:text-xs'>
					{hit.type}
				</div>
			)}
			<div className='min-w-0 flex-1 py-0.5'>
				<p className='text-[11px] font-bold uppercase tracking-[0.14em] text-primary'>
					{hit.type}
				</p>
				<Link
					href={href}
					className='mt-1 block font-satoshi text-base font-semibold leading-snug text-black decoration-primary/60 underline-offset-4 hover:underline dark:text-white sm:text-lg'
				>
					{hit.title}
				</Link>
				<p
					className='mt-1.5 truncate text-sm text-dark-4 dark:text-gray-5'
					title={hit.url}
				>
					{hit.url}
				</p>
			</div>
		</article>
	);
}
