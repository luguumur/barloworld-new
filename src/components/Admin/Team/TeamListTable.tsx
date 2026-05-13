"use client";
import Image from "next/image";
import TeamAction from "./TeamAction";
import { TeamRow } from "@/actions/team";

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

export default function TeamListTable({ teams }: { teams: TeamRow[] }) {
	return (
		<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
			<table className='w-full'>
				<thead>
					<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
						<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
							Photo
						</th>
						<th className='min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
							Name
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
							Position
						</th>
						<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lg:table-cell'>
							Order
						</th>
						<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => {
						const src = resolveImage(team.image);
						return (
							<tr
								key={team.id}
								className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
							>
								<td className='p-4 text-left sm:pl-7.5'>
									{src ? (
										<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-1 dark:bg-white/5'>
											<Image src={src} alt={team.name} fill className='object-cover' sizes='48px' unoptimized />
										</div>
									) : (
										<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
											<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
												<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
											</svg>
										</div>
									)}
								</td>
								<td className='p-4 text-left'>
									<p className='font-medium text-dark dark:text-white'>{team.name}</p>
									<p className='text-sm text-body dark:text-gray-5'>{team.name_en}</p>
									<span className='block text-xs text-body/70 md:hidden'>{team.pos}</span>
									<span className='block lsm:hidden'>
										<TeamAction team={team} />
									</span>
								</td>
								<td className='hidden p-4 text-left md:table-cell'>
									<p className='text-sm text-dark dark:text-white'>{team.pos}</p>
									<p className='text-xs text-body dark:text-gray-5'>{team.pos_en}</p>
								</td>
								<td className='hidden p-4 text-left text-sm text-body dark:text-gray-5 lg:table-cell'>
									{team.order}
								</td>
								<td className='hidden p-4 text-right lsm:table-cell sm:pr-7.5'>
									<TeamAction team={team} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
