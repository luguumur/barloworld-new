"use client";

import SearchResultRow from "./SearchResultRow";
import type { SiteSearchHit } from "@/types/search";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function groupHitsByTypeOrdered(
	hits: SiteSearchHit[]
): [string, SiteSearchHit[]][] {
	const order: string[] = [];
	const map = new Map<string, SiteSearchHit[]>();
	for (const h of hits) {
		const t = h.type?.trim() || "Other";
		if (!map.has(t)) {
			order.push(t);
			map.set(t, []);
		}
		map.get(t)!.push(h);
	}
	return order.map((t) => [t, map.get(t)!]);
}

export default function SiteSearchPageClient() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const paramQ = searchParams.get("q") ?? "";
	const [q, setQ] = useState(paramQ);

	useEffect(() => {
		setQ(paramQ);
	}, [paramQ]);

	const trimmed = q.trim();
	const [hits, setHits] = useState<SiteSearchHit[]>([]);
	const [loading, setLoading] = useState(false);

	const grouped = useMemo(() => groupHitsByTypeOrdered(hits), [hits]);

	const runSearch = useCallback(async (query: string) => {
		const t = query.trim();
		if (t.length < 2) {
			setHits([]);
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(t)}`, {
				cache: "no-store",
			});
			const data = (await res.json()) as { hits?: SiteSearchHit[] };
			setHits(Array.isArray(data.hits) ? data.hits : []);
		} catch {
			setHits([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const id = window.setTimeout(() => {
			void runSearch(trimmed);
		}, 300);
		return () => window.clearTimeout(id);
	}, [trimmed, runSearch]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const next = q.trim();
		if (next.length < 2) return;
		router.push(`/search?q=${encodeURIComponent(next)}`);
	};

	const showResultsBlock = trimmed.length >= 2;

	return (
		<div className='w-full'>
			<nav
				className='mb-6 flex flex-wrap items-center gap-2 text-sm text-dark-4 dark:text-gray-5'
				aria-label='Breadcrumb'
			>
				<Link
					href='/'
					className='font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary'
				>
					Home
				</Link>
				<span className='text-dark-4 dark:text-gray-5' aria-hidden>
					/
				</span>
				<span className='font-medium text-black dark:text-white'>
					Search results
				</span>
			</nav>

			{showResultsBlock && (
				<div className='mt-8 border-b border-stroke pb-4 dark:border-stroke-dark'>
					{loading ? (
						<p className='font-satoshi text-lg text-dark dark:text-gray-4'>
							Searching…
						</p>
					) : (
						<p className='font-satoshi text-lg text-black dark:text-white'>
							<span className='font-bold'>{hits.length}</span>
							<span className='text-dark-4 dark:text-gray-5'>
								{" "}
								{hits.length === 1 ? "result" : "results"} for{" "}
							</span>
							<span className='font-semibold text-primary'>
								&ldquo;{trimmed}&rdquo;
							</span>
						</p>
					)}
				</div>
			)}

			{trimmed.length > 0 && trimmed.length < 2 && (
				<p className='mt-8 rounded-sm border border-stroke bg-white p-6 text-center text-sm text-dark-4 dark:border-stroke-dark dark:bg-gray-dark dark:text-gray-5'>
					Enter at least 2 characters to search.
				</p>
			)}

			{showResultsBlock && !loading && hits.length === 0 && (
				<div className='mt-8 rounded-sm border border-stroke bg-white p-10 text-center dark:border-stroke-dark dark:bg-gray-dark'>
					<p className='font-satoshi text-lg font-semibold text-black dark:text-white'>
						No results found
					</p>
					<p className='mt-2 text-sm text-dark-4 dark:text-gray-5'>
						Try different keywords, or check spelling.
					</p>
				</div>
			)}

			{grouped.map(([type, items]) => (
				<section key={type} className='mt-10 first:mt-8'>
					<h2 className='border-b-2 border-primary pb-2 font-satoshi text-xs font-bold uppercase tracking-[0.16em] text-black dark:text-white'>
						{type}
					</h2>
					<ul className='divide-y divide-stroke dark:divide-stroke-dark'>
						{items.map((hit) => (
							<li key={hit.objectID} className='py-5 first:pt-4'>
								<SearchResultRow hit={hit} />
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}
