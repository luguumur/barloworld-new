"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type CategoryOption = {
	id: string;
	name: string;
	name_en: string;
	types: string;
};
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
	const [productTypesFilter, setProductTypesFilter] =
		useState(initialProductTypes);
	const router = useRouter();

	const buildUrl = (type: string, cat: string, q: string) => {
		const params = new URLSearchParams();
		if (q.trim()) params.set("search", q.trim());
		if (cat) params.set("category", cat);
		if (type) params.set("type", type);
		return `/admin/products${params.toString() ? `?${params}` : ""}`;
	};

	const handleTypeChange = (value: string) => {
		setProductTypesFilter(value);
		setCategoryId("");
		router.push(buildUrl(value, "", search));
	};

	const handleCategoryChange = (value: string) => {
		setCategoryId(value);
		router.push(buildUrl(productTypesFilter, value, search));
	};

	const categoriesForType = productTypesFilter
		? categories.filter((c) => c.types === productTypesFilter)
		: categories;

	return (
		<div className='flex items-center justify-between gap-3 rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark'>
			<Link
				href='/admin/products/new'
				className='flex h-10 items-center justify-center gap-3 rounded-lg bg-primary p-3 text-white hover:bg-primary-dark'
			>
				<Image src='/images/icon/plus.svg' alt='plus' width={20} height={20} />
				Add product
			</Link>

			<div className='flex items-center gap-3'>
				<select
					value={productTypesFilter}
					onChange={(e) => handleTypeChange(e.target.value)}
					className='h-11 w-36 rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white'
				>
					<option value=''>All types</option>
					{productTypes.map((t) => (
						<option key={t.id} value={t.name}>
							{t.name}
						</option>
					))}
				</select>

				<select
					value={categoryId}
					onChange={(e) => handleCategoryChange(e.target.value)}
					className='h-11 w-44 rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white'
				>
					<option value=''>All categories</option>
					{categoriesForType.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>

				<form
					className='flex items-center gap-2'
					onSubmit={(e) => {
						e.preventDefault();
						router.push(buildUrl(productTypesFilter, categoryId, search));
					}}
				>
					<input
						type='search'
						placeholder='Search products'
						className='h-11 w-[200px] rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:focus:border-transparent'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						type='submit'
						className='h-11 rounded-lg bg-primary px-4 text-white hover:bg-primary-dark'
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
}
