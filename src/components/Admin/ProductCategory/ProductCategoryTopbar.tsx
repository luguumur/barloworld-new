"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type TypeOption = { id: string; name: string };

export default function ProductCategoryTopbar({
	initialSearch = "",
	initialType = "",
	productTypes = [],
}: {
	initialSearch?: string;
	initialType?: string;
	productTypes?: TypeOption[];
}) {
	const [search, setSearch] = useState(initialSearch);
	const [typeFilter, setTypeFilter] = useState(initialType);
	const router = useRouter();

	return (
		<div className="items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark md:flex">
			<div className="mb-6 flex flex-wrap items-center gap-3 md:mb-0">
				<Link
					href="/admin/product-categories/new"
					className="flex h-10 items-center justify-center gap-3 rounded-lg bg-primary p-3 text-white hover:bg-primary-dark"
				>
					<Image src="/images/icon/plus.svg" alt="plus" width={20} height={20} />
					Add category
				</Link>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const params = new URLSearchParams();
					if (search) params.set("search", search);
					if (typeFilter) params.set("type", typeFilter);
					router.push(`/admin/product-categories${params.toString() ? `?${params}` : ""}`);
				}}
				className="flex flex-wrap items-center gap-2"
			>
				{productTypes.length > 0 && (
					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						className="h-11 rounded-lg border border-stroke bg-gray-1 px-4 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="">All types</option>
						{productTypes.map((t) => (
							<option key={t.id} value={t.name}>{t.name}</option>
						))}
					</select>
				)}
				<input
					type="search"
					placeholder="Search"
					className="h-11 min-w-[140px] rounded-lg border border-stroke bg-gray-1 px-4 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit" className="h-11 rounded-lg bg-primary px-4 text-white hover:bg-primary-dark">
					Search
				</button>
			</form>
		</div>
	);
}
