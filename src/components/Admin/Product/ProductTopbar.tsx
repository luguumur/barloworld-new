"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type CategoryOption = { id: string; name: string; name_en: string; types: string };
type TypeOption = { id: string; name: string; name_en: string };

export default function ProductTopbar({
	initialSearch = "",
	initialCategoryId = "",
	initialProductTypes = "",
	categories = [],
	productTypes = [],
}: {
	initialSearch?: string;
	initialCategoryId?: string;
	initialProductTypes?: string;
	categories: CategoryOption[];
	productTypes: TypeOption[];
}) {
	const [search, setSearch] = useState(initialSearch);
	const [categoryId, setCategoryId] = useState(initialCategoryId);
	const [productTypesFilter, setProductTypesFilter] = useState(initialProductTypes);
	const router = useRouter();

	const categoriesForType = productTypesFilter
		? categories.filter((c) => c.types === productTypesFilter)
		: categories;

	return (
		<div className="items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark md:flex">
			<div className="mb-6 flex flex-wrap items-center gap-3 md:mb-0">
				<Link
					href="/admin/products/new"
					className="flex h-10 items-center justify-center gap-3 rounded-lg bg-primary p-3 text-white hover:bg-primary-dark"
				>
					<Image
						src="/images/icon/plus.svg"
						alt="plus"
						width={20}
						height={20}
					/>
					Add product
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-3">
				<select
					value={productTypesFilter}
					onChange={(e) => setProductTypesFilter(e.target.value)}
					className="h-11 rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
				>
					<option value="">All types</option>
					{productTypes.map((t) => (
						<option key={t.id} value={t.name}>
							{t.name}
						</option>
					))}
				</select>
				<select
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
					className="h-11 rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
				>
					<option value="">All categories</option>
					{categoriesForType.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const params = new URLSearchParams();
						if (search) params.set("search", search);
						if (categoryId) params.set("category", categoryId);
						if (productTypesFilter) params.set("type", productTypesFilter);
						router.push(`/admin/products?${params.toString()}`);
					}}
				>
					<div className="relative flex gap-2">
						<input
							type="search"
							placeholder="Search products"
							className="h-11 w-full min-w-[160px] rounded-lg border border-stroke bg-gray-1 pl-11 pr-4.5 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:focus:border-transparent"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-dark dark:text-white">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_p)">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
										fill="currentColor"
									/>
								</g>
								<defs>
									<clipPath id="clip0_p">
										<rect width="18" height="18" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</span>
						<button
							type="submit"
							className="h-11 rounded-lg bg-primary px-4 text-white hover:bg-primary-dark"
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
