import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TranslationForm from "@/components/Admin/Translation/TranslationForm";
import { getTranslationById } from "@/actions/translation";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Edit Translation - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit a UI translation",
};

export const revalidate = 0;

export default async function EditTranslationPage({
	params,
}: {
	params: { id: string };
}) {
	const translation = await getTranslationById(params.id);
	if (!translation) notFound();

	return (
		<>
			<Breadcrumb pageTitle='Edit Translation' />
			<TranslationForm
				mode='edit'
				editId={translation.id}
				initial={{
					key: translation.key,
					value_mn: translation.value_mn,
					value_en: translation.value_en,
				}}
			/>
		</>
	);
}
