"use client";
import Link from "next/link";
import PageAction from "./PageAction";

type Page = {
	id: string;
	slug: string;
	title: string;
	title_en: string;
	description: string | null;
	description_en: string | null;
	content: string;
	content_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function PageListTable({ pages }: { pages: Page[] }) {
	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			<table className="w-full">
				<thead>
					<tr className="hidden border-b border-stroke dark:border-stroke-dark lsm:table-row">
						<th className="min-w-[100px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5">
							Slug
						</th>
						<th className="min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Title
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell">
							Description
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell">
							Updated
						</th>
						<th className="hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{pages.map((page) => (
						<tr
							key={page.id}
							className="border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark"
						>
							<td className="p-4 text-left sm:pl-7.5">
								<Link
									href={`/${page.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									className="font-medium text-primary hover:underline dark:text-primary"
								>
									/{page.slug}
								</Link>
								<span className="block sm:hidden">
									{new Date(page.updatedAt).toLocaleDateString()}
								</span>
								<span className="block lsm:hidden">
									<PageAction page={page} />
								</span>
							</td>
							<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
								<span className="line-clamp-2">{page.title_en || page.title}</span>
								<span className="block xl:hidden text-sm text-body/80">
									{page.description_en || page.description ? (
										<span className="line-clamp-1">
											{(page.description_en || page.description || "").slice(0, 60)}…
										</span>
									) : (
										"—"
									)}
								</span>
							</td>
							<td className="hidden max-w-[200px] truncate p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 xl:table-cell">
								{page.description_en || page.description || "—"}
							</td>
							<td className="hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:table-cell">
								{new Date(page.updatedAt).toLocaleDateString()}
							</td>
							<td className="hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
								<PageAction page={page} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
