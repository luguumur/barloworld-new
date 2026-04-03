"use client";
import Link from "next/link";
import Image from "next/image";

export default function ProductEmptyState() {
	return (
		<div className="rounded-10 bg-white p-8 shadow-1 dark:bg-gray-dark sm:p-12 md:p-16">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-6 flex justify-center">
					<svg
						width="80"
						height="80"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-body dark:text-gray-5"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M4 4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v16h12V4H6zm2 4h8v2H8V8zm0 4h8v2H8v-2z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<h2 className="mb-2 font-satoshi text-xl font-bold text-dark dark:text-white">
					No products yet
				</h2>
				<p className="mb-6 text-body dark:text-gray-5">
					Add your first product to get started. Create Product Types and Categories first if needed.
				</p>
				<Link
					href="/admin/products/new"
					className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-white hover:bg-primary-dark"
				>
					<Image src="/images/icon/plus.svg" alt="" width={20} height={20} />
					Add product
				</Link>
			</div>
		</div>
	);
}
