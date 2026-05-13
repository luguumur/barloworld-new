"use client";
import Image from "next/image";
import ProductTypeAction from "./ProductTypeAction";
import ImagePlaceholderSvg from "@/components/Common/ImagePlaceholderSvg";

type Item = {
	id: string;
	name: string;
	name_en: string;
	img_path?: string | null;
	createdAt: Date;
};

function imageSrc(path: string | null | undefined): string | null {
	if (!path?.trim()) return null;
	if (path.startsWith("http")) return path;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${path}` : null;
}

export default function ProductTypeListTable({ items }: { items: Item[] }) {
	return (
		<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
			<table className='w-full'>
				<thead>
					<tr className='border-b border-stroke dark:border-stroke-dark'>
						<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
							Image
						</th>
						<th className='min-w-[140px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
							Name (MN)
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Name (EN)
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell'>
							Created
						</th>
						<th className='px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pr-7.5'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => {
						const src = imageSrc(item.img_path);
						return (
							<tr
								key={item.id}
								className='border-b border-stroke last:border-0 dark:border-stroke-dark'
							>
								<td className='p-4 sm:pl-7.5'>
									{src ? (
										<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-1 dark:bg-white/5'>
											<Image
												src={src}
												alt=''
												fill
												className='object-cover'
												sizes='48px'
											/>
										</div>
									) : (
										<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5'>
											<ImagePlaceholderSvg className='h-6 w-6' />
										</div>
									)}
								</td>
								<td className='p-4 text-body dark:text-gray-5'>
									<span className='font-medium'>{item.name}</span>
									<span className='block text-sm text-body/80 md:hidden'>
										{item.name_en}
									</span>
									<span className='block sm:hidden'>
										<ProductTypeAction item={item} />
									</span>
								</td>
								<td className='hidden p-4 text-body dark:text-gray-5 md:table-cell'>
									{item.name_en}
								</td>
								<td className='hidden p-4 text-body dark:text-gray-5 sm:table-cell'>
									{new Date(item.createdAt).toLocaleDateString()}
								</td>
								<td className='hidden p-4 text-right sm:table-cell sm:pr-7.5'>
									<ProductTypeAction item={item} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
