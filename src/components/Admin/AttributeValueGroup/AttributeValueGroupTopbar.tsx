"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AttributeValueGroupTopbar({ initialSearch = "" }: { initialSearch?: string }) {
	const [search, setSearch] = useState(initialSearch);
	const router = useRouter();

	return (
		<div className="items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark md:flex">
			<div className="mb-6 flex flex-wrap items-center gap-3 md:mb-0">
				<Link
					href="/admin/attribute-value-groups/new"
					className="flex h-10 items-center justify-center gap-3 rounded-lg bg-primary p-3 text-white hover:bg-primary-dark"
				>
					<Image src="/images/icon/plus.svg" alt="plus" width={20} height={20} />
					Add attribute group
				</Link>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					router.push(`/admin/attribute-value-groups?search=${encodeURIComponent(search)}`);
				}}
				className="flex gap-2"
			>
				<input
					type="search"
					placeholder="Search"
					className="h-11 min-w-[160px] rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
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
