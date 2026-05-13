"use client";
import TranslationEmptyState from "./TranslationEmptyState";
import TranslationListTable from "./TranslationListTable";
import TranslationTopbar from "./TranslationTopbar";
import type { TranslationRow } from "@/actions/translation";

export default function TranslationListContainer({
	translations,
	initialSearch = "",
}: {
	translations: TranslationRow[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className='mb-5'>
				<TranslationTopbar initialSearch={initialSearch} />
			</div>
			{translations.length ? (
				<TranslationListTable translations={translations} />
			) : (
				<TranslationEmptyState />
			)}
		</>
	);
}
