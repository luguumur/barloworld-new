"use client";

import type { MastheadRow } from "@/actions/masthead";
import {
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mastheadRowsToSlides } from "./mapMastheads";
import { mastheadSlides } from "./slides";

const autoplayMs = 8000;

type MastheadProps = {
	mastheads?: MastheadRow[] | null;
	language?: "mn" | "en";
};

const Masthead = ({ mastheads, language = "en" }: MastheadProps) => {
	const slides = useMemo(() => {
		if (mastheads?.length) {
			return mastheadRowsToSlides(mastheads, language);
		}
		return mastheadSlides;
	}, [mastheads, language]);

	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const count = slides.length;
	const active = slides[index] ?? slides[0];

	const go = useCallback(
		(dir: -1 | 1) => {
			setIndex((i) => (i + dir + count) % count);
		},
		[count]
	);

	useEffect(() => {
		if (paused || count <= 1) return;
		timerRef.current = setInterval(() => {
			setIndex((i) => (i + 1) % count);
		}, autoplayMs);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [paused, count, index]);

	useEffect(() => {
		setIndex((i) => (count > 0 ? Math.min(i, count - 1) : 0));
	}, [count]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") go(-1);
			if (e.key === "ArrowRight") go(1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);

	return (
		<div className='responsivegrid aem-Grid aem-Grid--12 aem-Grid--default--12 w-full'>
			<div className='aem-GridColumn aem-GridColumn--default--12 aem-GridColumn--offset--default--0 w-full'>
				<section
					className='masthead relative isolate w-full overflow-hidden bg-black text-white'
					aria-roledescription='carousel'
					aria-label='Featured stories'
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
				>
					<div className='relative min-h-[min(100svh,720px)] w-full lg:min-h-[560px]'>
						<div className='absolute inset-0 flex flex-col lg:grid lg:grid-cols-12'>
							<div className='relative order-1 min-h-[220px] lg:order-none lg:col-span-12 lg:min-h-0'>
								{slides.map((slide, i) => (
									<div
										key={slide.id}
										className={`absolute inset-0 transition-[opacity,visibility] duration-700 ease-out ${
											i === index
												? "visible z-10 opacity-100"
												: "pointer-events-none invisible z-0 opacity-0"
										}`}
										aria-hidden
									>
										<div
											className={`relative h-full min-h-[220px] lg:min-h-full ${slide.mediaClassName}`}
										>
											{slide.imageUrl ? (
												<Image
													src={slide.imageUrl}
													alt={slide.title}
													fill
													className='object-cover'
													sizes='(max-width: 1024px) 100vw, 58vw'
													priority={i === 0}
												/>
											) : null}
											<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(254,202,52,0.18),transparent_55%)]' />
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='relative z-20 flex min-h-[min(100svh,720px)] items-end px-5 pb-20 sm:px-8 lg:min-h-[560px] lg:px-12 lg:pb-24 xl:px-16'>
							<div className='w-full max-w-3xl'>
								<div className='mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm'>
									{active?.dateLabel}
								</div>
								<h1 className='font-satoshi text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl'>
									{active?.title}
								</h1>
								<p className='mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base'>
									{active?.description}
								</p>
								<Link
									href={active?.href || "/"}
									className='mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-satoshi text-sm font-bold text-black transition hover:bg-primary-dark sm:text-base'
								>
									{active?.ctaLabel}
									<ArrowRightIcon className='h-4 w-4' />
								</Link>
							</div>
						</div>

						<div className='pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-4 pb-6 sm:flex-row sm:justify-between sm:px-8 lg:px-12 xl:px-16'>
							<div
								className='pointer-events-auto flex gap-2'
								role='tablist'
								aria-label='Slides'
							>
								{slides.map((_, i) => (
									<button
										key={i}
										type='button'
										role='tab'
										aria-selected={i === index}
										aria-label={`Slide ${i + 1}`}
										className={`h-2.5 w-2.5 rounded-full transition ${
											i === index
												? "bg-primary"
												: "bg-white/35 hover:bg-white/60"
										}`}
										onClick={() => setIndex(i)}
									/>
								))}
							</div>
							<div className='pointer-events-auto flex gap-2'>
								<button
									type='button'
									className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:border-white/50 hover:bg-black/60'
									aria-label='Previous slide'
									onClick={() => go(-1)}
								>
									<ChevronLeftIcon className='h-5 w-5' />
								</button>
								<button
									type='button'
									className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:border-white/50 hover:bg-black/60'
									aria-label='Next slide'
									onClick={() => go(1)}
								>
									<ChevronRightIcon className='h-5 w-5' />
								</button>
							</div>
						</div>
					</div>

					<div
						className='relative z-40 h-1.5 w-full shrink-0'
						style={{
							backgroundImage: "url(/images/bg/header-gradient.png)",
							backgroundRepeat: "repeat-x",
							backgroundSize: "auto 100%",
						}}
						aria-hidden
					/>

					<p className='sr-only' aria-live='polite'>
						{active ? `Showing: ${active.title}` : ""}
					</p>
				</section>
			</div>
		</div>
	);
};

export default Masthead;
