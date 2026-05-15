"use client";
import { useState, useTransition } from "react";
import { savePageSize } from "@/actions/preferences";
import { PAGE_SIZE_OPTIONS, type PageSizeOption } from "@/lib/constants";
import toast from "react-hot-toast";

export default function PageSizeSettings({
	current,
}: {
	current: PageSizeOption;
}) {
	const [selected, setSelected] = useState<PageSizeOption>(current);
	const [isPending, startTransition] = useTransition();

	const handleSave = () => {
		startTransition(async () => {
			await savePageSize(selected);
			toast.success("Page size saved");
		});
	};

	return (
		<div className='rounded-10 bg-white p-7.5 shadow-1 dark:bg-gray-dark'>
			<h3 className='mb-5 text-xl font-bold text-dark dark:text-white'>
				Display Preferences
			</h3>

			<div className='mb-5'>
				<label className='mb-2.5 block font-satoshi text-sm font-medium text-dark dark:text-white'>
					Items per page (admin lists)
				</label>
				<div className='flex items-center gap-3'>
					{PAGE_SIZE_OPTIONS.map((size) => (
						<button
							key={size}
							type='button'
							onClick={() => setSelected(size)}
							className={`flex h-10 w-14 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
								selected === size
									? "border-primary bg-primary text-white"
									: "border-stroke bg-gray-1 text-dark hover:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white"
							}`}
						>
							{size}
						</button>
					))}
				</div>
				<p className='mt-2 text-xs text-body dark:text-gray-4'>
					How many rows to show per page in product lists.
				</p>
			</div>

			<button
				onClick={handleSave}
				disabled={isPending || selected === current}
				className='flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'
			>
				{isPending ? "Saving…" : "Save preference"}
			</button>
		</div>
	);
}
