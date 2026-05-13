"use client";
import Image from "next/image";
import MagazineAction from "./MagazineAction";
import ImagePlaceholderSvg from "@/components/Common/ImagePlaceholderSvg";

type Magazine = {
	id: string;
	title: string;
	title_en: string;
	image: string | null;
	url: string | null;
	date: string | null;
	number: string | null;
	createdAt: Date;
	updatedAt: Date;
};

function imageSrc(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

export default function MagazineListTable({
	magazines,
}: {
	magazines: Magazine[];
}) {
	return (
		<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
			<table className='w-full'>
				<thead>
					<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
						<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
							Image
						</th>
						<th className='min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
							Title
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Number
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Date
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell'>
							URL
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell'>
							Created
						</th>
						<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{magazines.map((magazine) => {
						const src = imageSrc(magazine.image);
						return (
							<tr
								key={magazine.id}
								className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
							>
								<td className='p-4 text-left sm:pl-7.5'>
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
										<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
											<ImagePlaceholderSvg className='h-6 w-6' />
										</div>
									)}
								</td>
								<td className='p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5'>
									<span className='line-clamp-2'>{magazine.title}</span>
									<span className='block text-sm text-body/80 md:hidden'>
										{magazine.number ? `#${magazine.number}` : "—"}{" "}
										{magazine.date ?? ""}
									</span>
									<span className='block xl:hidden'>
										{magazine.url ? (
											<a
												href={magazine.url}
												target='_blank'
												rel='noopener noreferrer'
												className='text-sm text-primary hover:underline'
											>
												Link
											</a>
										) : null}
									</span>
									<span className='block sm:hidden'>
										Created: {new Date(magazine.createdAt).toLocaleDateString()}
									</span>
									<span className='block lsm:hidden'>
										<MagazineAction magazine={magazine} />
									</span>
								</td>
								<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
									{magazine.number ?? "—"}
								</td>
								<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
									{magazine.date ?? "—"}
								</td>
								<td className='hidden max-w-[180px] truncate p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 xl:table-cell'>
									{magazine.url ? (
										<a
											href={magazine.url}
											target='_blank'
											rel='noopener noreferrer'
											className='block truncate text-primary hover:underline'
										>
											{magazine.url}
										</a>
									) : (
										"—"
									)}
								</td>
								<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:table-cell'>
									{new Date(magazine.createdAt).toLocaleDateString()}
								</td>
								<td className='hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
									<MagazineAction magazine={magazine} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
