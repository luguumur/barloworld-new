"use client";
import Link from "next/link";

export default function TranslationEmptyState() {
	return (
		<div className='flex flex-col items-center justify-center rounded-10 bg-white p-12 shadow-1 dark:bg-gray-dark'>
			<p className='mb-4 text-center text-body dark:text-gray-5'>
				No translations found.
			</p>
			<Link
				href='/admin/translations/new'
				className='inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark'
			>
				Add first translation
			</Link>
		</div>
	);
}
