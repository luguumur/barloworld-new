import TranslationListContainer from "@/components/Admin/Translation";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getTranslations } from "@/actions/translation";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Translations - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage UI translations",
};

export const revalidate = 0;

export default async function TranslationsPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const translations = await getTranslations(search);

	return (
		<>
			<Breadcrumb pageTitle="Translations" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<TranslationListContainer
					translations={translations}
					initialSearch={search ?? ""}
				/>
			</Suspense>
		</>
	);
}
