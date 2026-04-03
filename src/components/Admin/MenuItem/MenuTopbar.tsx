"use client";
import Image from "next/image";
import Link from "next/link";

export default function MenuTopbar() {
	return (
		<div className="items-center justify-between rounded-10 bg-white px-3.5 py-3 shadow-1 dark:bg-gray-dark md:flex">
			<div className="mb-6 flex flex-wrap items-center gap-3 md:mb-0">
				<Link
					href="/admin/menu/new"
					className="flex h-10 items-center justify-center gap-3 rounded-lg bg-primary p-3 text-white hover:bg-primary-dark"
				>
					<Image
						src="/images/icon/plus.svg"
						alt="plus"
						width={20}
						height={20}
					/>
					Add menu item
				</Link>
			</div>
		</div>
	);
}
