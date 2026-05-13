import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TranslationForm from "@/components/Admin/Translation/TranslationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Translation - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new UI translation",
};

export default function NewTranslationPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Translation" />
			<TranslationForm mode="create" />
		</>
	);
}
