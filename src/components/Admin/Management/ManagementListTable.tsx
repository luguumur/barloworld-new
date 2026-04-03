"use client";
import Image from "next/image";
import ManagementAction from "./ManagementAction";

type Management = {
	id: string;
	name: string;
	position: string;
	image: string | null;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

function imageSrc(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

export default function ManagementListTable({ managements }: { managements: Management[] }) {
	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			<table className="w-full">
				<thead>
					<tr className="hidden border-b border-stroke dark:border-stroke-dark lsm:table-row">
						<th className="min-w-[60px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5">
							Order
						</th>
						<th className="w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Image
						</th>
						<th className="min-w-[160px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Name
						</th>
						<th className="min-w-[140px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Position
						</th>
						<th className="hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{managements.map((management, index) => {
						const src = imageSrc(management.image);
						return (
							<tr
								key={management.id}
								className="border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark"
							>
								<td className="p-4 text-left sm:pl-7.5">
									<span className="font-medium text-body dark:text-gray-5">{management.order}</span>
									<span className="block lsm:hidden">
										<ManagementAction management={management} />
									</span>
								</td>
								<td className="p-4 text-left">
									{src ? (
										<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-1 dark:bg-white/5">
											<Image
												src={src}
												alt=""
												fill
												className="object-cover"
												sizes="48px"
											/>
										</div>
									) : (
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5">
											<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
									)}
								</td>
								<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
									<span className="line-clamp-2">{management.name}</span>
								</td>
								<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
									<span className="line-clamp-2">{management.position}</span>
								</td>
								<td className="hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
									<ManagementAction management={management} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
