"use client";
import Link from "next/link";
import Image from "next/image";

export default function AttributeEmptyState() {
	return (
		<div className="rounded-10 bg-white p-8 shadow-1 dark:bg-gray-dark sm:p-12">
			<div className="mx-auto max-w-md text-center">
				<h2 className="mb-2 font-satoshi text-xl font-bold text-dark dark:text-white">
					No attributes yet
				</h2>
				<p className="mb-6 text-body dark:text-gray-5">
					Add attributes (e.g. Engine power, Weight) to use as product specifications. Create Attribute Value Groups first if needed.
				</p>
				<Link
					href="/admin/attributes/new"
					className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-white hover:bg-primary-dark"
				>
					<Image src="/images/icon/plus.svg" alt="" width={20} height={20} />
					Add attribute
				</Link>
			</div>
		</div>
	);
}
