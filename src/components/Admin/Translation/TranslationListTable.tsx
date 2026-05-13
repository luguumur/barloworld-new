"use client";
import TranslationAction from "./TranslationAction";
import type { TranslationRow } from "@/actions/translation";

export default function TranslationListTable({
	translations,
}: {
	translations: TranslationRow[];
}) {
	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			<table className="w-full">
				<thead>
					<tr className="hidden border-b border-stroke dark:border-stroke-dark lsm:table-row">
						<th className="min-w-[200px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5">
							Key
						</th>
						<th className="min-w-[200px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							MN
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell">
							EN
						</th>
						<th className="hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{translations.map((t) => (
						<tr
							key={t.id}
							className="border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark"
						>
							<td className="p-4 text-left text-sm font-mono tracking-tight text-body dark:text-gray-5 sm:pl-7.5">
								{t.key}
							</td>
							<td className="max-w-[260px] p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
								<span className="line-clamp-2">{t.value_mn}</span>
								<span className="mt-0.5 block text-sm text-body/70 md:hidden line-clamp-2">
									{t.value_en}
								</span>
								<span className="block lsm:hidden">
									<TranslationAction translation={t} />
								</span>
							</td>
							<td className="hidden max-w-[260px] p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell">
								<span className="line-clamp-2">{t.value_en}</span>
							</td>
							<td className="hidden p-4 text-right lsm:table-cell sm:pr-7.5">
								<TranslationAction translation={t} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
