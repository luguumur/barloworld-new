"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function AdminPagination({
	page,
	totalPages,
	total,
	label = "items",
}: {
	page: number;
	totalPages: number;
	total: number;
	label?: string;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	if (totalPages <= 1) return null;

	const go = (p: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (p === 1) params.delete("page");
		else params.set("page", String(p));
		const qs = params.toString();
		router.push(`${pathname}${qs ? `?${qs}` : ""}`);
	};

	const pages: (number | "…")[] = [];
	if (totalPages <= 7) {
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else {
		pages.push(1);
		if (page > 3) pages.push("…");
		for (
			let i = Math.max(2, page - 1);
			i <= Math.min(totalPages - 1, page + 1);
			i++
		)
			pages.push(i);
		if (page < totalPages - 2) pages.push("…");
		pages.push(totalPages);
	}

	return (
		<div className='mt-6 flex items-center justify-between'>
			<p className='text-sm text-body dark:text-gray-4'>
				{total} {label} — page {page} of {totalPages}
			</p>
			<div className='flex items-center gap-1.5'>
				<button
					onClick={() => go(page - 1)}
					disabled={page === 1}
					className='flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-sm font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-white/5'
				>
					‹
				</button>
				{pages.map((p, i) =>
					p === "…" ? (
						<span
							key={`e-${i}`}
							className='px-1 text-sm text-body dark:text-gray-4'
						>
							…
						</span>
					) : (
						<button
							key={p}
							onClick={() => go(p)}
							className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
								p === page
									? "bg-primary text-white"
									: "border border-stroke bg-white text-dark hover:bg-gray-1 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-white/5"
							}`}
						>
							{p}
						</button>
					)
				)}
				<button
					onClick={() => go(page + 1)}
					disabled={page === totalPages}
					className='flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-sm font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-white/5'
				>
					›
				</button>
			</div>
		</div>
	);
}
